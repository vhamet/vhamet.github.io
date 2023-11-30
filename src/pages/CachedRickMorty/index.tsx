import { useState } from "react";

import RickMortyForm from "../RickMorty/RickMortyForm";
import CachedRickMortyInfo from "./CachedRickMortyInfo";
import CachedRickMortyCache from "./CachedRickMortyCache";
import useRickMorty from "./useRickMorty";
import useRickMortyCache from "./useRickMortyCache";
import { AsyncStatus } from "../../hooks/useSafeAsync";
import RickMortyCacheProvider from "../../context/RickMortyContext";
import PageTitle from "../../components/PageTitle";

import "./CachedRickMorty.scss";

export const RICKMORTY_CACHE_KEY = "rick-and-morty";

type CachedRickMortyState = {
  submittedId?: string;
  cachedId?: string;
  submitted?: boolean;
};
const DEFAULT_STATE: CachedRickMortyState = { submitted: false };

const CachedRickMortyContent = () => {
  const [state, setState] = useState<CachedRickMortyState>(DEFAULT_STATE);
  const { cache } = useRickMortyCache();
  const { status, error, reload } = useRickMorty({
    characterId: state.submittedId,
    useCacheOnlyWhenNotReloading: !state.submitted,
  });

  const handleUpdate = (id: string) => {
    setState({ cachedId: id, submitted: false });
  };

  const handleSubmit = (id: string) => {
    setState({ submittedId: id, submitted: true, cachedId: id });
  };

  let formBottomText;
  const pending = status === AsyncStatus.pending;
  const cachedCharacter = state.cachedId && cache?.[state.cachedId];
  if (error) {
    formBottomText = (
      <ErrorBottomText characterId={state.cachedId!} onReload={reload} />
    );
  } else if (pending) {
    formBottomText = "This won't take long...";
  } else if (!state.cachedId) {
    formBottomText = "Which Rick and Morty Character?";
  } else if (cachedCharacter) {
    const { id, name } = cachedCharacter;
    formBottomText = `The character ${name} (#${id}) is in your cache! 🎉🥳`;
  } else {
    formBottomText = (
      <label>
        The id "{state.cachedId}" is not in your cache yet.&nbsp;
        <label
          className="cached-rickmorty__action"
          onClick={() =>
            setState({ ...state, submittedId: state.cachedId, submitted: true })
          }
        >
          Fetch it?
        </label>
      </label>
    );
  }

  return (
    <div className="cached-rickmorty rickmorty">
      <PageTitle title="Cached Rick & Morty" />

      <RickMortyForm
        onUpdate={handleUpdate}
        onSubmit={cachedCharacter && reload ? reload : handleSubmit}
        disabledPending={pending}
        disabledSubmit={pending || !state.cachedId}
        defaultCharacterId={state.cachedId}
        bottomText={formBottomText}
        fetchLabel={cachedCharacter ? "Reload" : ""}
      />

      <CachedRickMortyInfo
        characterId={state.cachedId}
        pending={pending}
        error={error || undefined}
      />

      <CachedRickMortyCache
        onSelect={handleUpdate}
        onDelete={() => setState({ submitted: false })}
        defaultSelectedId={state.cachedId}
      />
    </div>
  );
};

type ErrorBottomTextProps = { characterId: string; onReload: () => void };
const ErrorBottomText = ({ characterId, onReload }: ErrorBottomTextProps) => (
  <label className="cached-rickmorty__bottomtext">
    <label className="cached-rickmorty__exclamation">
      !&nbsp;&nbsp;!&nbsp;&nbsp;
    </label>
    <label>There was an error while fetching the id "{characterId}". </label>
    <label className="cached-rickmorty__action" onClick={onReload}>
      Try fetching it again?
    </label>
  </label>
);

const CachedRickMorty = () => (
  <RickMortyCacheProvider>
    <CachedRickMortyContent />
  </RickMortyCacheProvider>
);

export default CachedRickMorty;
