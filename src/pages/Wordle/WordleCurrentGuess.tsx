type WordleCurrentGuessProps = { word: string; invalid: boolean };

const WordleCurrentGuess = ({ word, invalid }: WordleCurrentGuessProps) => (
  <div className={`wordle__attempt ${invalid ? "shake" : ""}`}>
    {word.split("").map((char, i) => (
      <div key={i} className="wordle__slot pending filled">
        {char}
      </div>
    ))}
    {Array.from(Array(5 - word.length)).map((char, i) => (
      <div key={i} className="wordle__slot pending">
        {char}
      </div>
    ))}
  </div>
);

export default WordleCurrentGuess;
