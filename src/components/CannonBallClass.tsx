import { Position } from "../models";
import { style } from "typestyle";
import { BoxShadowStyles } from "../styles";

export interface CannonballProps {
  color: string;
  size: number;
  position: Position;
}

export class CannonballClass{
  size: number
  vel: [number,number]

  constructor(size:number,  vel: [number,number]){
    this.size = size
    this.vel = vel
  }

}