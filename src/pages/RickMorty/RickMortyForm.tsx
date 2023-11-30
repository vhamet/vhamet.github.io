import { FormEvent, ReactNode, useEffect, useState } from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Dice from "../../assets/images/dice.svg?react";

type RickMortyFormProps = {
  onUpdate: (characterId: string) => void;
  onSubmit: (characterId: string) => void;
  disabledPending: boolean;
  disabledSubmit: boolean;
  defaultCharacterId?: string;
  bottomText?: ReactNode;
  fetchLabel?: string;
};

const RickMortyForm = ({
  onUpdate,
  onSubmit,
  disabledPending,
  disabledSubmit,
  defaultCharacterId,
  bottomText,
  fetchLabel,
}: RickMortyFormProps) => {
  const [characterId, setCharacterId] = useState<string | undefined>(
    defaultCharacterId
  );

  useEffect(() => setCharacterId(defaultCharacterId), [defaultCharacterId]);

  const fetchRandomCharacter = (event: FormEvent) => {
    event.preventDefault();
    const randomId = Math.floor(Math.random() * 826 + 1).toString();
    setCharacterId(randomId);
    onSubmit(randomId);
  };

  const handleUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    const newCharacterId = event.currentTarget.value;
    setCharacterId(newCharacterId);
    onUpdate(newCharacterId);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(characterId!);
  };

  return (
    <section className="rickmorty__search">
      <form className="rickmorty__form" onSubmit={handleSubmit}>
        <Input
          disabled={disabledPending}
          type="number"
          placeholder="Pick a number !"
          value={characterId || ""}
          onChange={handleUpdate}
          min={1}
        />
        <Button disabled={disabledSubmit}>{fetchLabel || "Fetch"}</Button>
        <Button
          disabled={disabledPending}
          classnames="dice-button"
          onClick={fetchRandomCharacter}
        >
          <Dice />
        </Button>
      </form>
      <legend className="legend">
        {bottomText || "Which Rick and Morty Character ?"}
      </legend>
    </section>
  );
};

export default RickMortyForm;
