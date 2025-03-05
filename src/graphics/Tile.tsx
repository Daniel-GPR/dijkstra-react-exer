import { style } from "typestyle";
import { chessPieceMap } from "../resources/ChessPieceMap";
import { ChessPiece } from "../models/ChessPiece";
import { Bishop, King, Knight } from "../assets/chesspieces";
import { Team } from "../models/Team";

export interface TileProps {
  color: string;
  contents: TileContent | null;
  position: [number, number];
  size: string;
  highlight: string | null;
}

interface TileContent {
  team: Team;
  pieceType: ChessPiece;
}
ChessPiece["King"];

export function Tile(props: TileProps) {
  return (
    <div
      className={style({
        position: "absolute",
        backgroundColor: props.color,
        left: `${(props.position[0] / 8) * 100}%`,
        top: `${(props.position[1] / 8) * 100}%`,
        width: props.size,
        height: props.size,
      })}
      data-props={props.contents ? props : ""}
      data-piece={props.contents ? ChessPiece[props.contents.pieceType] : ""}
      data-team={props.contents ? Team[props.contents.team] : ""}
    >
      {props.contents &&
        chessPieceMap(props.contents.team, props.position)[
          props.contents.pieceType
        ].icon}
    </div>
  );
}
