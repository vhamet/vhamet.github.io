import React, { useEffect, useState } from "react";
import { CharStatus } from ".";

export type Guess = {
  word: string;
  statuses: CharStatus[];
};

type WordleGuessSlotProps = {
  letter: string;
  status: CharStatus;
  delay: number;
};

const WordleGuessSlot = ({ letter, status, delay }: WordleGuessSlotProps) => {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setTimeout(() => setAnimationClass("flip"), delay);
    if (status === "victory")
      setTimeout(() => setAnimationClass("flip bounce"), delay / 5 + 1800);
  }, [delay, status]);

  return (
    <div className={`wordle__guess__outer ${animationClass || ""}`}>
      <div className="wordle__guess__inner">
        <div className={`wordle__slot wordle__slot--back`}>{letter}</div>
        <div className={`wordle__slot wordle__slot--front ${status}`}>
          {letter}
        </div>
      </div>
    </div>
  );
};

type WorldGuessProps = {
  guess: Guess;
};

const WorldGuess = React.memo(
  ({ guess: { word, statuses } }: WorldGuessProps) => {
    return (
      <div className="wordle__attempt wordle__guess">
        {word.split("").map((char, i) => (
          <WordleGuessSlot
            key={i}
            letter={char}
            status={statuses[i]}
            delay={i * 300}
          />
        ))}
      </div>
    );
  },
  (prev, next) => prev.guess.word === next.guess.word
);

type WordleGuessesProps = {
  guesses: Guess[];
};

const WordleGuesses = React.memo(
  ({ guesses }: WordleGuessesProps) =>
    guesses.map((guess, i) => {
      return <WorldGuess key={i} guess={guess} />;
    }),
  (prev, next) => prev.guesses.length === next.guesses.length
);

export default WordleGuesses;
