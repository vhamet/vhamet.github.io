import { useRef, useState } from "react";

import DropDownList from "../../components/DropDownList";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";

import "./TicTacToe.scss";

type Player = "x" | "o" | null;
type Grid = Player[][];
type Move = {
  player: Player;
  x: number;
  y: number;
  active: boolean;
};

const TICTACTOE_SIZES = Array.from(Array(20)).map((_, i) => ({ value: i + 1 }));
const TICTACTOE_DEFAULT_SIZE = 3;

const initGrid = (size = 3): Grid =>
  Array.from(Array(size)).map(() => Array.from(Array(size)));

const checkRow = (row: Player[], value: Player) =>
  row.every((cell) => cell === value);

const checkVictory = (grid: Grid, x: number, y: number) => {
  const currentPlayer = grid[x][y];

  if (checkRow(grid[x], currentPlayer)) return true;

  const column = grid.map((row) => row[y]);
  if (checkRow(column, currentPlayer)) return true;

  if (x === y) {
    const diagonal = grid.map((row, i) => row[i]);
    if (checkRow(diagonal, currentPlayer)) return true;
  }

  const size = grid.length - 1;
  if (y === size - x) {
    const diagonal = grid.map((row, i) => row[size - i]);
    if (checkRow(diagonal, currentPlayer)) return true;
  }

  return false;
};

const checkOver = (grid: Grid) => grid.every((row) => row.every(Boolean));

const getSelectedSize = (sizeRef: React.RefObject<HTMLInputElement>) =>
  sizeRef.current ? parseInt(sizeRef.current?.value) : TICTACTOE_DEFAULT_SIZE;

const TicTacToe = () => {
  const sizeRef = useRef<HTMLInputElement>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("o");
  const [grid, setGrid] = useState(initGrid(getSelectedSize(sizeRef)));
  const [winner, setWinner] = useState<Player | null>();
  const [over, setOver] = useState(false);
  const [history, setHistory] = useState<Move[]>([]);

  const play = (x: number, y: number) => {
    if (!grid[x][y] && !winner && !over) {
      const updatedGrid = grid.map((row, i) =>
        row.map((cell, j) => (x === i && y === j ? currentPlayer : cell))
      );

      if (checkVictory(updatedGrid, x, y)) setWinner(currentPlayer);
      else if (checkOver(updatedGrid)) setOver(true);
      else setCurrentPlayer(currentPlayer === "x" ? "o" : "x");

      setGrid(updatedGrid);
      setHistory([
        ...history.filter(({ active }) => active),
        { player: currentPlayer, x, y, active: true },
      ]);
    }
  };

  const restart = () => {
    setCurrentPlayer("x");
    setGrid(initGrid(getSelectedSize(sizeRef)));
    setWinner(null);
    setOver(false);
    setHistory([]);
  };

  const handleTimeTravel = (move: Move) => {
    if (winner || over) return;

    const historyGrid = initGrid(getSelectedSize(sizeRef));
    const updatedHistory = [];
    let done = false;
    for (let i = 0; i < history.length; i++) {
      if (done) {
        updatedHistory.push({ ...history[i], active: false });
        continue;
      }

      updatedHistory.push({ ...history[i], active: true });
      historyGrid[history[i].x][history[i].y] = history[i].player;

      if (move.x === history[i].x && move.y === history[i].y) {
        done = true;
      }
    }

    setHistory(updatedHistory);
    setGrid(historyGrid);
    setCurrentPlayer(move.player === "x" ? "o" : "x");
  };

  return (
    <div className="tictactoe">
      <PageTitle title="Tic Tac Toe" />
      <h1>Tic Tac Toe</h1>
      <section className="tictactoe__actions">
        Size
        <DropDownList
          options={TICTACTOE_SIZES}
          ref={sizeRef}
          defaultValue={TICTACTOE_DEFAULT_SIZE}
        />
        <Button onClick={restart}>Restart</Button>
      </section>
      <section className="tictactoe__grid">
        {grid.map((row, i) => (
          <div key={`row_${i}`} className="tictactoe__row">
            {row.map((cell, j) => (
              <div
                key={`row_${j}`}
                className={`tictactoe__cell player player_${cell}`}
                onClick={() => play(i, j)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </section>
      <section className="tictactoe__infos">
        <div className="tictactoe__status">
          {over ? (
            "Game Over"
          ) : winner ? (
            <label>
              Winner : <PlayerSymbol player={currentPlayer} />
            </label>
          ) : (
            <label>
              Current player : <PlayerSymbol player={currentPlayer} />
            </label>
          )}
        </div>

        <div className="tictactoe__history">
          {history.map((move, i) => (
            <div
              key={`move_${move.x}_${move.y}`}
              className={`tictactoe__move player player_${move.player}${
                move.active ? "" : " inactive"
              }`}
              onClick={() => handleTimeTravel(move)}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TicTacToe;

type PlayerSymbolProps = { player: Player };
const PlayerSymbol = ({ player }: PlayerSymbolProps) => (
  <label className={`player player_${player}`}>{player}</label>
);
