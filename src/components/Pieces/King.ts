import { Position } from "../../models";
import { addPositions } from "../../utils/VectorUtils";
import { tileSize } from "../Chessboard";
import { Chesspiece } from "../Chesspiece";

export class King extends Chesspiece {
  movement(from: Position) {
    const left: Position = addPositions(from, { x: -tileSize, y: 0 });
    const right: Position = addPositions(from, { x: +tileSize, y: 0 });
    const up: Position = addPositions(from, { x: 0, y: -tileSize });
    const down: Position = addPositions(from, { x: 0, y: +tileSize });

    const to: Position[] = [left, right, up, down];

    return to;
  }
}
