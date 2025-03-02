import React from "react";
import { Tile, TileProps } from "./Tile";
import { StandardColors } from "../styles";
import { styles } from "../styles/Styles";
import { style } from "typestyle";
import { bober } from "../assets/chesspieces";
import { initializeBoard, initializePieces } from "./BoardUtils";

export function Chessboard() {
  const chessboard: TileProps[][] = [];
  const boardSize = 8;

  initializeBoard(chessboard, boardSize);

  initializePieces(chessboard);

  return chessboard.map((row: TileProps[]) =>
    row.map((tile: TileProps) => <Tile {...tile} />),
  );
}
