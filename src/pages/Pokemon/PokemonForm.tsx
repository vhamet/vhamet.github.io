import Input from "../../components/Input";
import Button from "../../components/Button";
import { FormEvent, useEffect, useRef } from "react";

type PokemonFormProps = {
  defaultPokemonName?: string;
  onSubmit: (pokemonName: string) => void;
};

const PokemonForm = ({ defaultPokemonName, onSubmit }: PokemonFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultPokemonName || "";
  }, [defaultPokemonName]);

  const suggestPokemon = (name: string) => {
    inputRef.current!.value = name;
    onSubmit(inputRef.current!.value);
  };

  const submitPokemon = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(inputRef.current!.value);
  };
  return (
    <section className="pokemon__actions">
      <form className="pokemon__form" onSubmit={submitPokemon}>
        <Input ref={inputRef} placeholder="Which Pokemon ?" />
        <Button disabled={!inputRef.current?.value}>Fetch!</Button>
      </form>
      <div className="pokemon__suggestions">
        Out of ideas ? Try{" "}
        <PokemonSuggestion
          name="Pikachu"
          onClick={() => suggestPokemon("Pikachu")}
        />
        ,{" "}
        <PokemonSuggestion
          name="Charizard"
          onClick={() => suggestPokemon("Charizard")}
        />{" "}
        or{" "}
        <PokemonSuggestion
          name="Snorlax"
          onClick={() => suggestPokemon("Snorlax")}
        />
      </div>
    </section>
  );
};

export default PokemonForm;

type PokemonSuggestionProps = {
  name: string;
  onClick: () => void;
};

const PokemonSuggestion = ({ name, onClick }: PokemonSuggestionProps) => (
  <label className="pokemon-suggestion" onClick={onClick}>
    {name}
  </label>
);
