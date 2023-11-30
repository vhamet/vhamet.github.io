import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { CharStatus } from ".";
import React from "react";

const FIRST_LINE = "QWERTYUIOP".split("");
const SECOND_LINE = "ASDFGHJKL".split("");
const THIRD_LINE = "ZXCVBNM".split("");

type KeyStatus = "unknown" | CharStatus;
export type KeyStatuses = { [key: string]: KeyStatus };

type WordleKeyboardLineProps = {
  keys: string[];
  statuses: KeyStatuses;
};

const dispatchKey = (key: string) => {
  const event = new KeyboardEvent("keydown", { key });
  document.dispatchEvent(event);
};

const WordleKeyboardLine = ({ keys, statuses }: WordleKeyboardLineProps) => (
  <div className="wordle__keyboard__line">
    {keys.map((key) => (
      <span
        key={key}
        className={`wordle__keyboard__key ${statuses[key]}`}
        onClick={() => dispatchKey(key)}
      >
        {key}
      </span>
    ))}
  </div>
);

const WordleKeyboardLineWithActions = ({
  keys,
  statuses,
}: WordleKeyboardLineProps) => (
  <div className="wordle__keyboard__line">
    <span
      className="wordle__keyboard__key enter-key"
      onClick={() => dispatchKey("Enter")}
    >
      {"ENTER"}
    </span>
    {keys.map((key) => (
      <span
        key={key}
        className={`wordle__keyboard__key ${statuses[key]}`}
        onClick={() => dispatchKey(key)}
      >
        {key}
      </span>
    ))}
    <span
      className="wordle__keyboard__key backspace-key"
      onClick={() => dispatchKey("Backspace")}
    >
      <FontAwesomeIcon icon={faDeleteLeft} />
    </span>
  </div>
);

type WordleKeyboardProps = {
  statuses: KeyStatuses;
};
const WordleKeyboard = React.memo(({ statuses }: WordleKeyboardProps) => (
  <div className="wordle__keyboard">
    <WordleKeyboardLine keys={FIRST_LINE} statuses={statuses} />
    <WordleKeyboardLine keys={SECOND_LINE} statuses={statuses} />
    <WordleKeyboardLineWithActions keys={THIRD_LINE} statuses={statuses} />
  </div>
));

export default WordleKeyboard;
