import { Vector } from "../models";

export function addVectors(vectorA: Vector, vectorB: Vector) {
  return { x: vectorA.x + vectorB.x, y: vectorA.y + vectorB.y };
}

export function subtractVectors(vectorA: Vector, vectorB: Vector) {
  return { x: vectorA.x - vectorB.x, y: vectorA.y - vectorB.y };
}

export function multVectors(vectorA: Vector, vectorB: Vector) {
  return { x: vectorA.x * vectorB.x, y: vectorA.y * vectorB.y };
}

export function multVector(vectorA: Vector, a: number) {
  return { x: vectorA.x * a, y: vectorA.y * a };
}

export function divVector(vectorA: Vector, b: number) {
  return { x: vectorA.x / b, y: vectorA.y / b };
}
