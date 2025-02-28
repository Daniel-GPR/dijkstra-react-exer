import React from "react";
import { TileProps } from "./Tile";
import { StandardColors } from "../styles";
import { styles } from "../styles/Styles";
import { style } from "typestyle";
import { bober } from "../assets/chesspieces";

export function Chessboard() {
  const chessboard: TileProps[][] = [];
  const boardSize = 8;

  for (let i = 0; i < boardSize; i++) {
    chessboard.push([]);
    for (let b = 0; b < boardSize; b++) {
      if ((i + b) % 2 === 0) {
        chessboard[i][b] = {
          color: StandardColors.ColorBlack,
          contents: "empty",
          position: [`${(i / boardSize) * 100}%`, `${(b / boardSize) * 100}%`],
          size: `${100 / boardSize}%`,
        };
      } else {
        chessboard[i][b] = {
          color: StandardColors.ColorWhite,
          contents: "empty",
          position: [`${(i / boardSize) * 100}%`, `${(b / boardSize) * 100}%`],
          size: `${100 / boardSize}%`,
        };
        console.log(chessboard[i][b].size, chessboard[i][b].position[0]);
      }
    }
  }

  return chessboard.map((tileArr) =>
    tileArr.map((tile) => (
      <div
        className={style({
          position: "absolute",
          backgroundColor: tile.color,
          right: tile.position[0],
          top: tile.position[1],
          width: tile.size,
          height: tile.size,
        })}
      >
      <bober />
      </div>
    )),
  );
}
