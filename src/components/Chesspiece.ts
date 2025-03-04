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
  image: string | undefined;
  // to: Position[]

  constructor(props: ChesspieceProps) {
    this.team = props.team;
    this.position = props.position;
  }

  move(to: Position) {
    this.position = to;
  }
}
