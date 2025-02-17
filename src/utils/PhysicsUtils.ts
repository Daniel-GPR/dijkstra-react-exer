import { Vector } from "../models";

export function addVectors(a: Vector, b: Vector): Vector {
  return {
    y: a.y + b.y,
    x: a.x + b.x,
  };
}

export function scaleVector(v: Vector, multiplier: number): Vector {
  return {
    y: v.y * multiplier,
    x: v.x * multiplier,
  };
}

export function divideVector(v: Vector, divider: number): Vector {
  return scaleVector(v, 1 / divider);
}

export function isZeroVector(v: Vector) {
  return v.x == 0 && v.y == 0;
}
