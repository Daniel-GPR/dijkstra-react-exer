import { style } from "typestyle";
import { StandardColors } from "./Colors";

export const styles = {
  container: style({
    backgroundColor: StandardColors.ColorYellow20,
    width: "100%",
    height: "100%",
    color: StandardColors.ColorBlue90,
    position: "relative",
  }),

  text: style({
    color: StandardColors.ColorRed90,
  }),

  image: style({
    width: 400,
    height: 200,
    position: "absolute",
    top: 50,
    right: 50,
  }),

  button: style({
    padding: 10,
    position: "relative",
    fontSize: 20,
    color: `${StandardColors.ColorBlack} !important`,
    backgroundColor: StandardColors.ColorDarkGray20,
  }),

  input: style({
    padding: 15,
    position: "relative",
    fontSize: 20,
    color: `${StandardColors.ColorPink70} !important`,
  }),

  inputsContainer: style({
    rowGap: 15,
    padding: 20,
    position: "absolute",
    top: "15%",
    left: "2%",
    fontSize: 20,
    backgroundColor: StandardColors.ColorInk20,
    color: `${StandardColors.ColorPink70} !important`,
    display: "flex",
    flexDirection: "column",
  }),

  headers: style({
    color: StandardColors.ColorBlue20,
    border: StandardColors.ColorBlue40,
    textShadow: "0 0 15px #FF0000, 0 0 15px rgb(104, 158, 108)",
  }),

  cannon: style({
    width: "25%",
    height: "25%",
    position: "absolute",
    top: "75%",
    right: "78%",
  }),
};
