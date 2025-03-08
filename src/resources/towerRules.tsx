import { Team } from "../models/Team";

export function towerRules(
  X: number,
  Y: number,
  hassMoved: boolean | undefined,
  enemyTeamPos: [number, number][],
  elementsOnBoard: [[number, number], Team | undefined][],
  allPieces: [number, number][],
  team: Team,
  posMov: [number, number][],
) {
  let upCheck = Y - 1;
  let downCheck = Y + 1;
  let leftCheck = X - 1;
  let rightCheck = X + 1;

  while (
    !allPieces.find((coords) => coords[0] === rightCheck && coords[1] === Y) &&
    rightCheck <= 7
  ) {
    posMov.push([rightCheck, Y]);
    rightCheck++;
  }

  if (rightCheck <= 7) {
    if (
      elementsOnBoard.find(
        (element) =>
          element[0][0] === rightCheck &&
          element[0][1] === Y &&
          element[1] != team,
      )
    ) {
      posMov.push([rightCheck, Y]);
    }
  }

  while (
    !allPieces.find((coords) => coords[0] === leftCheck && coords[1] === Y) &&
    leftCheck >= 0
  ) {
    posMov.push([leftCheck, Y]);
    leftCheck--;
  }

  if (leftCheck >= 0) {
    if (
      elementsOnBoard.find(
        (element) =>
          element[0][0] === leftCheck &&
          element[0][1] === Y &&
          element[1] != team,
      )
    ) {
      posMov.push([leftCheck, Y]);
    }
  }

  while (
    !allPieces.find((coords) => coords[1] === upCheck && coords[0] === X) &&
    upCheck >= 0
  ) {
    posMov.push([X, upCheck]);
    upCheck--;
  }

  if (upCheck >= 0) {
    if (
      elementsOnBoard.find(
        (element) =>
          element[0][1] === upCheck &&
          element[0][0] === X &&
          element[1] != team,
      )
    ) {
      posMov.push([X, upCheck]);
    }
  }

  while (
    !allPieces.find((coords) => coords[1] === downCheck && coords[0] === X) &&
    downCheck <= 7
  ) {
    posMov.push([X, downCheck]);
    downCheck++;
  }

  if (downCheck <= 7) {
    if (
      elementsOnBoard.find(
        (element) =>
          element[0][1] === downCheck &&
          element[0][0] === X &&
          element[1] != team,
      )
    ) {
      posMov.push([X, downCheck]);
    }
  }

  return posMov;
}
