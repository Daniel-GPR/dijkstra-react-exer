import { style } from "typestyle";
import { Position } from "../models";
import { Chesspiece } from "./Chesspiece";
import { Tile, TileProps } from "./Tile";
import { Pieces } from "./Pieces";
import { Button } from "reactstrap";
import { useState } from "react";
import { areEqual } from "../utils/PositionUtils";
import { movePiece, pieceSelect } from "../utils/ChessboardUtils";

export const chessboardSize: number = Math.min(window.innerHeight, innerWidth);
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
  const [deadPieces, setDeadPieces] = useState<Chesspiece[]>([]);
  // let selectedPiece: Chesspiece = pieces[0];
  let selectedPiece: Chesspiece | null = null;
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
            <Tile
              key={`${rowIndex}${columnIndex}`}
              {...tileProps}
              onClick={() => {
                movePiece(pieces, tileProps);
                setPieces([...pieces]);
              }}
            />
          )),
        )}
      </>
      <>
        {pieces.map((piece, Index) => (
          <img
            key={Index}
            src={piece.image}
            style={{
              backgroundColor: piece.background,
              width: `${tileSize}px`,
              position: "absolute",
              top: `${piece.position.y}px`,
              left: `${piece.position.x}px`,
            }}
            onClick={() => {
              piece.movement().to.map((tile, Index) => (
                <Tile
                  key={Index}
                  {...{
                    position: tile,
                    size: tileSize,
                    dark: false,
                    highlight: true,
                    zIndex: 100 + Index,
                  }}
                />
              ));
              pieceSelect(pieces, deadPieces, piece, selectedPiece, Index);
              setPieces([...pieces]);
            }}
          />
        ))}
      </>
      {/* <Button
        className={styles.button}
        onClick={() => {
          pieces[5].move({ x: 100, y: 250 });
          setPieces([...pieces]);
        }}
      /> */}
    </div>
  );
}

// const styles = {
//   button: style({
//     position: "absolute",
//     top: "5%",
//     left: "5%",
//   }),
// };
