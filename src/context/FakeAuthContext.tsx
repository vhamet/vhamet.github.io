import { createContext, useContext } from "react";

export type FakeUser = {
  userId: string;
  nickname: string;
  bio: string;
  avatar?: {
    baseTraits: { [key: string]: string };
    accessories: { [key: string]: string };
  };
};
const FakeAuthContext = createContext<FakeUser>({
  userId: "user#69420",
  nickname: "",
  bio: "",
});
FakeAuthContext.displayName = "FakeAuthContext";

const FakeAuthProvider = ({ user, ...props }: { user: FakeUser }) => {
  return <FakeAuthContext.Provider value={user} {...props} />;
};

const useFakeAuth = () => {
  return useContext(FakeAuthContext);
};

export { FakeAuthProvider, useFakeAuth };
