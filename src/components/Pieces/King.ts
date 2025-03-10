import { Position } from "../../models";
import { addPositions } from "../../utils/PositionUtils";
import { tileSize } from "../Chessboard";
import { Chesspiece, ChesspieceProps, Team } from "../Chesspiece";
import whiteKing from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/wk.png";
import blackKing from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/bk.png";

export class King extends Chesspiece {
  constructor(props: ChesspieceProps) {
    super(props);
    if (this.team === Team.White) {
      this.image = whiteKing;
    } else {
      this.image = blackKing;
    }
  }

  movement() {
    const from: Position = this.position;

    const left: Position = addPositions(from, { x: -tileSize, y: 0 });
    const right: Position = addPositions(from, { x: +tileSize, y: 0 });
    const up: Position = addPositions(from, { x: 0, y: -tileSize });
    const down: Position = addPositions(from, { x: 0, y: +tileSize });
    const upLeft: Position = addPositions(from, { x: -tileSize, y: -tileSize });
    const upRight: Position = addPositions(from, { x: tileSize, y: -tileSize });
    const downLeft: Position = addPositions(from, {
      x: -tileSize,
      y: tileSize,
    });
    const downRight: Position = addPositions(from, {
      x: tileSize,
      y: tileSize,
    });

    const moveStraight: Position[] = [left, right, up, down];
    const moveDiag: Position[] = [upLeft, upRight, downLeft, downRight];
    const to: Position[] = [...moveStraight, ...moveDiag];
    return { to, moveStraight, moveDiag };
  }
}
