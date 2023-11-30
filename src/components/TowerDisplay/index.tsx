import "./TowerDisplay.scss";

type Tower = {
  name: string;
  kingdom: string;
  imageUrl: string;
  towerType: string;
  buildCost: number;
};

type TowerDisplayProps = {
  tower: Tower;
};

const TowerDisplay = ({ tower }: TowerDisplayProps) => {
  const { name, kingdom, imageUrl, towerType, buildCost } = tower;

  return (
    <div className="tower-display">
      <img src={imageUrl} alt={name} className="tower-display__image" />
      <div className="tower-display__content">
        <label className="tower-display__name">{name}</label>
        <label className="tower-display__info">({towerType})</label>
        <label className="tower-display__info">Build cost: {buildCost}</label>
        <label className="tower-display__info">Kingdom: {kingdom}</label>
      </div>
    </div>
  );
};

export default TowerDisplay;
