import { Team } from "../models/Team";

export function knightRules(
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
    [X - 1, Y - 2],
    [X - 1, Y + 2],
    [X - 2, Y - 1],
    [X - 2, Y - 1],
    [X + 1, Y + 2],
    [X + 1, Y - 2],
    [X + 2, Y - 1],
    [X + 2, Y + 1],
  ];

  aroundCoords.map((posOne) =>
    enemyTeamPos.find(
      (posTwo) =>
        posOne[0] === posTwo[0] &&
        posOne[1] === posTwo[1] &&
        posMov.push([posOne[0], posOne[1]]),
    ),
  );

  let posMovTwo: [number, number][] = [];

  aroundCoords.forEach((posOne) => {
    if (0 <= posOne[0] && posOne[0] <= 7 && 0 <= posOne[1] && posOne[1] <= 7) {
      if (
        allPieces.every(
          (posTwo) => posOne[0] != posTwo[0] || posOne[1] != posTwo[1],
        )
      ) {
        // console.log("free found", posOne, posTwo),
        posMovTwo.push([posOne[0], posOne[1]]);
      } else {
        console.log("ouga bugga");
      }
    }
  });

  posMov = [...posMov, ...posMovTwo];

  return posMov;
}
