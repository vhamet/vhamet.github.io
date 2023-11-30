import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

import { FakeUser, useFakeAuth } from "./FakeAuthContext";
import { updateUserFakeBackend } from "../utils/api";

type UserActionType = "START" | "FINISH" | "FAIL" | "RESET";
export type UserAction = {
  type: UserActionType;
  updates?: FakeUser;
  updatedUser?: FakeUser;
  error?: string;
};
type UserStatus = "pending" | "resolved" | "rejected";
type UserState = {
  status: UserStatus | null;
  error: string | null;
  storedUser: FakeUser | null;
  user: FakeUser;
};

type UserContextType = [UserState, Dispatch<UserAction>];
const UserContext = createContext<UserContextType>([{} as UserState, () => {}]);
UserContext.displayName = "UserContext";

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "START": {
      return {
        ...state,
        user: { ...state.user, ...action.updates },
        status: "pending",
        storedUser: state.user,
        error: null,
      };
    }
    case "FINISH": {
      return {
        ...state,
        user: action.updatedUser!,
        status: "resolved",
        storedUser: null,
        error: null,
      };
    }
    case "FAIL": {
      return {
        ...state,
        status: "rejected",
        error: action.error!,
        user: state.storedUser!,
        storedUser: null,
      };
    }
    case "RESET": {
      return {
        ...state,
        status: null,
        error: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const user = useFakeAuth();
  const [state, dispatch] = useReducer(userReducer, {
    status: null,
    error: null,
    storedUser: user,
    user,
  } as UserState);
  const value = [state, dispatch] as UserContextType;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }

  return context;
};

export const updateUser = async (
  dispatch: Dispatch<UserAction>,
  currentUser: FakeUser,
  pendingUser: FakeUser
) => {
  dispatch({ type: "START", updates: pendingUser });

  try {
    const { user } = await updateUserFakeBackend(currentUser, pendingUser);
    dispatch({ type: "FINISH", updatedUser: user });

    return user;
  } catch (error) {
    dispatch({ type: "FAIL", error: (error as Error).message });
    return Promise.reject(error);
  }
};
