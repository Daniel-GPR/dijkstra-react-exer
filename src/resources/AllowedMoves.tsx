import { TileContent, TileProps } from "../graphics/Tile";
import { ChessPiece } from "../models/ChessPiece";
import { Team } from "../models/Team";
import { pieceRules } from "./AllowedPieceMoves";
import { bishopRules } from "./bishopRules";
import { kingRules } from "./kingRules";
import { towerRules } from "./towerRules";

export function allowedMoves(
  chessboard: TileProps[][],
  content: TileContent | null,
  position: [number, number],
) {
  if (content) {
    const piece = content.pieceType;
    const team = content.team;
    const X = position[0];
    const Y = position[1];
    const hassMoved = content.hassMoved;
    const enemyTeam: string = team === Team.White ? Team.Black : Team.White;
    const enemyTeamPos: [number, number][] = chessboard.flatMap((row) =>
      row
        .filter((tile) => tile.contents?.team === enemyTeam)
        .map((tile) => tile.position),
    );
    const allPieces: [number, number][] = chessboard.flatMap((row) =>
      row.filter((tile) => tile.contents).map((tile) => tile.position),
    );

    const elementsOnBoard: [[number, number], Team | undefined][] =
      chessboard.flatMap((tile) =>
        tile
          .filter((tile) => tile.contents)
          .map((tile) => [tile.position, tile.contents?.team]),
      );

    let posMov: [number, number][] = [];

    const input: [
      number,
      number,
      boolean | undefined,
      [number, number][],
      [[number, number], Team | undefined][],
      [number, number][],
      Team,
    ] = [X, Y, hassMoved, enemyTeamPos, elementsOnBoard, allPieces, team];

    if (piece === ChessPiece.Piece) {
      posMov = pieceRules(...input, posMov);
      // posMov = team === Team.Black ? [[X + 1, Y]] : [[X - 1, Y]];
    } else if (piece === ChessPiece.Tower) {
      posMov = towerRules(...input, posMov);
    } else if (piece === ChessPiece.Knight) {
      posMov = bishopRules(...input, posMov);
    } else if (piece === ChessPiece.Bishop) {
      posMov = bishopRules(...input, posMov);
    } else if (piece === ChessPiece.Queen) {
      posMov = [
        ...towerRules(...input, posMov),
        ...bishopRules(...input, posMov),
      ];
    } else if (piece === ChessPiece.King) {
      posMov = kingRules(...input, posMov);
    }
    return posMov;
  }
}
