import { useEffect, useState } from "react";
import { BigHead } from "@bigheads/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptop,
  faDesktop,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";

import PageTitle from "../../components/PageTitle";
import useScreenSize from "../../hooks/useScreenSize";
import { randomMarion, randomSou, randomVal } from "../../utils/avatar";

import "./WindowSize.scss";

const BIG_SCREEN_THRESOLD = 1000;
const SMALL_SCREEN_THRESOLD = 700;

const DISPLAYS = {
  small: {
    name: "Sou",
    icon: faMobileScreenButton,
    avatar: randomSou,
  },
  medium: {
    name: "Marion",
    icon: faLaptop,
    avatar: randomMarion,
  },
  big: {
    name: "Val",
    icon: faDesktop,
    avatar: randomVal,
  },
};

type ScreenSize = "small" | "medium" | "big";
const getScreenSize = (screenWidth: number): ScreenSize => {
  if (screenWidth > BIG_SCREEN_THRESOLD) return "big";
  if (screenWidth < SMALL_SCREEN_THRESOLD) return "small";
  return "medium";
};

const WindowSize = () => {
  const { width, height } = useScreenSize();
  const [screen, setScreen] = useState<ScreenSize>(getScreenSize(width));

  useEffect(() => {
    setScreen(getScreenSize(width));
  }, [height, width]);

  return (
    <div className="window-size">
      <PageTitle title="Window Size" />

      <div className="window-size__size">
        {width}px / {height}px
      </div>

      <div className="window-size__avatar">
        <div className="window-size__avatar__container">
          <BigHead {...DISPLAYS[screen].avatar()} />
        </div>
        <div className="window-size__avatar__info">
          <label>
            You are seeing{" "}
            <label className="window-size__avatar__value">
              {DISPLAYS[screen].name}
            </label>
            <br />
            because your screen size is
            <br />
            <label className="window-size__avatar__value">{screen}!</label>
          </label>
          <FontAwesomeIcon icon={DISPLAYS[screen].icon} />
        </div>
      </div>
      <div className="window-size__footer">
        *Resizing your window changes the clothes and accessories of the avatar.
        <br />
        *The avatar shown is based on whether your window is big, medium, or
        small.
      </div>
    </div>
  );
};

export default WindowSize;
