type WordleRemainingGuessesProps = { remaining: number };

const WordleRemainingGuesses = ({ remaining }: WordleRemainingGuessesProps) =>
  Array.from(Array(remaining)).map((_, i) => (
    <div key={i} className="wordle__attempt">
      {Array.from(Array(5)).map((_, i) => (
        <div key={i} className="wordle__slot pending"></div>
      ))}
    </div>
  ));

export default WordleRemainingGuesses;
