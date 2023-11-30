import { useCallback, useEffect, useRef, useState } from "react";

import WordleGuesses, { Guess } from "./WordleGuesses";
import WordleCurrentGuess from "./WordleCurrentGuess";
import WordleRemainingGuesses from "./WordleRemainingGuesses";
import WordleKeyboard, { KeyStatuses } from "./WordleKeyboard";
import PageTitle from "../../components/PageTitle";
import words from "../../assets/data/wordle";

import "./Wordle.scss";

// TODO
// hard mode

type GameStatus = "ongoing" | "victory" | "defeat";
const VICTORY_MESSAGES = [
  "Genius",
  "Magnificent",
  "Impressive",
  "Splendid",
  "Great",
  "Phew",
];

const SET_WORD = words.reduce((set, word) => set.add(word), new Set<string>());

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const initKeyStatuses = (): KeyStatuses =>
  "azertyuiopqsdfghjklmwxcvbn"
    .split("")
    .reduce((acc, char) => ({ ...acc, [char]: "unknown" }), {});

type Counter = { [key: string]: number };

const computeCharCounter = (word: string) =>
  word.split("").reduce(
    (acc: Counter, char) => ({
      ...acc,
      [char]: (acc[char] || 0) + 1,
    }),
    {}
  );

export type CharStatus = "right" | "wrong" | "misplaced" | "victory";
const computeCharStatuses = (word: string, solution: string) => {
  const statuses: CharStatus[] = Array.from(Array(5));
  const counter = computeCharCounter(solution);
  for (let i = 0; i < 5; i++) {
    const char = word[i];
    if (char === solution[i]) {
      statuses[i] = "right";
      counter[char]--;
    } else if (!solution.includes(char)) statuses[i] = "wrong";
  }

  for (let i = 0; i < 5; i++) {
    const char = word[i];
    if (!statuses[i]) {
      if (counter[char]) {
        statuses[i] = "misplaced";
        counter[char]--;
      } else statuses[i] = "wrong";
    }
  }

  return statuses;
};

const Wordle = () => {
  const [solution, setSolution] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [message, setMessage] = useState("");
  const [invalidWord, setInvalidWord] = useState(false);
  const [status, setStatus] = useState<GameStatus>("ongoing");
  const [keyStatuses, setKeyStatuses] = useState(() => initKeyStatuses());
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const submitWord = useCallback(() => {
    // INVALID MESSAGE
    let invalidMessage;
    if (currentGuess.length < 5) invalidMessage = "Not enough letters";
    else if (!SET_WORD.has(currentGuess)) invalidMessage = "Not in word list";
    if (invalidMessage) {
      setMessage(invalidMessage);
      setInvalidWord(true);
      setTimeout(() => setInvalidWord(false), 500);
      return;
    }

    // COMPUTE STATUS
    const charStatuses = computeCharStatuses(currentGuess, solution);
    const updatedStatuses = charStatuses.reduce(
      (acc, status, i) => ({
        ...acc,
        [currentGuess[i]]: keyStatuses[i] !== "right" ? status : "right",
      }),
      {}
    );
    setTimeout(
      () => setKeyStatuses({ ...keyStatuses, ...updatedStatuses }),
      1800
    );
    setGuesses([...guesses, { word: currentGuess, statuses: charStatuses }]);
    setCurrentGuess("");

    // VICTORY
    if (currentGuess === solution) {
      setTimeout(() => {
        setStatus("victory");
        setMessage(VICTORY_MESSAGES[guesses.length]);
      }, 1800);
      setGuesses([
        ...guesses,
        { word: currentGuess, statuses: charStatuses.map(() => "victory") },
      ]);
    }
    // DEFEAT
    else if (guesses.length === 5) {
      setStatus("defeat");
      setMessage(solution);
    }
  }, [currentGuess, guesses, keyStatuses, solution]);

  const handleKeySubmission = useCallback(
    (key: string) => {
      switch (key) {
        case "Backspace":
          if (currentGuess.length > 0)
            setCurrentGuess((guess) => guess.slice(0, -1));
          break;
        case "Enter":
          submitWord();
          break;
        default:
          if (
            key.length === 1 &&
            key.match(/[a-zA-Z]/) &&
            currentGuess.length < 5
          )
            setCurrentGuess((guess) => guess + key.toUpperCase());

          break;
      }
    },
    [currentGuess.length, submitWord]
  );

  useEffect(() => {
    const handleKeydown = ({ key }: KeyboardEvent) => handleKeySubmission(key);

    if (status === "ongoing")
      document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeySubmission, status]);

  const restart = () => {
    setStatus("ongoing");
    setSolution(getRandomWord());
    setKeyStatuses(initKeyStatuses());
    setGuesses([]);
    setCurrentGuess("");
    setMessage("");
  };

  return (
    <div className="wordle">
      <PageTitle title="Wordle" />
      <h1 className={status} onClick={restart}>
        Wordle
      </h1>

      <div
        className={`wordle__message ${message ? "visible" : ""}`}
        onTransitionEnd={(event: { elapsedTime: number }) => {
          if (event.elapsedTime === 0.001) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setMessage(""), 2000);
          }
        }}
      >
        {message}
      </div>

      <section className="wordle__grid">
        <WordleGuesses guesses={guesses} />
        {guesses.length < 6 && (
          <WordleCurrentGuess word={currentGuess} invalid={invalidWord} />
        )}
        {guesses.length < 5 && (
          <WordleRemainingGuesses remaining={5 - guesses.length} />
        )}
      </section>

      <section className="wordle__keyboard">
        <WordleKeyboard statuses={keyStatuses} />
      </section>
    </div>
  );
};

export default Wordle;
