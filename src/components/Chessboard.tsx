import { style } from "typestyle";
import { Position } from "../models";
import { Chesspiece, Team } from "./Chesspiece";
import { Bishop } from "./Pieces/Bishop";
import { Knight } from "./Pieces/Knight";
import { Queen } from "./Pieces/Queen";
import { Rook } from "./Pieces/Rook";
import { Tile, TileProps } from "./Tile";
import { Soldier } from "./Pieces/Soldiers";
import { King } from "./Pieces/King";
import { Pieces } from "./Pieces";
import { Button } from "reactstrap";
import { useState } from "react";

export const chessboardSize: number = 400;
export const tileSize: number = chessboardSize / 8;

export function Chessboard() {
  // BOARD
  const boardProps: TileProps[][] = [[]];
  let tilePosX: number = 0;
  let tilePosY: number = 0;
  let darktile: boolean = false;
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

  // PIECES
  const [pieces, setPieces] = useState<Chesspiece[]>(Pieces());
  console.log(pieces);
  // const styles = {
  //   cannon: style({
  //     width: `${tileSize}px`,
  //     position: "absolute",
  //     top: `${queen.position.y}px`,
  //     left: `${queen.position.x}px`,
  //   }),
  // };

  return (
    <div>
      <>
        {boardProps.map((row, rowIndex) =>
          row.map((tileProps, columnIndex) => (
            <Tile key={`${rowIndex}${columnIndex}`} {...tileProps} />
          )),
        )}
      </>
      <>
        {pieces.map((piece, Index) => (
          <img
            key={Index}
            src={piece.image}
            style={{
              width: `${tileSize}px`,
              position: "absolute",
              top: `${piece.position.y}px`,
              left: `${piece.position.x}px`,
            }}
          />
        ))}
      </>
      <Button
        className={styles.button}
        onClick={() => {
          pieces[5].move({ x: 100, y: 250 });
          setPieces([...pieces]);
        }}
      />
    </div>
  );
}

const styles = {
  button: style({
    position: "absolute",
    top: "5%",
    left: "5%",
  }),
};
