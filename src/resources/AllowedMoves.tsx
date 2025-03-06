import { TileContent, TileProps } from "../graphics/Tile";
import { ChessPiece } from "../models/ChessPiece";
import { Team } from "../models/Team";

export function allowedMoves(
  chessboard: TileProps[][],
  content: TileContent | null,
  position: [number, number],
) {
  if (content) {
    const piece = content.pieceType;
    const team = content.team;
    const X = position[1];
    const Y = position[0];

    let posMov: [number, number][] = [];

    if (piece === ChessPiece.Piece) {
      if (team === Team.Black) {
        posMov = [[X + 1, Y]];
      } else {
        posMov = [[X - 1, Y]];
      }
    } else {
      posMov = [position];
    }

    

    return posMov;
  }
}
