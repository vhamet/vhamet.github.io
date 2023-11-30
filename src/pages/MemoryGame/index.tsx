import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { shuffle } from "../../utils/arrays";
import "./MemoryGame.scss";
import Button from "../../components/Button";

const symbols = ["🤡", "🤖", "🎃", "🧠", "👑", "🦄", "🍀", "🐲", "🦋", "❤️‍🔥"];

type Card = {
  id: number;
  symbol: string;
  facing: boolean;
  found: boolean;
};

const shuffleCards = (facing: boolean) => {
  const cards = [...symbols, ...symbols].map(
    (symbol, i) =>
      ({
        id: i,
        symbol,
        facing,
        found: false,
      } as Card)
  );

  return shuffle(cards);
};

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>(shuffleCards(true));
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [started, setStarted] = useState(false);

  const handleSelection = (card: Card) => {
    if (selectedCards.length === 2) return;
    if (!selectedCards.length) {
      setSelectedCards([card]);
    } else if (card.symbol !== selectedCards[0].symbol) {
      setSelectedCards([...selectedCards, card]);
      setTimeout(() => {
        setSelectedCards([]);
      }, 1500);
    } else {
      const selectedIds = [selectedCards[0].id, card.id];
      setCards(
        cards.map((card) =>
          selectedIds.includes(card.id) ? { ...card, found: true } : card
        )
      );
      setSelectedCards([]);
    }
  };

  useEffect(() => {
    let timeout: number;
    if (!started) {
      timeout = setTimeout(() => {
        setCards(cards.map((card) => ({ ...card, facing: false })));
        setStarted(true);
      }, 3000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [cards, started]);

  const restart = () => {
    setCards(shuffleCards(true));
    setStarted(false);
  };

  return (
    <div className="memory-game">
      <PageTitle title="Memory Game" />

      <h1>
        <img src="/src/assets/images/memory-logo.png" />
      </h1>
      <section className="memory-game__cards">
        {cards.map((card) => {
          const selected = selectedCards.some(({ id }) => card.id === id);
          const faceUp = card.facing || card.found || selected;
          return (
            <div
              key={card.id}
              className={`card ${faceUp ? "up" : "down"}${
                selected ? " selected" : ""
              }${card.found ? " found" : ""}`}
              onClick={() => started && handleSelection(card)}
            >
              {faceUp && card.symbol}
            </div>
          );
        })}
      </section>
      <Button onClick={restart}>Restart</Button>
    </div>
  );
};

export default MemoryGame;
