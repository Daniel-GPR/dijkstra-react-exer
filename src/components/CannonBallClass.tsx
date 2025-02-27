import { Position } from "../models";
import { style } from "typestyle";
import { BoxShadowStyles } from "../styles";
import { Cannonball, CannonballProps } from "./Cannonball";

export class CannonballClass {
  launchTime: number;
  props: CannonballProps;
  vel: [number, number];
  // startFrame: number

  constructor(
    launchTime: number,
    props: CannonballProps,
    vel: [number, number],
  ) {
    this.vel = vel;
    this.props = props;
    this.launchTime = launchTime;
  }
}
