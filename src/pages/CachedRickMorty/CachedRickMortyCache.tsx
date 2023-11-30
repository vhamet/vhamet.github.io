import { useEffect, useState } from "react";

import useRickMortyCache from "./useRickMortyCache";

type CachedRickMortyCacheProps = {
  onSelect: (characterId: string) => void;
  onDelete: () => void;
  defaultSelectedId?: string;
};

const CachedRickMortyCache = ({
  onSelect,
  onDelete,
  defaultSelectedId,
}: CachedRickMortyCacheProps) => {
  const { cache, dispatch } = useRickMortyCache();

  const [selectedId, setSelectedId] = useState<string>();
  useEffect(() => {
    if (defaultSelectedId) setSelectedId(defaultSelectedId);
  }, [defaultSelectedId]);

  const selectedCharacter = selectedId && cache[selectedId];
  const cachedCharacters = Object.values(cache);
  const handleSelection = (id: string) => onSelect(id);
  const handleDelete = () => {
    if (selectedCharacter) {
      dispatch({ type: "REMOVE", key: selectedCharacter.id.toString() });
      onDelete();
    }
  };
  const handleClear = () => {
    dispatch({ type: "CLEAR" });
    onDelete();
  };

  return (
    cachedCharacters.length > 0 && (
      <section className="cached-rickmorty__cache">
        <p onClick={handleDelete}>
          {selectedCharacter &&
            `Remove "${selectedCharacter.name}" (#${selectedId}) from cache?`}
        </p>

        <>
          <p onClick={handleClear}>Clear cache?</p>
          <div className="cached-rickmorty__characters">
            {cachedCharacters.map((character) => (
              <img
                key={character.id}
                src={character.image}
                alt={character.name}
                className={character.id == selectedId ? "selected" : ""}
                onClick={() => handleSelection(character.id)}
              />
            ))}
          </div>
        </>
      </section>
    )
  );
};

export default CachedRickMortyCache;
