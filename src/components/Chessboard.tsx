import { Position } from "../models";
import { Team } from "./Chesspiece";
import { Queen } from "./Pieces/Queen";
import { Tile, TileProps } from "./Tile";

export const chessboardSize: number = 400;
export const tileSize: number = chessboardSize / 8;

export function Chessboard() {
  const boardProps: TileProps[][] = [[]];
  let tilePosX: number = 0;
  let tilePosY: number = 0;
  let darktile: boolean = true;
  for (let i = 0; i <= 7; i++) {
    boardProps.push([]);
    tilePosX = 0;
    darktile = !darktile;
    for (let j = 0; j <= 7; j++) {
      darktile = !darktile;
      const position: Position = { x: tilePosX, y: tilePosY };

      boardProps[i][j] = { position: position, size: tileSize, dark: darktile };

      tilePosX += tileSize;
    }
    tilePosY += tileSize;
  }
  const queen = new Queen({ team: Team.White, position: { x: 150, y: 350 } });
  const to = queen.movement();

  return (
    <div>
      <>
        {boardProps.map((row, rowIndex) =>
          row.map((tileProps, columnIndex) => (
            <Tile key={`${rowIndex}${columnIndex}`} {...tileProps} />
          )),
        )}
      </>
    </div>
  );
}
