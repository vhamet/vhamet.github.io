import { Pokemon } from "./PokemonInfo";

type PokemonDataViewProps = { pokemon: Pokemon };

const PokemonDataView = ({ pokemon }: PokemonDataViewProps) => {
  return (
    <section className="pokemon__data filled">
      <div className="pokemon__name">
        {pokemon.name} <label>({pokemon.number})</label>
      </div>
      <div className="pokemon__picture">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <div className="pokemon__moves">
        <table>
          <thead>
            <tr>
              <td>Move</td>
              <td>Type</td>
              <td>Damage</td>
            </tr>
          </thead>
          <tbody>
            {pokemon.attacks.special.map(({ name, type, damage }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{type}</td>
                <td>{damage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PokemonDataView;
