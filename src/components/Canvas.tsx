import { style } from "typestyle";
import Chessboard from "./Chessboard";

export function Canvas() {
  const board = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"],
  ];

  console.log(`${board.join("\n")}\n\n`);
  return (
    <div className={styles.canvas}>
      <Chessboard />
    </div>
  );
}

const styles = {
  canvas: style({
    placeContent: "center",
  }),
};
