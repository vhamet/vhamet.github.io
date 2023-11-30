import {
  ErrorBoundary,
  ErrorBoundaryPropsWithComponent,
} from "react-error-boundary";

import AvatarError from "../../assets/images/avatar-error.svg?react";
import Button from "../../components/Button";

type RickMortyErrorFallbackProps = {
  error: Error;
  resetErrorBoundary?: () => void;
};

export const RickMortyErrorFallback = ({
  error,
  resetErrorBoundary,
}: RickMortyErrorFallbackProps) => {
  return (
    <section className="rickmorty__dataview error">
      <div className="rickmorty__image">{<AvatarError />}</div>
      <div className="rickmorty__information">
        <label>xxx</label>
        <label>
          ERROR: {error.message || "An error occured, please try again"}
        </label>
        {resetErrorBoundary && (
          <Button buttonStyle="error" onClick={resetErrorBoundary}>
            RESET
          </Button>
        )}
      </div>
    </section>
  );
};

type RickMortyErrorBoundaryProps = Omit<
  ErrorBoundaryPropsWithComponent,
  "FallbackComponent"
>;

const RickMortyErrorBoundary = (props: RickMortyErrorBoundaryProps) => {
  const errorBoundaryProps = {
    ...props,
  };
  return (
    <ErrorBoundary
      FallbackComponent={RickMortyErrorFallback}
      {...errorBoundaryProps}
    />
  );
};

export default RickMortyErrorBoundary;
