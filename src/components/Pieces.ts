import { Position } from "../models";
import { tileSize } from "./Chessboard";
import { Team, Chesspiece } from "./Chesspiece";
import { Bishop } from "./Pieces/Bishop";
import { King } from "./Pieces/King";
import { Knight } from "./Pieces/Knight";
import { Queen } from "./Pieces/Queen";
import { Rook } from "./Pieces/Rook";
import { Soldier } from "./Pieces/Soldiers";

export function Pieces() {
  // White
  const whiteSoldiers: Soldier[] = [];
  for (let i = 0; i <= 7; i++) {
    const piecePos: Position = { x: i * tileSize, y: 300 };
    whiteSoldiers.push(new Soldier({ team: Team.White, position: piecePos }));
  }
  const whiteKing = new King({
    team: Team.White,
    position: { x: 200, y: 350 },
  });
  const whiteQueen = new Queen({
    team: Team.White,
    position: { x: 150, y: 350 },
  });
  const whiteBishop1 = new Bishop({
    team: Team.White,
    position: { x: 100, y: 350 },
  });
  const whiteBishop2 = new Bishop({
    team: Team.White,
    position: { x: 250, y: 350 },
  });
  const whiteKnight1 = new Knight({
    team: Team.White,
    position: { x: 50, y: 350 },
  });
  const whiteKnight2 = new Knight({
    team: Team.White,
    position: { x: 300, y: 350 },
  });
  const whiteRook1 = new Rook({ team: Team.White, position: { x: 0, y: 350 } });
  const whiteRook2 = new Rook({
    team: Team.White,
    position: { x: 350, y: 350 },
  });
  const whitePieces: Chesspiece[] = whiteSoldiers;
  whitePieces.push(
    whiteKing,
    whiteQueen,
    whiteBishop1,
    whiteBishop2,
    whiteKnight1,
    whiteKnight2,
    whiteRook1,
    whiteRook2,
  );

  // Black
  const blackSoldiers: Soldier[] = [];
  for (let i = 0; i <= 7; i++) {
    const piecePos: Position = { x: i * tileSize, y: 50 };
    blackSoldiers.push(new Soldier({ team: Team.Black, position: piecePos }));
  }
  const blackKing = new King({ team: Team.Black, position: { x: 200, y: 0 } });
  const blackQueen = new Queen({
    team: Team.Black,
    position: { x: 150, y: 0 },
  });
  const blackBishop1 = new Bishop({
    team: Team.Black,
    position: { x: 100, y: 0 },
  });
  const blackBishop2 = new Bishop({
    team: Team.Black,
    position: { x: 250, y: 0 },
  });
  const blackKnight1 = new Knight({
    team: Team.Black,
    position: { x: 50, y: 0 },
  });
  const blackKnight2 = new Knight({
    team: Team.Black,
    position: { x: 300, y: 0 },
  });
  const blackRook1 = new Rook({ team: Team.Black, position: { x: 0, y: 0 } });
  const blackRook2 = new Rook({ team: Team.Black, position: { x: 350, y: 0 } });
  const blackPieces: Chesspiece[] = blackSoldiers;
  blackPieces.push(
    blackKing,
    blackQueen,
    blackBishop1,
    blackBishop2,
    blackKnight1,
    blackKnight2,
    blackRook1,
    blackRook2,
  );

  const pieces: Chesspiece[] = [...whitePieces, ...blackPieces];

  return pieces;
}
