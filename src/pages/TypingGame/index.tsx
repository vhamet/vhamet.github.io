import { useEffect, useState } from "react";

import PageTitle from "../../components/PageTitle";
import wordList from "../../assets/data/wordList";

import "./TypingGame.scss";

const buildParagraph = (wordList: string[]) => {
  const seen: { [key: string]: boolean } = {};
  const selected = [];
  let added = 0;
  while (added < 25) {
    const randomId = Math.floor(Math.random() * (wordList.length + 1));
    if (seen[randomId]) continue;

    selected.push(wordList[randomId]);
    seen[randomId] = true;
    added++;
  }

  return selected
    .join(" ")
    .split("")
    .map((letter) => letter.toLocaleLowerCase());
};

const paragraph = buildParagraph(wordList);

const TypingGame = () => {
  const [input, setInput] = useState<string[]>([]);
  const [start, setStart] = useState<number>();
  const [perMinute, setPerMinute] = useState<string>();

  useEffect(() => {
    const handleInput = ({ key }: KeyboardEvent) => {
      if (!input.length) {
        setStart(Date.now());
      }

      if (perMinute) {
        return;
      }

      if (key === "Backspace") {
        const copy = [...input];
        copy.pop();
        setInput(copy);
      } else setInput([...input, key]);
    };
    document.addEventListener("keydown", handleInput);

    return () => document.removeEventListener("keydown", handleInput);
  }, [input, setInput, perMinute]);

  useEffect(() => {
    if (
      input.length === paragraph.length &&
      input.every((letter, i) => letter === paragraph[i])
    ) {
      const ellapedTime = Date.now() - start!;
      setPerMinute((25 / (ellapedTime / (1000 * 60))).toFixed(2));
    }
  }, [input, start]);

  return (
    <div className="typing-game">
      <PageTitle title="Typing Game" />

      <section className="typing-game__paragraph">
        {paragraph.map((letter, i) => (
          <label
            key={i}
            className={
              i < input.length
                ? input[i] === letter
                  ? "valid"
                  : "invalid"
                : ""
            }
          >
            {letter}
          </label>
        ))}
      </section>
      <section className="typing-game__result">
        {perMinute && `You type ${perMinute} words per minute`}
      </section>
    </div>
  );
};

export default TypingGame;
