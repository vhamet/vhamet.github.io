import { fetchGraphqlData } from "./api";

type RickMortyLocation = { name: string };
export type RickMortyCharacter = {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: RickMortyLocation;
  location: RickMortyLocation;
};

const CHARACTER_QUERY = `
query character($id: ID!) {
  character(id: $id) {
    id
    name
    image
    status
    species
    gender
    origin {
      name
    }
    location {
      name
    }
  }
}
`;

export const fetchCharacterAsync = async (characterId: string) => {
  const response = await fetchGraphqlData(
    "https://rickandmortyapi.com/graphql",
    CHARACTER_QUERY,
    { id: characterId }
  );

  const { data } = await response.json();
  if (response.ok) {
    const character = data?.character as RickMortyCharacter;
    if (character) return character;

    return Promise.reject(
      new Error(`No character with the id "${characterId}"`)
    );
  } else {
    const error = {
      message: data?.errors?.map((e: Error) => e.message).join("\n"),
    };
    return Promise.reject(error);
  }
};
