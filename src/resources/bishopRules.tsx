import { Team } from "../models/Team";

export function bishopRules(
  X: number,
  Y: number,
  hassMoved: boolean | undefined,
  enemyTeamPos: [number, number][],
  elementsOnBoard: [[number, number], Team | undefined][],
  allPieces: [number, number][],
  team: Team,
  posMov: [number, number][],
) {
  let upRightCheck: [number, number] = [X + 1, Y - 1];
  let downLeftCheck: [number, number] = [X - 1, Y + 1];
  let upLeftCheck: [number, number] = [X - 1, Y - 1];
  let downRightCheck: [number, number] = [X + 1, Y + 1];

  while (
    !allPieces.find(
      (coords) =>
        coords[0] === upRightCheck[0] && coords[1] === upRightCheck[1],
    ) &&
    upRightCheck[0] <= 7 &&
    upRightCheck[1] >= 0
  ) {
    posMov.push([upRightCheck[0], upRightCheck[1]]);
    upRightCheck[0]++;
    upRightCheck[1]--;
  }

  if (upRightCheck[0] <= 7 && upRightCheck[1] >= 0) {
    if (
      elementsOnBoard.find(
        (element) =>
          element[0][0] === upRightCheck[0] &&
          element[0][1] === upRightCheck[1] &&
          element[1] != team,
      )
    ) {
      posMov.push(upRightCheck);
    }
  }

  while (
    !allPieces.find(
      (coords) => coords[0] === upLeftCheck[0] && coords[1] === upLeftCheck[1],
    ) &&
    upLeftCheck[0] >= 0 &&
    upLeftCheck[1] >= 0
  ) {
    posMov.push([upLeftCheck[0], upLeftCheck[1]]);
    upLeftCheck[0]--;
    upLeftCheck[1]--;
  }

  if (upLeftCheck[0] >= 0 && upLeftCheck[1] >= 0) {
    if (
      elementsOnBoard.find(
        (element) =>
          element[0][0] === upLeftCheck[0] &&
          element[0][1] === upLeftCheck[1] &&
          element[1] != team,
      )
    ) {
      posMov.push([upLeftCheck[0], upLeftCheck[1]]);
    }
  }

  while (
    !allPieces.find(
      (coords) =>
        coords[1] === downLeftCheck[1] && coords[0] === downLeftCheck[0],
    ) &&
    downLeftCheck[0] >= 0 &&
    downLeftCheck[1] <= 7
  ) {
    posMov.push([downLeftCheck[0], downLeftCheck[1]]);
    downLeftCheck[0]--;
    downLeftCheck[1]++;
  }

  if (downLeftCheck[0] >= 0 && downLeftCheck[1] <= 7) {
    if (
      elementsOnBoard.find(
        (element) =>
          element[0][1] === downLeftCheck[1] &&
          element[0][0] === downLeftCheck[0] &&
          element[1] != team,
      )
    ) {
      posMov.push([downLeftCheck[0], downLeftCheck[1]]);
    }
  }

  while (
    !allPieces.find(
      (coords) =>
        coords[1] === downRightCheck[1] && coords[0] === downRightCheck[0],
    ) &&
    downRightCheck[0] <= 7 &&
    downRightCheck[1] <= 7
  ) {
    posMov.push([downRightCheck[0], downRightCheck[1]]);
    downRightCheck[0]++;
    downRightCheck[1]++;
  }

  if (downRightCheck[0] <= 7 && downRightCheck[1] <= 7) {
    if (
      elementsOnBoard.find(
        (element) =>
          element[0][1] === downRightCheck[1] &&
          element[0][0] === downRightCheck[0] &&
          element[1] != team,
      )
    ) {
      posMov.push([downRightCheck[0], downRightCheck[1]]);
    }
  }

  return posMov;
}
