import { useState, useEffect } from "react";
import styled from "styled-components";

import Button from "../../components/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .score {
    margin: 1rem 0;
    font-size: 1.5rem;
    font-family: "Bevan";
  }
`;

const Square = styled.div`
  height: 120px;
  aspect-ratio: 1;
  cursor: pointer;
`;

const RedSquare = styled(Square)`
  background: red;
`;

const GreenSquare = styled(Square)`
  background: green;
`;

const VICTORY_COUNT = 15;

type RedGreenSquareProps = {
  onClickRed: () => void;
  onClickGreen: () => void;
};

const RedGreenSquare = ({ onClickRed, onClickGreen }: RedGreenSquareProps) => {
  const [showGreen, setShowGreen] = useState(false);

  useEffect(() => {
    const timeoutSquare = setTimeout(
      () => setShowGreen(!showGreen),
      (Math.random() * 2 + 1) * 1000
    );

    return () => {
      if (timeoutSquare) clearTimeout(timeoutSquare);
    };
  }, [showGreen]);

  return showGreen ? (
    <GreenSquare onClick={onClickGreen} />
  ) : (
    <RedSquare onClick={onClickRed} />
  );
};

let timeoutGame: number;
function GreenLightRedLight() {
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);

  const start = () => {
    setScore(0);
    setOver(false);
    setTimer(15);
  };

  const clickRed = () => {
    setTimer(0);
    clearTimeout(timeoutGame);
    setOver(true);
  };

  const clickGreen = () => {
    const newScore = score + 1;
    if (newScore === VICTORY_COUNT) clearTimeout(timeoutGame);
    setScore(newScore);
  };

  useEffect(() => {
    if (timer > 0) timeoutGame = setTimeout(() => setTimer(timer - 1), 1000);

    return () => {
      if (timeoutGame) clearTimeout(timeoutGame);
    };
  }, [timer]);

  const gameOn = !over && timer && score < VICTORY_COUNT;
  const victory = !over && score >= VICTORY_COUNT;

  return (
    <Container>
      {gameOn ? (
        <div>Time left: {timer}s</div>
      ) : (
        <Button onClick={start}>Start game</Button>
      )}
      <div className="score">Score: {score}</div>
      <div>
        {gameOn ? (
          <RedGreenSquare onClickRed={clickRed} onClickGreen={clickGreen} />
        ) : victory ? (
          "You win!"
        ) : over ? (
          "Game Over!"
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}

export default GreenLightRedLight;
