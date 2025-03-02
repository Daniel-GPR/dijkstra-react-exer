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

export const chessPieceMap = (team: Team, position: [number, number]) => {
  let x = position[0];
  let y = position[1];
  return {
    [ChessPiece.King]: {
      icon: <King team={team} />,
      movements: [[x - 1, y - 1]],
    },
    [ChessPiece.Queen]: {
      icon: <Queen team={team} />,
      movements: [[]],
    },
    [ChessPiece.Knight]: {
      icon: <Knight team={team} />,
      movements: [[]],
    },
    [ChessPiece.Tower]: {
      icon: <Tower team={team} />,
      movements: [[]],
    },
    [ChessPiece.Piece]: {
      icon: <Piece team={team} />,
      movements: [[]],
    },
    [ChessPiece.Bishop]: {
      icon: <Bishop team={team} />,
      movements: [[]],
    },
  };
};
