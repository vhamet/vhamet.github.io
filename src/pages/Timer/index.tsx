import { useEffect, useState } from "react";

import PageTitle from "../../components/PageTitle";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorage";

import "./Timer.scss";

const DEFAULT_TIMER = 60 * 10;
const SAVED_TIMER_KEY = "TIMER";

const computeInitialTimer = () => {
  const savedTimer = getLocalStorageItem<number>(SAVED_TIMER_KEY);
  return savedTimer || DEFAULT_TIMER;
};

const Timer = () => {
  const [timer, setTimer] = useState<number>(computeInitialTimer());

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer) {
        const newTimer = timer === 0 ? DEFAULT_TIMER : timer - 1;
        setLocalStorageItem(SAVED_TIMER_KEY, newTimer);
        setTimer(newTimer);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer]);

  return (
    <div className="timer">
      <PageTitle title="Timer" />

      <section className="timer__display">
        <label>
          {Math.trunc(timer / 60)
            .toString()
            .padStart(2, "0")}
        </label>
        :<label>{(timer % 60).toString().padStart(2, "0")}</label>
      </section>
    </div>
  );
};

export default Timer;
