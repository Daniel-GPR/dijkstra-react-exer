import { style } from "typestyle";
import { Position } from "../models";

export interface CannonballProps {
  color: string;
  size: number;
  position: Position;
}

export function Cannonball(props: CannonballProps) {
  const styles = {
    cannonball: style({
      backgroundColor: props.color,
      width: props.size,
      height: props.size,
      position: "absolute",
      borderRadius: "50%",
      top: props.position.y,
      right: props.position.x,
    }),
  };
  return <div className={styles.cannonball} />;
}
