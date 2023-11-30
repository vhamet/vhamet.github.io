import { useEffect } from "react";

import PokemonDataView from "./PokemonDataView";
import PokemonInfoFallback from "./PokemonFallback";
import useSafeAsync, { AsyncStatus } from "../../hooks/useSafeAsync";
import { fetchGraphqlData } from "../../utils/api";

type PokemonInfoProps = {
  pokemonName?: string;
};

type PokemonAttack = {
  name: string;
  type: string;
  damage: number;
};
export type Pokemon = {
  id: number;
  number: number;
  name: string;
  image: string;
  attacks: { special: PokemonAttack[] };
};

const POKEMON_QUERY = `
query pokemon($name: String) {
  pokemon(name: $name) {
    id
    number
    name
    image
    attacks {
      special {
        name
        type
        damage
      }
    }
  }
}
`;

const fetchPokemonAsync = async (pokemonName: string) => {
  const response = await fetchGraphqlData(
    "https://graphql-pokemon2.vercel.app/",
    POKEMON_QUERY,
    { name: pokemonName.toLowerCase() }
  );

  const { data } = await response.json();
  if (response.ok) {
    const pokemon = data?.pokemon as Pokemon;
    if (pokemon) return pokemon;

    return Promise.reject(
      new Error(`The pokemon "${pokemonName}" is not in the database.`)
    );
  } else {
    const error = {
      message: data?.errors?.map((e: Error) => e.message).join("\n"),
    };
    return Promise.reject(error);
  }
};

const PokemonInfo = ({ pokemonName }: PokemonInfoProps) => {
  const {
    data: pokemon,
    status,
    error,
    runFunction,
  } = useSafeAsync<Pokemon>({
    status: pokemonName ? AsyncStatus.pending : AsyncStatus.idle,
  });

  useEffect(() => {
    if (!pokemonName) return;

    runFunction(fetchPokemonAsync(pokemonName));
  }, [pokemonName, runFunction]);

  switch (status) {
    case AsyncStatus.idle:
      return <PokemonInfoFallback />;
    case AsyncStatus.pending:
      return <PokemonInfoFallback pokemonName={pokemonName} />;
    case AsyncStatus.rejected:
      throw error;
    case AsyncStatus.resolved:
      return <PokemonDataView pokemon={pokemon!} />;
    default:
      throw new Error("This should be impossible");
  }
};

export default PokemonInfo;
