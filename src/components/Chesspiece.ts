import { Position } from "../models";
import { StandardColors } from "../styles";

export enum Team {
  Black = "Black",
  White = "White",
}
export interface ChesspieceProps {
  team: Team;
  position: Position;
}

export abstract class Chesspiece {
  team: Team;
  position: Position;
  image: string | undefined;
  selected: boolean = false;
  background: string = StandardColors.ColorTransparent;

  // to: Position[]

  constructor(props: ChesspieceProps) {
    this.team = props.team;
    this.position = props.position;
  }

  moved: boolean = false;

  move(to: Position) {
    this.moved = true;
    this.position = to;
  }

  abstract movement(): {
    to: Position[];
    moveStraight: Position[];
    moveDiag: Position[];
  };

  select(): void {
    this.selected = true;
    this.setBackground();
  }

  deselect(): void {
    this.selected = false;
    this.setBackground();
  }

  setBackground() {
    this.background = this.selected
      ? StandardColors.ColorGreen30
      : StandardColors.ColorTransparent;
  }
}
