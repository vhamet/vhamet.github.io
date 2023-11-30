import { useState } from "react";

import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";

import "./MetaInterview.scss";

type Item = {
  value: number;
  selected: boolean;
};

const LIST: Item[] = [
  { value: 1, selected: false },
  { value: 2, selected: false },
  { value: 3, selected: false },
  { value: 4, selected: false },
];

type ItemElementProps = { item: Item; onSelect: () => void };
const ItemElement = ({ item, onSelect }: ItemElementProps) => (
  <p>
    <input
      id={`item_${item.value}`}
      type="checkbox"
      checked={item.selected}
      onChange={onSelect}
    />
    <label htmlFor={`item_${item.value}`}>{item.value}</label>
  </p>
);

const checkItem = (list: Item[], value: number) =>
  list.map((item) =>
    item.value === value ? { ...item, selected: !item.selected } : item
  );

const filterSelectedElements = (list: Item[]) =>
  list.reduce(
    ({ kept, moved }, item) => {
      if (item.selected)
        return {
          kept: kept,
          moved: [...moved, { ...item, selected: false }],
        };
      return {
        kept: [...kept, { ...item, selected: false }],
        moved: moved,
      };
    },
    { kept: [] as Item[], moved: [] as Item[] }
  );

const MetaInterview = () => {
  const [list1, setList1] = useState<Item[]>(LIST);
  const [list2, setList2] = useState<Item[]>([]);

  const selectItem = (list: number, value: number) => {
    switch (list) {
      case 1:
        setList1(checkItem(list1, value));
        break;
      case 2:
        setList2(checkItem(list2, value));
        break;
      default:
        throw new Error("Invalid list id");
    }
  };

  const moveToRight = () => {
    const { kept, moved } = filterSelectedElements(list1);

    setList1(kept);
    setList2([...list2, ...moved].sort((i1, i2) => i1.value - i2.value));
  };

  const moveToLeft = () => {
    const { kept, moved } = filterSelectedElements(list2);

    setList1([...list1, ...moved].sort((i1, i2) => i1.value - i2.value));
    setList2(kept);
  };

  return (
    <div className="meta">
      <PageTitle title="Meta Interview" />
      <div className="meta__list">
        {list1.map((item) => (
          <ItemElement
            key={item.value}
            item={item}
            onSelect={selectItem.bind(null, 1, item.value)}
          />
        ))}
      </div>
      <div className="meta__actions">
        <Button onClick={moveToRight}>{`>`}</Button>
        <Button onClick={moveToLeft}>{`<`}</Button>
      </div>
      <div className="meta__list">
        {list2.map((item) => (
          <ItemElement
            key={item.value}
            item={item}
            onSelect={selectItem.bind(null, 2, item.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default MetaInterview;
