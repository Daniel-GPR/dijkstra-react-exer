import { style } from "typestyle";
import { PrimaryColors, shadeColor, Spacing, StandardColors } from "../styles";
import { GameArea } from "./GameArea";
import { ControlPanel } from "./ControlPanel";

export function Canvas() {
  return (
    <div className={styles.canvas}>
      <ControlPanel />
      <GameArea />
    </div>
  );
}

const styles = {
  canvas: style({
    position: "relative",
    overflow: "hidden",
    height: "100%",
    width: "100%",
    backgroundColor: StandardColors.ColorDarkGray90,
  }),
  controlPanel: style({
    backgroundColor: shadeColor(PrimaryColors.ColorTeal, -0.1),
    position: "absolute",
    borderRadius: Spacing.Medium,
    width: 440,
    top: Spacing.xxxLarge,
    right: Spacing.xxxLarge,
    padding: Spacing.xxLarge,
    display: "flex",
    flexDirection: "column",
    rowGap: Spacing.xLarge,
  }),
};
