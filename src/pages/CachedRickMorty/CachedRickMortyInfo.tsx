import RickMortyDataView from "../RickMorty/RickMortyDataView";
import RickMortyInfoFallback, {
  InfoFallback,
} from "../RickMorty/RickMortyInfoFallback";
import Avatar from "../../assets/images/avatar.svg?react";
import useRickMortyCache from "./useRickMortyCache";
import { RickMortyErrorFallback } from "../RickMorty/RickMortyErrorBoundary";

type CachedRickMortyInfoProps = {
  pending?: boolean;
  error?: Error;
  characterId?: string;
};

const FALLBACK_IDLE: InfoFallback = {
  image: <Avatar />,
  name: "???",
};

const CachedRickMortyInfo = ({
  characterId,
  pending,
  error,
}: CachedRickMortyInfoProps) => {
  const { cache } = useRickMortyCache();
  const cachedCharacter = characterId && cache[characterId];

  if (pending) return <RickMortyInfoFallback />;
  if (error) return <RickMortyErrorFallback error={error} />;

  if (cachedCharacter) {
    return <RickMortyDataView character={cachedCharacter} />;
  }

  return <RickMortyInfoFallback fallback={FALLBACK_IDLE} />;
};

export default CachedRickMortyInfo;
