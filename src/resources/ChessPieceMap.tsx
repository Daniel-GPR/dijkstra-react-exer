import {
  Bishop,
  King,
  Knight,
  Piece,
  Queen,
  Tower,
} from "../assets/chesspieces";
import { ChessPiece } from "../models/ChessPiece";
import { Team } from "../models/Team";

export const chessPieceMap = (team: Team) => {
  return {
    [ChessPiece.King]: {
      icon: <King team={team} />,
    },
    [ChessPiece.Queen]: {
      icon: <Queen team={team} />,
    },
    [ChessPiece.Knight]: {
      icon: <Knight team={team} />,
    },
    [ChessPiece.Tower]: {
      icon: <Tower team={team} />,
    },
    [ChessPiece.Piece]: {
      icon: <Piece team={team} />,
    },
    [ChessPiece.Bishop]: {
      icon: <Bishop team={team} />,
    },
  };
};
