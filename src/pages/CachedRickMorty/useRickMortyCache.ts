import { useContext } from "react";
import { RickMortyCacheContext } from "../../context/RickMortyContext";

const useRickMortyCache = () => {
  const context = useContext(RickMortyCacheContext);
  if (!context) {
    throw new Error(
      "useRickMortyCache must be used within a RickMortyCacheProvider"
    );
  }
  return context;
};

export default useRickMortyCache;
