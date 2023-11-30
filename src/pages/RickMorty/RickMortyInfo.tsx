import { useEffect } from "react";

import RickMortyDataView from "./RickMortyDataView";
import RickMortyInfoFallback, { InfoFallback } from "./RickMortyInfoFallback";
import useSafeAsync, { AsyncStatus } from "../../hooks/useSafeAsync";
import Avatar from "../../assets/images/avatar.svg?react";
import { RickMortyCharacter, fetchCharacterAsync } from "../../utils/rickmorty";

type RickMortyInfoProps = {
  characterId?: string;
  updateStatus: (status: AsyncStatus) => void;
};

const FALLBACK_IDLE: InfoFallback = {
  image: <Avatar />,
  name: "???",
};

const RickMortyInfo = ({ characterId, updateStatus }: RickMortyInfoProps) => {
  const {
    data: character,
    status,
    error,
    runFunction,
  } = useSafeAsync<RickMortyCharacter>({
    status: characterId ? AsyncStatus.pending : AsyncStatus.idle,
  });

  useEffect(() => {
    updateStatus(status);
  }, [status, updateStatus]);

  useEffect(() => {
    if (!characterId) return;

    runFunction(fetchCharacterAsync(characterId));
  }, [characterId, runFunction]);

  switch (status) {
    case AsyncStatus.idle:
      return <RickMortyInfoFallback fallback={FALLBACK_IDLE} />;
    case AsyncStatus.pending:
      return <RickMortyInfoFallback />;
    case AsyncStatus.rejected:
      throw error;
    case AsyncStatus.resolved:
      return <RickMortyDataView character={character!} />;
    default:
      throw new Error("This should be impossible");
  }
};

export default RickMortyInfo;
