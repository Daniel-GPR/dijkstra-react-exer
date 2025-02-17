import { NestedCSSProperties } from "typestyle/lib/types";
import { Position } from "../models";

export function positionToAbsStyle(position: Position): NestedCSSProperties {
  return {
    bottom: position.y,
    left: position.x,
  };
}
