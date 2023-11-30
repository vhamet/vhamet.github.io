import { RickMortyCharacter } from "./RickMortyInfo";

type RickMortyDataViewProps = { character: RickMortyCharacter };

const RickMortyDataView = ({ character }: RickMortyDataViewProps) => {
  return (
    <section className="rickmorty__dataview">
      <div className="rickmorty__image">
        <img src={character.image} alt={character.name} />
      </div>
      <div className="rickmorty__information">
        <label>{character.name}</label>
        <label>
          #{character.id}, {character.status}, {character.species},{" "}
          {character.gender}
        </label>
        <label>Origin: {character.origin.name}</label>
        <label>Location: {character.location.name}</label>
      </div>
    </section>
  );
};

export default RickMortyDataView;
