import { Position } from "../../models";
import { addPositions, areEqual } from "../../utils/PositionUtils";
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

  movement() {
    const from: Position = this.position;

    const to: Position[] = [];
    if (this.team === "White") {
      to.push(addPositions(from, { x: 0, y: -tileSize }));
      if (from.y === 300) {
        to.push(addPositions(from, { x: 0, y: -2 * tileSize }));
      }
    } else {
      to.push(addPositions(from, { x: 0, y: tileSize }));
      if (from.y === 50) {
        to.push(addPositions(from, { x: 0, y: 2 * tileSize }));
      }
    }
    return to;
  }
}
