import { useState } from "react";

import RickMortyForm from "./RickMortyForm";
import RickMortyInfo from "./RickMortyInfo";
import RickMortyErrorBoundary from "./RickMortyErrorBoundary";
import Checkbox from "../../components/Checkbox";
import PageTitle from "../../components/PageTitle";
import { AsyncStatus } from "../../hooks/useSafeAsync";

import "./RickMorty.scss";

type RickMortyFormState = {
  submitted: string;
  pending?: string;
};

const DEFAULT_STATE: RickMortyFormState = {
  submitted: "",
};

const RickMortyContent = () => {
  const [state, setState] = useState<RickMortyFormState>(DEFAULT_STATE);
  const [fetchStatus, setFetchStatus] = useState(AsyncStatus.idle);

  const handleUpdate = (characterId: string) =>
    setState({ ...state, pending: characterId });

  const handleSubmit = (characterId: string) =>
    setState({ pending: characterId, submitted: characterId });

  const handleReset = () => setState(DEFAULT_STATE);

  const disabledPending = fetchStatus === AsyncStatus.pending;

  return (
    <div className="rickmorty__content">
      <RickMortyForm
        onUpdate={handleUpdate}
        onSubmit={handleSubmit}
        defaultCharacterId={state.pending}
        disabledPending={disabledPending}
        disabledSubmit={
          disabledPending ||
          !state.pending ||
          (state.pending === state.submitted &&
            [AsyncStatus.resolved, AsyncStatus.rejected].includes(fetchStatus))
        }
      />
      <RickMortyErrorBoundary onReset={handleReset}>
        <RickMortyInfo
          characterId={state.submitted}
          updateStatus={setFetchStatus}
        />
      </RickMortyErrorBoundary>
    </div>
  );
};

const RickMorty = () => {
  const [showSearch, setShowSearch] = useState(true);

  return (
    <div className="rickmorty">
      <PageTitle title="Rick & Morty" />
      <section className="rickmorty__toggle">
        <Checkbox
          checked={showSearch}
          onChange={() => setShowSearch(!showSearch)}
          htmlFor="Mount the search bar"
        />
      </section>
      {showSearch && <RickMortyContent />}
    </div>
  );
};

export default RickMorty;
