import { Team } from "../models/Team";

export function kingRules(
  X: number,
  Y: number,
  hassMoved: boolean | undefined,
  enemyTeamPos: [number, number][],
  elementsOnBoard: [[number, number], Team | undefined][],
  allPieces: [number, number][],
  team: Team,
  posMov: [number, number][],
) {
  const aroundCoords: [number, number][] = [
    [X - 1, Y],
    [X - 1, Y - 1],
    [X - 1, Y + 1],
    [X, Y + 1],
    [X, Y - 1],
    [X + 1, Y],
    [X + 1, Y - 1],
    [X + 1, Y],
  ];

  aroundCoords.some((posOne) =>
    enemyTeamPos.find(
      (posTwo) =>
        posOne[0] === posTwo[0] &&
        posOne[1] === posTwo[1] &&
        posMov.push([posOne[0], posOne[1]]),
    ),
  );

  // aroundCoords.some((posOne) =>
  //   allPieces.some(
  //     (posTwo) =>
  //       posOne[0] !== posTwo[0] &&
  //       posOne[1] !== posTwo[1] &&
  //       posMov.push([posOne[0], posOne[1]]),
  //   ),
  // );

  return posMov;
}
