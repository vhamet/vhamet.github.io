import { ReactNode, createContext } from "react";

import { RICKMORTY_CACHE_KEY } from "../pages/CachedRickMorty";
import useCache, { DispatchCacheAction } from "../hooks/useCache";
import { LocalState } from "../hooks/useLocalStorageState";
import { RickMortyCharacter } from "../utils/rickmorty";

type RickMortyCacheContextType = {
  cache: LocalState<RickMortyCharacter>;
  dispatch: DispatchCacheAction<RickMortyCharacter>;
};

export const RickMortyCacheContext = createContext(
  {} as RickMortyCacheContextType
);

const RickMortyCacheProvider = ({ children }: { children: ReactNode }) => {
  const { cache, dispatch } = useCache<RickMortyCharacter>(RICKMORTY_CACHE_KEY);

  return (
    <RickMortyCacheContext.Provider value={{ cache, dispatch }}>
      {children}
    </RickMortyCacheContext.Provider>
  );
};

export default RickMortyCacheProvider;
