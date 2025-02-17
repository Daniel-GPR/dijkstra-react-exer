import { style } from "typestyle";
import { Position, Vector } from "../models";
import { positionToAbsStyle } from "../styles";

export interface CannonBallProps {
  id: string;
  size: number;
  color: string;
  position: Position;
  velocity: Vector;
  mass: number;
  elasticity: number;
}
export function CannonBall(props: CannonBallProps) {
  const cannonStyle = style({
    position: "absolute",
    height: props.size,
    width: props.size,
    ...positionToAbsStyle(props.position),
    borderRadius: "50%",
    backgroundColor: props.color,
    transformOrigin: `${props.size / 2}px ${props.size / 2}px`,
    // offset so we have center of circle as visible coords
    marginLeft: -props.size / 2,
    marginBottom: -props.size / 2,
  });

  return <div className={cannonStyle} />;
}
