import { Position } from "../../models";
import { addPositions } from "../../utils/PositionUtils";
import { chessboardSize, tileSize } from "../Chessboard";
import { Chesspiece, ChesspieceProps, Team } from "../Chesspiece";
import whiteQueen from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/wq.png";
import blackQueen from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/bq.png";

export class Queen extends Chesspiece {
  constructor(props: ChesspieceProps) {
    super(props);
    if (this.team === Team.White) {
      this.image = whiteQueen;
    } else {
      this.image = blackQueen;
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
    // DIAGONAL
    const leftUp = Math.min(leftSquares, upSquares);
    const rightUp = Math.min(rightSquares, upSquares);
    const leftDown = Math.min(leftSquares, downSquares);
    const rightDown = Math.min(rightSquares, downSquares);

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

    // DIAGONAL
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

    console.log(to);
    return to;
  }
}
