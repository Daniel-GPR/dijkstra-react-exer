import { v4 as uuidv4 } from "uuid";

export function generateUuid(): string {
  return uuidv4() as string;
}

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
