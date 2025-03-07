import { tileSize } from "../components/Chessboard";
import { Chesspiece } from "../components/Chesspiece";
import { King } from "../components/Pieces/King";
import { Knight } from "../components/Pieces/Knight";
import { Queen } from "../components/Pieces/Queen";
import { Rook } from "../components/Pieces/Rook";
import { Soldier } from "../components/Pieces/Soldiers";
import { TileProps } from "../components/Tile";
import { Position } from "../models";
import { areEqual } from "./PositionUtils";

export function checkMove(
  pieces: Chesspiece[],
  piece: Chesspiece,
  to: Position,
) {
  let check: boolean = false;
  let movement: string = "";
  if (piece.movement().moveStraight.some((pos) => areEqual(pos, to))) {
    movement = "Straight";
    check = true;
  }
  if (piece.movement().moveDiag.some((pos) => areEqual(pos, to))) {
    movement = "Diag";
    check = true;
  }
  if (
    (piece instanceof Knight || piece instanceof Soldier) &&
    piece.movement().to.some((pos) => areEqual(pos, to))
  ) {
    check = true;
  }
  pieces.forEach((checkPiece) => {
    if (!areEqual(checkPiece.position, to)) {
      if (
        Math.min(piece.position.x, to.x) <= checkPiece.position.x &&
        Math.max(piece.position.x, to.x) >= checkPiece.position.x &&
        Math.min(piece.position.y, to.y) <= checkPiece.position.y &&
        Math.max(piece.position.y, to.y) >= checkPiece.position.y &&
        ((piece
          .movement()
          .moveStraight.some((pos) => areEqual(pos, checkPiece.position)) &&
          movement === "Straight") ||
          (piece
            .movement()
            .moveDiag.some((pos) => areEqual(pos, checkPiece.position)) &&
            movement === "Diag"))
      ) {
        check = false;
      }
    }
  });
  return check;
}

export function checkAttack(
  pieces: Chesspiece[],
  piece: Chesspiece,
  to: Position,
) {
  let check: boolean = false;
  if (piece instanceof Soldier) {
    if (piece.attackMovement().find((position) => areEqual(position, to))) {
      check = true;
    }
  } else {
    check = checkMove(pieces, piece, to);
  }
  return check;
}

export function movePiece(pieces: Chesspiece[], tileProps: TileProps) {
  const to: Position = tileProps.position;
  pieces.forEach((piece) => {
    if (piece.selected && checkMove(pieces, piece, to)) {
      piece.move(to);
      piece.deselect();
      if (piece instanceof Soldier && (to.y === 0 || to.y === 7 * tileSize)) {
        promote(pieces, piece);
      }
    }
  });
}

export function findSelectedPiece(
  pieces: Chesspiece[],
  selectedPiece: Chesspiece | null,
) {
  pieces.forEach((checkPiece: Chesspiece) => {
    if (checkPiece.selected) {
      selectedPiece = checkPiece;
    }
  });
  return selectedPiece;
}

function castlePositions(piece: Chesspiece) {
  const inbetweenPos: Position[] = [];
  if (piece.team === "White") {
    if (piece.position.x === 0) {
      for (let i = 4; i >= 0; i--) {
        inbetweenPos.push({ x: i * tileSize, y: 7 * tileSize });
      }
    } else {
      for (let i = 4; i <= 7; i++) {
        inbetweenPos.push({ x: i * tileSize, y: 7 * tileSize });
      }
    }
  } else {
    if (piece.position.x === 0) {
      for (let i = 4; i >= 0; i--) {
        inbetweenPos.push({ x: i * tileSize, y: 0 });
      }
    } else {
      for (let i = 4; i <= 7; i++) {
        inbetweenPos.push({ x: i * tileSize, y: 0 });
      }
    }
  }
  return inbetweenPos;
}

function castleCheck(
  pieces: Chesspiece[],
  piece: Chesspiece,
  selectedPiece: Chesspiece,
) {
  let check: boolean = false;
  let castleCheck: boolean = false;
  const inbetweenPos: Position[] = castlePositions(piece);

  pieces.forEach((checkPiece: Chesspiece) => {
    if (checkPiece.team != piece.team) {
      if (checkPiece.movement().to.some((pos) => inbetweenPos.includes(pos))) {
        check = true;
      }
    }
  });

  if (
    selectedPiece instanceof King &&
    piece instanceof Rook &&
    !selectedPiece.moved &&
    !piece.moved &&
    !check
  ) {
    castleCheck = true;
  }
  return castleCheck;
}

export function pieceSelect(
  pieces: Chesspiece[],
  deadPieces: Chesspiece[],
  piece: Chesspiece,
  selectedPiece: Chesspiece | null,
  Index: number,
) {
  selectedPiece = findSelectedPiece(pieces, selectedPiece);

  if (selectedPiece?.team === piece.team || selectedPiece === null) {
    if (selectedPiece != null && castleCheck(pieces, piece, selectedPiece)) {
      const pos = castlePositions(piece);
      selectedPiece.move(pos[2]);
      piece.move(pos[1]);
    } else {
      pieces.forEach((piece: Chesspiece) => piece.deselect());
      piece.select();
      console.log("check", piece);
    }
  } else {
    if (checkAttack(pieces, selectedPiece, piece.position)) {
      selectedPiece.move(piece.position);
      deadPieces.push(pieces[Index]);
      pieces.splice(Index, 1);
      if (
        selectedPiece instanceof Soldier &&
        (piece.position.y === 0 || piece.position.y === 7 * tileSize)
      ) {
        promote(pieces, selectedPiece);
      }
    }
    pieces.forEach((piece: Chesspiece) => piece.deselect());
  }
}

function promote(pieces: Chesspiece[], piece: Chesspiece): void {
  const index: number = pieces.findIndex((soldier) => soldier === piece);
  pieces.splice(index, 1);
  pieces.push(
    new Queen({
      team: piece.team,
      position: piece.position,
    }),
  );
}
