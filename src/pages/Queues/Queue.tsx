import { sumOfArray } from "../../utils/arrays";

type QueueProps = {
  clients: number[];
};

const Queue = ({ clients }: QueueProps) => {
  return (
    <div className="queue">
      <div className="queue__element queue__checkout">
        {sumOfArray(clients)}
      </div>
      {clients.map((n, i) => (
        <div key={i} className="queue__element queue__client">
          {n}
        </div>
      ))}
    </div>
  );
};

export default Queue;
