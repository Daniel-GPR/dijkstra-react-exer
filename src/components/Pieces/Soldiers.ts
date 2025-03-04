import { Position } from "../../models";
import { addPositions } from "../../utils/VectorUtils";
import { tileSize } from "../Chessboard";
import { Chesspiece, ChesspieceProps, Team } from "../Chesspiece";
import whiteSoldier from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/wp.png";
import blackSoldier from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/bp.png";

export class Soldier extends Chesspiece {
  constructor(props: ChesspieceProps) {
    super(props);
    if (this.team === Team.White) {
      this.image = whiteSoldier;
    } else {
      this.image = blackSoldier;
    }
  }

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
