import React from "react";
import { Tile, TileProps } from "./Tile";
import { StandardColors } from "../styles";
import { styles } from "../styles/Styles";
import { style } from "typestyle";
import { bober } from "../assets/chesspieces";
import { initializeBoard, initializePieces } from "./BoardUtils";
import {
  getSurroundingDiv,
  mouseTrack,
  useMousePositionClick,
} from "../hooks/UseMousePosition";

export function Chessboard() {
  const chessboard: TileProps[][] = [];
  const boardSize = 8;
  const clickPos = useMousePositionClick();
  // const clicked = false

  initializeBoard(chessboard, boardSize);

  initializePieces(chessboard);

  // getSurroundingDiv(clickPos[0], clickPos[1]);
  // if
  mouseTrack();

  return chessboard.map((row: TileProps[]) =>
    row.map((tile: TileProps) => <Tile {...tile} />),
  );
}
