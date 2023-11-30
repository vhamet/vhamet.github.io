import { ReactNode } from "react";
import Loader from "../../components/Loader";

export type InfoFallback = {
  image: ReactNode;
  name: ReactNode;
};

type RickMortyInfoFallbackProps = {
  fallback?: InfoFallback;
};

const RickMortyInfoFallback = ({ fallback }: RickMortyInfoFallbackProps) => {
  return (
    <section className="rickmorty__dataview fallback">
      <div className="rickmorty__image">
        {fallback ? fallback.image : <Loader />}
      </div>
      <div className="rickmorty__information">
        <label>{fallback ? fallback.name : "Loading..."}</label>
      </div>
    </section>
  );
};

export default RickMortyInfoFallback;
