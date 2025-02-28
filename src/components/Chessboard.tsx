import { Position } from "../models";
import { Tile, TileProps } from "./Tile";

const chessboardSize: number = 600;
const tileSize: number = chessboardSize / 8;

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

  return (
    <div>
      {boardProps.map((row, rowIndex) =>
        row.map((tileProps, columnIndex) => (
          <Tile key={`${rowIndex}${columnIndex}`} {...tileProps} />
        )),
      )}
    </div>
  );
}
