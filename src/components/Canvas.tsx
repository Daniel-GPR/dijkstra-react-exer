import { style } from "typestyle";
import { StandardColors } from "../styles";
import { use, useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import { useMousePositionClick } from "../hooks/UseMousePosition";
import { styles } from "../styles/Styles";
import {
  King,
  Queen,
  Piece,
  Tower,
  Bishop,
  Knight,
  bober,
} from "../assets/chesspieces";
import { Chessboard } from "../graphics/Chessboard";
import { chessPieceMap } from "../resources/ChessPieceMap";
import { Team } from "../models/Team";

export function Canvas() {
  return (
    <div className={styles.container}>
      <div className={styles.chessBoardContainer}>
        <Chessboard />
      </div>
    </div>
  );
}
