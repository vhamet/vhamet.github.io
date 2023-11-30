import {
  ErrorBoundary,
  ErrorBoundaryPropsWithComponent,
} from "react-error-boundary";

import Button from "../../components/Button";

type PokemonErrorFallbackProps = {
  error: Error;
  resetErrorBoundary?: () => void;
};

const PokemonErrorFallback = ({
  error,
  resetErrorBoundary,
}: PokemonErrorFallbackProps) => {
  return (
    <section className="pokemon__data error">
      <div className="pokemon__name">
        <>
          Error! :( <label>(xxx)</label>
        </>
      </div>
      <div className="pokemon__picture">
        <>
          <label>{error.message}</label>
          <Button onClick={resetErrorBoundary} buttonStyle="error">
            Try again
          </Button>
        </>
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

type PokemonErrorBoundaryProps = Omit<
  ErrorBoundaryPropsWithComponent,
  "FallbackComponent"
>;

const PokemonErrorBoundary = (props: PokemonErrorBoundaryProps) => {
  const errorBoundaryProps = {
    ...props,
  };
  return (
    <ErrorBoundary
      FallbackComponent={PokemonErrorFallback}
      {...errorBoundaryProps}
    />
  );
};

export default PokemonErrorBoundary;
