import { HTMLVanillaTiltElement, TiltValues } from "vanilla-tilt";

export type TiltElement = HTMLDivElement & HTMLVanillaTiltElement;

export type TiltDetail = TiltValues & { angle: number };
