import { style } from "typestyle";
import { chessPieceMap } from "../resources/ChessPieceMap";
import { ChessPiece } from "../models/ChessPiece";
import { Bishop, King, Knight } from "../assets/chesspieces";
import { Team } from "../models/Team";
import { StandardColors } from "../styles";
import { useState } from "react";
import { pieceMovements } from "./BoardUtils";
import { styles } from "../styles/Styles";

export interface TileProps {
  color: string;
  contents: TileContent | null;
  position: [number, number];
  size: string;
  highlight: boolean;
  enemHighlight: boolean;
  onClick?: (position: [number, number]) => void;
}

export interface TileContent {
  team: Team;
  pieceType: ChessPiece;
  hassMoved?: boolean;
}

export function Tile(props: TileProps) {
  return (
    <div
      className={style({
        position: "absolute",
        backgroundColor: props.highlight
          ? props.enemHighlight
            ? StandardColors.ColorRed40
            : StandardColors.ColorGreen40
          : props.color,

        left: `${(props.position[0] / 8) * 100}%`,
        top: `${(props.position[1] / 8) * 100}%`,
        width: props.size,
        height: props.size,
      })}
      onClick={() => {
        props.onClick && props.onClick(props.position);
      }}
    >
      {props.contents &&
        chessPieceMap(props.contents.team)[props.contents.pieceType].icon}
      {props.highlight && !props.enemHighlight && (
        <div className={styles.Dot}>o</div>
      )}
    </div>
  );
}
