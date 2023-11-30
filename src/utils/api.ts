import { FakeUser } from "../context/FakeAuthContext";
import { ACCESSORIES, TRAITS } from "./avatar";

export const fetchGraphqlData = async (
  url: string,
  query: string,
  variables: { [key: string]: unknown }
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      query: query,
      variables,
    }),
  });

  return response;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateUserFakeBackend = async (
  currentUser: FakeUser,
  pendingUser: FakeUser
) => {
  await sleep(1500);

  if (Math.random() > 0.5)
    return Promise.reject({ message: "Randomly rejected by the backend" });

  const combinedNickname = pendingUser.nickname.toLowerCase();
  const combinedBio = (pendingUser.bio + currentUser.bio).toLowerCase();

  const baseTraits = Object.entries(TRAITS).reduce(
    (base, [traitName, possibleValues], index) => {
      const myTraitIndex =
        combinedNickname.charCodeAt(index) % possibleValues.length || 0;
      return { ...base, [traitName]: possibleValues[myTraitIndex] };
    },
    {}
  );

  const accessories = Object.entries(ACCESSORIES).reduce(
    (base, [traitName, possibleValues], index) => {
      const myTraitIndex =
        combinedBio.charCodeAt(index) % possibleValues.length || 0;
      return { ...base, [traitName]: possibleValues[myTraitIndex] };
    },
    {}
  );

  return {
    user: { ...pendingUser, avatar: { baseTraits, accessories } } as FakeUser,
  };
};
