import { style } from "typestyle";
import { BoxShadowStyles } from "../styles";
import { Vector } from "../models";

export interface CannonballProps {
  color: string;
  size: number;
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
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
