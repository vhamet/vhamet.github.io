import { FormEvent, useEffect, useState } from "react";

import Queue from "./Queue";
import Input from "../../components/Input";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import { sumOfArray } from "../../utils/arrays";

import "./Queues.scss";

const Queues = () => {
  const [queues, setQueues] = useState<number[][]>([
    [1, 5, 3],
    [10],
    [],
    [35, 2],
    [],
  ]);
  const [items, setItems] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setQueues((qs) =>
        qs.map((q) => {
          if (!q.length) return q;
          const [first, ...queue] = q;
          if (first === 1) return queue;
          return [first - 1, ...queue];
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const findQueue = (e: FormEvent) => {
    e.preventDefault();
    let bestQueueIndex = 0,
      minWait = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < 5; i++) {
      const sum = sumOfArray(queues[i]);
      if (sum < minWait) {
        minWait = sum;
        bestQueueIndex = i;
      }

      const qs = [...queues];
      qs[bestQueueIndex] = [...qs[bestQueueIndex], parseInt(items)];

      setQueues(qs);
    }
  };

  return (
    <div className="queues">
      <PageTitle title="Queues" />
      <h1>Queues</h1>
      <form className="queues__form" onSubmit={findQueue}>
        <Input
          type="number"
          value={items}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setItems(e.currentTarget.value)
          }
          min={1}
        />
        <Button disabled={!items}>CHECKOUT</Button>
      </form>
      <div className="queues__container">
        {queues.map((queue, i) => (
          <Queue key={i} clients={queue} />
        ))}
      </div>
    </div>
  );
};

export default Queues;
