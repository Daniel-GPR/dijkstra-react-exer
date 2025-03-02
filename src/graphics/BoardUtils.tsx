import { Piece } from "../assets/chesspieces";
import { ChessPiece } from "../models/ChessPiece";
import { Team } from "../models/Team";
import { StandardColors } from "../styles";
import { TileProps } from "./Tile";

export function initializeBoard(chessboard: TileProps[][], boardSize: number) {
  for (let i = 0; i < boardSize; i++) {
    chessboard.push([]);
    for (let b = 0; b < boardSize; b++) {
      if ((i + b) % 2 === 0) {
        chessboard[i][b] = {
          color: StandardColors.ColorBlack,
          contents: null,
          position: [b, i],
          size: `${100 / boardSize}%`,
          highlight: null,
        };
      } else {
        chessboard[i][b] = {
          color: StandardColors.ColorWhite,
          contents: null,
          position: [b, i],
          size: `${100 / boardSize}%`,
          highlight: null,
        };
      }
    }
  }

  return chessboard;
}

export function initializePieces(chessboard: TileProps[][]) {
  // Bloite -----------------------------------------------------

  chessboard[1].forEach(
    (element) =>
      (element.contents = { team: Team.Black, pieceType: ChessPiece.Piece }),
  );
  chessboard[0][0].contents = { team: Team.Black, pieceType: ChessPiece.Tower };
  chessboard[0][7].contents = chessboard[0][0].contents;
  chessboard[0][1].contents = {
    team: Team.Black,
    pieceType: ChessPiece.Knight,
  };
  chessboard[0][6].contents = chessboard[0][1].contents;
  chessboard[0][2].contents = {
    team: Team.Black,
    pieceType: ChessPiece.Bishop,
  };
  chessboard[0][5].contents = chessboard[0][2].contents;
  chessboard[0][3].contents = { team: Team.Black, pieceType: ChessPiece.King };
  chessboard[0][4].contents = { team: Team.Black, pieceType: ChessPiece.Queen };

  // Whoite -----------------------------------------------------

  chessboard[6].forEach(
    (element) =>
      (element.contents = { team: Team.White, pieceType: ChessPiece.Piece }),
  );

  chessboard[7][0].contents = { team: Team.White, pieceType: ChessPiece.Tower };
  chessboard[7][7].contents = chessboard[7][0].contents;
  chessboard[7][1].contents = {
    team: Team.White,
    pieceType: ChessPiece.Knight,
  };
  chessboard[7][6].contents = chessboard[7][1].contents;
  chessboard[7][2].contents = {
    team: Team.White,
    pieceType: ChessPiece.Bishop,
  };
  chessboard[7][5].contents = chessboard[7][2].contents;
  chessboard[7][4].contents = { team: Team.White, pieceType: ChessPiece.King };
  chessboard[7][3].contents = { team: Team.White, pieceType: ChessPiece.Queen };

  console.log(chessboard);
  return chessboard;
}
