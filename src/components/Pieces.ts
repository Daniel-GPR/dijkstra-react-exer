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
    const piecePos: Position = { x: i * tileSize, y: 6 * tileSize };
    whiteSoldiers.push(new Soldier({ team: Team.White, position: piecePos }));
  }
  const whiteKing = new King({
    team: Team.White,
    position: { x: 4 * tileSize, y: 7 * tileSize },
  });
  const whiteQueen = new Queen({
    team: Team.White,
    position: { x: 3 * tileSize, y: 7 * tileSize },
  });
  const whiteBishop1 = new Bishop({
    team: Team.White,
    position: { x: 2 * tileSize, y: 7 * tileSize },
  });
  const whiteBishop2 = new Bishop({
    team: Team.White,
    position: { x: 5 * tileSize, y: 7 * tileSize },
  });
  const whiteKnight1 = new Knight({
    team: Team.White,
    position: { x: tileSize, y: 7 * tileSize },
  });
  const whiteKnight2 = new Knight({
    team: Team.White,
    position: { x: 6 * tileSize, y: 7 * tileSize },
  });
  const whiteRook1 = new Rook({
    team: Team.White,
    position: { x: 0, y: 7 * tileSize },
  });
  const whiteRook2 = new Rook({
    team: Team.White,
    position: { x: 7 * tileSize, y: 7 * tileSize },
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
    const piecePos: Position = { x: i * tileSize, y: tileSize };
    blackSoldiers.push(new Soldier({ team: Team.Black, position: piecePos }));
  }
  const blackKing = new King({
    team: Team.Black,
    position: { x: 4 * tileSize, y: 0 },
  });
  const blackQueen = new Queen({
    team: Team.Black,
    position: { x: 3 * tileSize, y: 0 },
  });
  const blackBishop1 = new Bishop({
    team: Team.Black,
    position: { x: 2 * tileSize, y: 0 },
  });
  const blackBishop2 = new Bishop({
    team: Team.Black,
    position: { x: 5 * tileSize, y: 0 },
  });
  const blackKnight1 = new Knight({
    team: Team.Black,
    position: { x: tileSize, y: 0 },
  });
  const blackKnight2 = new Knight({
    team: Team.Black,
    position: { x: 6 * tileSize, y: 0 },
  });
  const blackRook1 = new Rook({ team: Team.Black, position: { x: 0, y: 0 } });
  const blackRook2 = new Rook({
    team: Team.Black,
    position: { x: 7 * tileSize, y: 0 },
  });
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
