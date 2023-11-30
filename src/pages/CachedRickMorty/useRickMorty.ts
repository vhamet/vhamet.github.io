import { useCallback, useEffect } from "react";

import useRickMortyCache from "./useRickMortyCache";
import useSafeAsync, { AsyncStatus } from "../../hooks/useSafeAsync";
import { RickMortyCharacter, fetchCharacterAsync } from "../../utils/rickmorty";

type UseRickMortyProps = {
  characterId?: string;
  useCacheOnlyWhenNotReloading?: boolean;
};

const useRickMorty = ({
  characterId,
  useCacheOnlyWhenNotReloading,
}: UseRickMortyProps) => {
  const { cache, dispatch: cacheDispatch } = useRickMortyCache();

  const {
    data: asyncData,
    status: asyncStatus,
    error: asyncError,
    runFunction,
    reset,
  } = useSafeAsync<RickMortyCharacter>({
    status: characterId ? AsyncStatus.pending : AsyncStatus.idle,
  });

  const load = useCallback(() => {
    if (characterId) {
      runFunction(
        fetchCharacterAsync(characterId).then((data) => {
          cacheDispatch({
            type: "OVERRIDE",
            key: characterId,
            data,
          });
          return data;
        })
      );
    }
  }, [characterId, cacheDispatch, runFunction]);

  useEffect(() => {
    reset();
    if (!characterId) return;
    if (!cache[characterId] && !useCacheOnlyWhenNotReloading) load();
  }, [characterId, load, cache, useCacheOnlyWhenNotReloading, reset]);

  const reload = useCallback(() => {
    if (!characterId) return;

    cacheDispatch({ type: "REMOVE", key: characterId });
    load();
  }, [load, characterId, cacheDispatch]);

  if (!characterId) {
    return { status: "idle", data: null };
  }

  if (cache[characterId]) {
    return { data: cache[characterId], status: "resolved", reload };
  }

  if (useCacheOnlyWhenNotReloading && !cache[characterId]) {
    return { status: "notInCache" };
  }

  return {
    status: asyncStatus,
    data: asyncData,
    error: asyncError,
    reload,
  };
};

export default useRickMorty;
