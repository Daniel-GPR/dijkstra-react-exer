import { Position } from "../models";

export function addPositions(positionA: Position, positionB: Position) {
  return { x: positionA.x + positionB.x, y: positionA.y + positionB.y };
}

export function subtractPositions(positionA: Position, positionB: Position) {
  return { x: positionA.x - positionB.x, y: positionA.y - positionB.y };
}

export function multPositions(positionA: Position, positionB: Position) {
  return { x: positionA.x * positionB.x, y: positionA.y * positionB.y };
}

export function multPosition(positionA: Position, a: number) {
  return { x: positionA.x * a, y: positionA.y * a };
}

export function divPosition(positionA: Position, b: number) {
  return { x: positionA.x / b, y: positionA.y / b };
}

export function areEqual(positionA: Position, positionB: Position) {
  const check: boolean =
    positionA.x === positionB.x && positionA.y === positionB.y;
  return check;
}
