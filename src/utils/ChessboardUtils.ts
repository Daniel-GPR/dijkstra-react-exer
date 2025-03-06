import { Chesspiece } from "../components/Chesspiece";
import { TileProps } from "../components/Tile";
import { Position } from "../models";
import { areEqual } from "./PositionUtils";

export function checkMove(piece: Chesspiece, to: Position) {
  let check: boolean = false;
  if (piece.movement().find((position) => areEqual(position, to))) {
    check = true;
  }
  return check;
}

export function movePiece(pieces: Chesspiece[], tileProps: TileProps) {
  const to: Position = tileProps.position;
  pieces.forEach((piece) => {
    if (piece.selected && checkMove(piece, to)) {
      piece.move(to);
      piece.deselect();
    }
  });
}

export function findSelectedPiece(
  pieces: Chesspiece[],
  selectedPiece: Chesspiece | null,
) {
  // let selectedPiece: Chesspiece | null = null;
  pieces.forEach((checkPiece: Chesspiece) => {
    if (checkPiece.selected) {
      selectedPiece = checkPiece;
    }
  });
  return selectedPiece;
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
    pieces.forEach((piece: Chesspiece) => piece.deselect());
    piece.select();
    console.log("check");
  } else {
    if (checkMove(selectedPiece, piece.position)) {
      // piece.move(selectedPiece.)
      selectedPiece.move(piece.position);
      deadPieces.push(pieces[Index]);
      pieces.splice(Index, 1);
    }
    pieces.forEach((piece: Chesspiece) => piece.deselect());
  }
}
