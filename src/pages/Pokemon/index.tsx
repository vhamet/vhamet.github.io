import { useState } from "react";

import PokemonForm from "./PokemonForm";
import PokemonInfo from "./PokemonInfo";
import PokemonErrorBoundary from "./PokemonErrorBoundary";
import PageTitle from "../../components/PageTitle";

import "./Pokemon.scss";

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState("");

  const handleSubmit = (name: string) => {
    setPokemonName(name);
  };
  const handleReset = () => setPokemonName("");

  return (
    <div className="pokemon">
      <PageTitle title="Pokemon" />

      <PokemonForm defaultPokemonName={pokemonName} onSubmit={handleSubmit} />
      <PokemonErrorBoundary onReset={handleReset} key={pokemonName}>
        <PokemonInfo pokemonName={pokemonName} />
      </PokemonErrorBoundary>
    </div>
  );
};

export default Pokemon;
