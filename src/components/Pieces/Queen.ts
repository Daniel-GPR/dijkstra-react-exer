import { Position } from "../../models";
import { addPositions } from "../../utils/VectorUtils";
import { chessboardSize, tileSize } from "../Chessboard";
import { Chesspiece } from "../Chesspiece";

export class Queen extends Chesspiece {
  movement() {
    const from: Position = this.position;
    const leftSquares: number = from.x / tileSize;
    const rightSquares: number = (chessboardSize - from.x) / tileSize - 1;
    const upSquares: number = from.y / tileSize;
    const downSquares: number = (chessboardSize - from.y) / tileSize - 1;
    const to: Position[] = [];
    const leftUp = Math.min(leftSquares, upSquares);
    const rightDown = Math.min(rightSquares, downSquares);

    for (let i = 0; i <= leftSquares; i++) {
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

    for (let i = 1; i <= leftUp; i++) {
      to.push(addPositions(from, { x: -i * tileSize, y: -i * tileSize }));
    }

    for (let i = 1; i <= rightDown; i++) {
      to.push(addPositions(from, { x: i * tileSize, y: i * tileSize }));
    }

    console.log(to);
    return to;
  }
}
