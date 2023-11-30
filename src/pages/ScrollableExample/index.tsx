import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowUp,
  faCircleArrowDown,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import TowerDisplay from "../../components/TowerDisplay";
import {
  Scrollable,
  ImperativeScrollable,
  ScrollOption,
  ImperativeScrollableRef,
} from "../../components/Scrollable";
import TOWERS from "../../assets/data/towers";

import "./ScrollableExample.scss";

const ScrollButon = ({
  icon,
  label,
  onClick,
}: {
  icon: IconDefinition;
  label: string;
  onClick: () => void;
}) => (
  <Button onClick={onClick}>
    {<FontAwesomeIcon icon={icon} />}
    <label className="action-label">{label}</label>
    {<FontAwesomeIcon icon={icon} />}
  </Button>
);

const TopButton = ({ onClick }: { onClick: () => void }) => (
  <ScrollButon onClick={onClick} icon={faCircleArrowUp} label="Scroll to top" />
);
const BottomButton = ({ onClick }: { onClick: () => void }) => (
  <ScrollButon
    onClick={onClick}
    icon={faCircleArrowDown}
    label="Scroll to bottom"
  />
);

const TowersContent = () => (
  <div className="towers">
    <label className="towers__label">(TOP)</label>
    <label className="towers__title">Kingdom Rush Towers!</label>
    {TOWERS.map((tower) => (
      <TowerDisplay key={tower.name} tower={tower} />
    ))}
    <label className="towers__label">
      There are no more towers to display <br />
      (BOTTOM)
    </label>
  </div>
);

const NormalScrollableExample = () => {
  const [scroll, setScroll] = useState<ScrollOption>("bottom");

  return (
    <>
      <TopButton onClick={() => setScroll("top")} />
      <Scrollable scroll={scroll} style={{ height: "300px", width: "250px" }}>
        <TowersContent />
      </Scrollable>
      <BottomButton onClick={() => setScroll("bottom")} />
    </>
  );
};

const ImperativeScrollableExample = () => {
  const ref = useRef<ImperativeScrollableRef>(null);

  return (
    <>
      <TopButton onClick={() => ref.current?.scrollToTop()} />
      <ImperativeScrollable
        ref={ref}
        style={{ height: "300px", width: "250px" }}
      >
        <TowersContent />
      </ImperativeScrollable>
      <BottomButton onClick={() => ref.current?.scrollToBottom()} />
    </>
  );
};

const ScrollableExample = () => {
  const [withImperativeHandle, setWithImperativeHandle] = useState(false);

  return (
    <div className="scrollable-example">
      <PageTitle title="Scrollable" />

      <div className="scrollable-example__content">
        {withImperativeHandle ? (
          <ImperativeScrollableExample />
        ) : (
          <NormalScrollableExample />
        )}
      </div>

      <div className="scrollable-example__footer">
        <div className="scrollable-example__info">
          ({withImperativeHandle ? "This does NOT use " : "This uses BOTH "}
          <label>forwardRef</label> or <label>useImperativeHandle</label>)
        </div>
        <div
          className="scrollable-example__toggle"
          onClick={() => setWithImperativeHandle(!withImperativeHandle)}
        >
          Click this to load the other component.
        </div>
        <div className="scrollable-example__info">
          (There should be no observable difference between the two components)
        </div>
      </div>
    </div>
  );
};

export default ScrollableExample;
