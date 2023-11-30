import { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";

import PageTitle from "../../components/PageTitle";
import { TiltDetail, TiltElement } from "../../@types/vanillaTilt";

import "./Perspective.scss";

const vanillaTiltOptions = { max: 25, perspective: 150 };

const Perspective = () => {
  const tiltRef = useRef<HTMLDivElement>(null);

  const [detail, setDetail] = useState<TiltDetail>({
    tiltX: 0,
    tiltY: 0,
    percentageX: 0,
    percentageY: 0,
    angle: 0,
  });
  const updateData = (event: CustomEvent<TiltDetail>) =>
    setDetail(event.detail);

  useEffect(() => {
    if (tiltRef.current) {
      const tiltElement = tiltRef.current as TiltElement;
      VanillaTilt.init(tiltElement, vanillaTiltOptions);
      tiltElement.addEventListener("tiltChange", updateData);

      return () => {
        tiltElement.removeEventListener("tiltChange", updateData);
        tiltElement.vanillaTilt.destroy();
      };
    }
  }, []);

  if (!detail) return "loading...";

  return (
    <div className="perspective">
      <PageTitle title="Perspective" />
      <div ref={tiltRef} className="perspective__tilt">
        <label>tiltX: {detail.tiltX}</label>
        <label>tiltY: {detail.tiltY}</label>
        <label>percentageX: {detail.percentageX.toFixed(2)}</label>
        <label>percentageX: {detail.percentageY.toFixed(2)}</label>
        <label>angle: {detail.angle.toFixed(2)}</label>
      </div>
    </div>
  );
};

export default Perspective;
