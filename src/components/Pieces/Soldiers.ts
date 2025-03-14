import { Position } from "../../models";
import { addPositions, areEqual } from "../../utils/PositionUtils";
import { tileSize } from "../Chessboard";
import { Chesspiece, ChesspieceProps, Team } from "../Chesspiece";
import whiteSoldier from "../../graphics/wp.png";
import blackSoldier from "../../graphics/bp.png";

export class Soldier extends Chesspiece {
  constructor(props: ChesspieceProps) {
    super(props);
    if (this.team === Team.White) {
      this.image = whiteSoldier;
    } else {
      this.image = blackSoldier;
    }
  }

  movement() {
    const from: Position = this.position;

    const to: Position[] = [];
    if (this.team === "White") {
      to.push(addPositions(from, { x: 0, y: -tileSize }));
      if (from.y === 6 * tileSize) {
        to.push(addPositions(from, { x: 0, y: -2 * tileSize }));
      }
    } else {
      to.push(addPositions(from, { x: 0, y: tileSize }));
      if (from.y === tileSize) {
        to.push(addPositions(from, { x: 0, y: 2 * tileSize }));
      }
    }

    const moveStraight = to;
    const moveDiag: Position[] = [];
    return { to, moveStraight, moveDiag };
  }

  attackMovement() {
    const from: Position = this.position;
    const to: Position[] = [];
    if (this.team === "White") {
      to.push(addPositions(from, { x: -tileSize, y: -tileSize }));
      to.push(addPositions(from, { x: tileSize, y: -tileSize }));
    } else {
      to.push(addPositions(from, { x: -tileSize, y: tileSize }));
      to.push(addPositions(from, { x: tileSize, y: tileSize }));
    }

    return to;
  }
}
