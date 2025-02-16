import { style } from "typestyle";
import { Position } from "../models/Position";
import { BoxShadowStyles } from "../styles";

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
      bottom: props.position.y,
      left: props.position.x,
      boxShadow: BoxShadowStyles.offset,
    }),
  };
  return <div className={styles.cannonball} />;
}
