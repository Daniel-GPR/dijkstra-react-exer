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
} from "../assets/chesspieces";

export function Canvas() {
  const color = StandardColors.ColorBlue50;
  return <div className={styles.container}></div>;
}
