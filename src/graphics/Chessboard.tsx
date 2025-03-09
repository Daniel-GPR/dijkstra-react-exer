import React, { useEffect, useState } from "react";
import { Tile, TileContent, TileProps } from "./Tile";
import { StandardColors } from "../styles";
import { styles } from "../styles/Styles";
import { style } from "typestyle";
import { bober } from "../assets/chesspieces";
import { initializeBoard, initializePieces } from "./BoardUtils";
import {
  getSurroundingDiv,
  useMousePositionClick,
} from "../hooks/UseMousePosition";
import { allowedMoves } from "../resources/AllowedMoves";

export function Chessboard() {
  const [chessboard, setChessboard] = useState<TileProps[][]>([]);
  const boardSize = 8;

  useEffect(() => {
    if (chessboard.length < 8) {
      const initialBoard = initializeBoard(chessboard, boardSize);
      setChessboard([...initializePieces(initialBoard)]);
    }
  }, []);

  const [selected, setSelected] = useState<
    [
      boolean,
      TileContent | null,
      [number, number],
      [number, number][] | undefined,
    ]
  >([false, null, [100, 100], []]);

  return chessboard.map((row: TileProps[], rowInd) =>
    row.map((tile: TileProps, colInd) => (
      <Tile
        key={`${rowInd}-${colInd}`}
        {...tile}
        onClick={(pos) => {
          chessboard.forEach((row) =>
            row.forEach((tile) => (tile.highlight = false)),
          );

          if (chessboard[pos[1]][pos[0]].contents && selected[0] != true) {
            const posMovArr = allowedMoves(
              chessboard,
              chessboard[pos[1]][pos[0]].contents,
              pos,
            );
            posMovArr?.map(
              (posMov) => (chessboard[posMov[1]][posMov[0]].highlight = true),
            );
            setSelected([
              true,
              chessboard[pos[1]][pos[0]].contents,
              pos,
              posMovArr,
            ]);
          }

          if (selected[0]) {
            if (
              selected[3]?.some((posMov) =>
                posMov.every((value, index) => value === pos[index]),
              )
            ) {
              const piece = selected[1];
              if (piece) {
                piece.hassMoved = true;
              }
              chessboard[pos[1]][pos[0]].contents = piece;
              chessboard[selected[2][1]][selected[2][0]].contents = null;
            }
            setSelected([false, null, [100, 100], undefined]);
          }

          // chessboard[pos[1]][pos[0]].highlight = true;
          setChessboard([...chessboard]);
        }}
      />
    )),
  );
}
