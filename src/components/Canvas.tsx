import { style } from "typestyle";
import { StandardColors } from "../styles";
import { use, useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import useMousePosition from "../hooks/UseMousePosition";
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

export function Canvas() {
  return (
    <div className={styles.container}>
      <div className={styles.chessBoardContainer}>
        <Chessboard />
      </div>
    </div>
  );
}
