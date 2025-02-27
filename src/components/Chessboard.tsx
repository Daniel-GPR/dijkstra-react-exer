import { style } from "typestyle";
import { StandardColors } from "../styles";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function Chessboard() {
  const board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i <= horizontalAxis.length - 1; i++) {
      const number = i + j + 2;
      if (number % 2 === 0) {
        board.push(
          <div className={styles.darktile}>
            {horizontalAxis[i]}
            {verticalAxis[j]}
          </div>,
        );
      } else {
        board.push(
          <div className={styles.lighttile}>
            {horizontalAxis[i]}
            {verticalAxis[j]}
          </div>,
        );
      }
    }
  }
  return <div className={styles.chessboard}>{board}</div>;
}

const styles = {
  chessboard: style({
    backgroundColor: StandardColors.ColorBlue90,
    display: "grid",
    gridTemplateColumns: `repeat(8,${400 / 8}px)`,
    gridTemplateRows: `repeat(8,${400 / 8}px)`,
    width: "400px",
    height: "400px",
    placeContent: "center",
  }),
  darktile: style({
    width: `${400 / 8}px`,
    height: `${400 / 8}px`,
    backgroundColor: StandardColors.ColorBlue90,
  }),
  lighttile: style({
    width: `${400 / 8}px`,
    height: `${400 / 8}px`,
    backgroundColor: StandardColors.ColorDarkGray05,
  }),
};
