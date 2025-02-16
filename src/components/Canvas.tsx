import { style } from "typestyle";
import { StandardColors } from "../styles";
import { Cannonball } from "./Cannonball";

export function Canvas() {
  return (
    <div className={styles.container}>
      <Cannonball
        color={StandardColors.ColorPurple80}
        size={50}
        position={{ x: 50, y: 50 }}
      />
    </div>
  );
}

const styles = {
  container: style({
    backgroundColor: StandardColors.ColorGreen80,
    width: "100%",
    height: "100%",
    color: StandardColors.ColorBlue80,
    position: "relative",
  }),
};
