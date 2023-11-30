import { MouseEvent, useState } from "react";

import "./DotInterview.scss";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";

type Dot = { x: number; y: number };

const DotInterview = () => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [undone, setUndone] = useState<Dot[]>([]);

  const addDot = (event: MouseEvent<HTMLElement>) => {
    const x = event.clientY;
    const y = event.clientX;

    setDots([...dots, { x, y }]);
  };

  const undo = () => {
    if (dots.length) {
      const updatedDots = [...dots];
      const undoneDot = updatedDots.pop() as Dot;
      setDots(updatedDots);
      setUndone([...undone, undoneDot]);
    }
  };

  const redo = () => {
    if (undone.length) {
      const updatedUndone = [...undone];
      const redoneDot = updatedUndone.pop() as Dot;
      setUndone(updatedUndone);
      setDots([...dots, redoneDot]);
    }
  };

  return (
    <div className="dot-interview">
      <PageTitle title="Dot" />
      <div className="dot-interview__actions">
        <Button onClick={undo} disabled={dots.length === 0}>
          UNDO
        </Button>
        <Button onClick={redo} disabled={undone.length === 0}>
          REDO
        </Button>
      </div>
      <div className="dot-interview__container" onMouseDown={addDot}>
        {dots.map((dot) => (
          <div
            key={Math.random()}
            className="dot"
            style={{ top: dot.x - 5, left: dot.y - 5 }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DotInterview;
