import {
  AvatarProps,
  accessoryMap,
  clothingMap,
  graphicsMap,
  hatMap,
} from "@bigheads/core";

import { randomIntFromInterval } from "./numbers";

export const TRAITS = {
  body: ["chest", "breasts"],
  eyebrows: ["raised", "leftLowered", "serious", "angry", "concerned"],
  facialHair: ["none", "none2", "none3", "stubble", "mediumBeard"],
  hair: ["none", "long", "bun", "short", "pixie", "buzz", "afro", "bob"],
  hairColor: ["blonde", "orange", "black", "white", "brown", "blue", "pink"],
  lashes: ["true", "false"],
  lipColor: ["red", "purple", "pink", "turqoise", "green"],
  mouth: ["grin", "sad", "openSmile", "lips", "open", "serious", "tongue"],
  skinTone: ["light", "yellow", "brown", "dark", "red", "black"],
  eyes: [
    "normal",
    "leftTwitch",
    "happy",
    "content",
    "squint",
    "simple",
    "dizzy",
    "wink",
    "heart",
  ],
};

export const ACCESSORIES = {
  accessory: ["none", "roundGlasses", "tinyGlasses", "shades"],
  clothing: ["naked", "shirt", "dressShirt", "vneck", "tankTop", "dress"],
  clothingColor: ["white", "blue", "black", "green", "red"],
  graphic: ["none", "redwood", "gatsby", "vue", "react", "graphQL"],
  hat: ["none", "none2", "none3", "none4", "none5", "beanie", "turban"],
  hatColor: ["white", "blue", "black", "green", "red"],
};

const colors = { white: true, blue: true, black: true, green: true, red: true };

type AvatarProperties = {
  hat: AvatarProps["hat"];
  hatColor: AvatarProps["hatColor"];
  accessory: AvatarProps["accessory"];
  clothing: AvatarProps["clothing"];
  clothingColor: AvatarProps["clothingColor"];
  graphic: AvatarProps["graphic"];
};

type AvatarMap = { [key: string]: unknown };
const getRandomKeyFromMap = (map: AvatarMap, allowUndefined?: boolean) => {
  const keys = Object.keys(map);
  const randomIndex = randomIntFromInterval(
    0,
    keys.length + (allowUndefined ? 1 : 0)
  );
  if (randomIndex === keys.length && allowUndefined) return undefined;

  return keys[randomIndex];
};

export const generateRandomAvatarProperties = () => {
  return {
    hat: getRandomKeyFromMap(hatMap, true),
    hatColor: getRandomKeyFromMap(colors),
    accessory: getRandomKeyFromMap(accessoryMap, true),
    clothing: getRandomKeyFromMap(clothingMap),
    clothingColor: getRandomKeyFromMap(colors),
    graphic: getRandomKeyFromMap(graphicsMap),
  } as AvatarProperties;
};

export const MARION: AvatarProps = {
  accessory: "roundGlasses",
  body: "breasts",
  circleColor: "blue",
  clothing: "vneck",
  clothingColor: "white",
  eyebrows: "leftLowered",
  eyes: "happy",
  faceMask: false,
  faceMaskColor: "green",
  facialHair: "none2",
  graphic: "react",
  hair: "bob",
  hairColor: "blonde",
  hat: "none",
  hatColor: "green",
  lashes: true,
  lipColor: "pink",
  mask: false,
  mouth: "grin",
  skinTone: "light",
};
export const randomMarion = () =>
  ({
    ...MARION,
    ...generateRandomAvatarProperties(),
  } as AvatarProperties);

const VAL = {
  accessory: "none",
  body: "chest",
  circleColor: "blue",
  clothing: "shirt",
  clothingColor: "black",
  eyebrows: "leftLowered",
  eyes: "simple",
  faceMask: false,
  faceMaskColor: "green",
  facialHair: "mediumBeard",
  graphic: "graphQL",
  hair: "bun",
  hairColor: "brown",
  hat: "none",
  hatColor: "green",
  lipColor: "purple",
  mask: false,
  mouth: "sad",
  skinTone: "light",
};
export const randomVal = () =>
  ({
    ...VAL,
    ...generateRandomAvatarProperties(),
  } as AvatarProperties);

const SOU = {
  accessory: "tinyGlasses",
  body: "chest",
  circleColor: "blue",
  clothing: "shirt",
  clothingColor: "green",
  eyebrows: "leftLowered",
  eyes: "content",
  faceMask: false,
  faceMaskColor: "green",
  facialHair: "none3",
  graphic: "redwood",
  hair: "buzz",
  hairColor: "black",
  hat: "none",
  hatColor: "green",
  lashes: false,
  lipColor: "purple",
  mask: false,
  mouth: "serious",
  skinTone: "brown",
};
export const randomSou = () =>
  ({
    ...SOU,
    ...generateRandomAvatarProperties(),
  } as AvatarProperties);
