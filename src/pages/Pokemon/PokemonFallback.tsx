import Loader from "../../components/Loader";

type PokemonInfoFallbackProps = {
  pokemonName?: string;
};

const PokemonInfoFallback = ({ pokemonName }: PokemonInfoFallbackProps) => {
  return (
    <section className="pokemon__data">
      <div className="pokemon__name">
        {pokemonName ? (
          <>
            Loading {pokemonName}... <label>(xxx)</label>
          </>
        ) : (
          <>
            No Pokemon Yet! <label>(xxx)</label>
          </>
        )}
      </div>
      <div className="pokemon__picture">
        {pokemonName ? <Loader /> : "Please submit a pokemon!"}
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
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PokemonInfoFallback;
