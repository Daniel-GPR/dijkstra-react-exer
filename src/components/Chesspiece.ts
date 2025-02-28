import { Position } from "../models";

export enum Team {
  Black = "Black",
  White = "White",
}
export interface ChesspieceProps {
  team: Team;
  position: Position;
}

export class Chesspiece {
  team: Team;
  position: Position;

  constructor(props: ChesspieceProps) {
    this.team = props.team;
    this.position = props.position;
  }

  move(from: Position, to: Position) {
    this.position = to;
  }
}
