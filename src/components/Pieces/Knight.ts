import { Position } from "../../models";
import { addPositions } from "../../utils/PositionUtils";
import { chessboardSize, tileSize } from "../Chessboard";
import { Chesspiece, ChesspieceProps, Team } from "../Chesspiece";
import whiteKnight from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/wn.png";
import blackKnight from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/bn.png";

export class Knight extends Chesspiece {
  constructor(props: ChesspieceProps) {
    super(props);
    if (this.team === Team.White) {
      this.image = whiteKnight;
    } else {
      this.image = blackKnight;
    }
  }
  movement() {
    const from: Position = this.position;

    const upLeft: Position = addPositions(from, {
      x: -tileSize,
      y: -2 * tileSize,
    });
    const upRight: Position = addPositions(from, {
      x: tileSize,
      y: -2 * tileSize,
    });
    const rightUp: Position = addPositions(from, {
      x: 2 * tileSize,
      y: -tileSize,
    });
    const rightDown: Position = addPositions(from, {
      x: 2 * tileSize,
      y: tileSize,
    });
    const downRight: Position = addPositions(from, {
      x: tileSize,
      y: 2 * tileSize,
    });
    const downLeft: Position = addPositions(from, {
      x: -tileSize,
      y: 2 * tileSize,
    });
    const leftDown: Position = addPositions(from, {
      x: -2 * tileSize,
      y: tileSize,
    });
    const leftUp: Position = addPositions(from, {
      x: -2 * tileSize,
      y: -tileSize,
    });

    const to: Position[] = [
      upLeft,
      upRight,
      rightUp,
      rightDown,
      downRight,
      downLeft,
      leftDown,
      leftUp,
    ];

    const moveStraight: Position[] = [];
    const moveDiag: Position[] = [];
    return { to, moveStraight, moveDiag };
  }
}
