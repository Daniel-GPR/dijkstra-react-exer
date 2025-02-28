export enum Team {
  Black = "Black",
  White = "White",
}

export class Chesspiece {
  team: Team;
  constructor(team: Team) {
    this.team = team;
  }
}
