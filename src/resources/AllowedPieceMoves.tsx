import { Team } from "../models/Team";

export function pieceRules(
  X: number,
  Y: number,
  hassMoved: boolean | undefined,
  enemyTeamPos: [number, number][],
  elementsOnBoard: [[number, number], Team | undefined][],
  allPieces: [number, number][],
  team: Team,
  posMov: [number, number][],
) {
  let enemRight: [number, number] = [0, 0];
  let enemLeft: [number, number] = [0, 0];
  let front: [number, number] = [0, 0];
  let twoFront: [number, number] = [0, 0];

  if (team === Team.Black) {
    enemRight = [X + 1, Y + 1];
    enemLeft = [X - 1, Y + 1];
    front = [X, Y + 1];
    twoFront = [X, Y + 2];
  } else {
    enemRight = [X + 1, Y - 1];
    enemLeft = [X - 1, Y - 1];
    front = [X, Y - 1];
    twoFront = [X, Y - 2];
  }

  const enemToTheRight = enemyTeamPos.some((pos) =>
    pos.every((value, index) => value === enemRight[index]),
  );
  const enemToTheLeft = enemyTeamPos.some((pos) =>
    pos.every((value, index) => value === enemLeft[index]),
  );
  const anyAhead = allPieces.some((pos) =>
    pos.every((value, index) => value === front[index]),
  );
  const anyTwiceAhead = allPieces.some((pos) =>
    pos.every((value, index) => value === twoFront[index]),
  );

  if (enemToTheLeft && enemToTheRight && anyAhead) {
    posMov = [enemRight, enemLeft];
  } else if (enemToTheLeft && anyAhead) {
    posMov = [enemLeft];
  } else if (enemToTheRight && anyAhead) {
    posMov = [enemRight];
  } else if (anyAhead) {
    posMov = [];
  } else if (enemToTheLeft && enemToTheRight) {
    if (hassMoved || anyTwiceAhead) {
      posMov = [enemLeft, enemRight, front];
    } else {
      posMov = [enemLeft, enemRight, front, twoFront];
    }
  } else if (enemToTheRight) {
    if (hassMoved || anyTwiceAhead) {
      posMov = [front, enemRight];
    } else {
      posMov = [front, enemRight, twoFront];
    }
  } else if (enemToTheLeft) {
    if (hassMoved || anyTwiceAhead) {
      posMov = [front, enemLeft];
    } else {
      posMov = [front, enemLeft, twoFront];
    }
  } else if (hassMoved) {
    posMov = [front];
  } else if (anyTwiceAhead) {
    posMov = [front];
  } else {
    posMov = [front, twoFront];
  }

  return posMov;
}
