import { Position } from "../../models";
import { addPositions } from "../../utils/VectorUtils";
import { tileSize } from "../Chessboard";
import { Chesspiece } from "../Chesspiece";

export class Soldier extends Chesspiece {
  movement(from: Position) {
    let to: Position = from;
    if (this.team === "White") {
      to = addPositions(from, { x: 0, y: tileSize });
    } else {
      to = addPositions(from, { x: 0, y: -tileSize });
    }
    return to;
  }
}
