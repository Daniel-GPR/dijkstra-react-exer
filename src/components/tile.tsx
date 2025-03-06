import { style } from "typestyle";
import { StandardColors } from "../styles";
import { Position } from "../models";

export interface TileProps {
  position: Position;
  size: number;
  dark: boolean;
  onClick?: () => void;
}
export function Tile(props: TileProps) {
  const color: string = props.dark
    ? StandardColors.ColorBlue90
    : StandardColors.ColorDarkGray05;

  const styles = {
    tile: style({
      backgroundColor: color,
      width: `${props.size}px`,
      height: `${props.size}px`,
      position: "absolute",
      top: props.position.y,
      left: props.position.x,
    }),
  };
  return <div className={styles.tile} onClick={props.onClick} />;
}
