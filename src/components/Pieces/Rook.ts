import { Position } from "../../models";
import { addPositions } from "../../utils/VectorUtils";
import { chessboardSize, tileSize } from "../Chessboard";
import { Chesspiece, ChesspieceProps, Team } from "../Chesspiece";
import whiteRook from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/wr.png";
import blackRook from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/br.png";

export class Rook extends Chesspiece {
  constructor(props: ChesspieceProps) {
    super(props);
    if (this.team === Team.White) {
      this.image = whiteRook;
    } else {
      this.image = blackRook;
    }
  }
  movement() {
    const from: Position = this.position;
    // STRAIGHT
    const leftSquares: number = from.x / tileSize;
    const rightSquares: number = (chessboardSize - from.x) / tileSize - 1;
    const upSquares: number = from.y / tileSize;
    const downSquares: number = (chessboardSize - from.y) / tileSize - 1;
    const to: Position[] = [];

    // STRAIGHT
    for (let i = 1; i <= leftSquares; i++) {
      to.push(addPositions(from, { x: -i * tileSize, y: 0 }));
    }

    for (let i = 1; i <= rightSquares; i++) {
      to.push(addPositions(from, { x: i * tileSize, y: 0 }));
    }

    for (let i = 1; i <= upSquares; i++) {
      to.push(addPositions(from, { x: 0, y: -i * tileSize }));
    }

    for (let i = 1; i <= downSquares; i++) {
      to.push(addPositions(from, { x: 0, y: i * tileSize }));
    }

    console.log(to);
    return to;
  }
}
