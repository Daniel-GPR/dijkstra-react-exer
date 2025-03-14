import { Position } from "../../models";
import { addPositions } from "../../utils/PositionUtils";
import { chessboardSize, tileSize } from "../Chessboard";
import { Chesspiece, ChesspieceProps, Team } from "../Chesspiece";
import whiteBishop from "../../graphics/wb.png";
import blackBishop from "../../graphics/bb.png";

export class Bishop extends Chesspiece {
  constructor(props: ChesspieceProps) {
    super(props);
    if (this.team === Team.White) {
      this.image = whiteBishop;
    } else {
      this.image = blackBishop;
    }
  }
  movement() {
    const from: Position = this.position;
    const leftSquares: number = from.x / tileSize;
    const rightSquares: number = (chessboardSize - from.x) / tileSize - 1;
    const upSquares: number = from.y / tileSize;
    const downSquares: number = (chessboardSize - from.y) / tileSize - 1;
    const to: Position[] = [];
    const leftUp = Math.min(leftSquares, upSquares);
    const rightUp = Math.min(rightSquares, upSquares);
    const leftDown = Math.min(leftSquares, downSquares);
    const rightDown = Math.min(rightSquares, downSquares);

    for (let i = 1; i <= leftUp; i++) {
      to.push(addPositions(from, { x: -i * tileSize, y: -i * tileSize }));
    }

    for (let i = 1; i <= rightUp; i++) {
      to.push(addPositions(from, { x: i * tileSize, y: -i * tileSize }));
    }

    for (let i = 1; i <= leftDown; i++) {
      to.push(addPositions(from, { x: -i * tileSize, y: i * tileSize }));
    }

    for (let i = 1; i <= rightDown; i++) {
      to.push(addPositions(from, { x: i * tileSize, y: i * tileSize }));
    }
    const moveStraight: Position[] = [];
    const moveDiag = to;
    return { to, moveStraight, moveDiag };
  }
}
