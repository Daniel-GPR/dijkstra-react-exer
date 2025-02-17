import { Button, Input } from "reactstrap";
import { style } from "typestyle";
import { PrimaryColors, shadeColor, Spacing, StandardColors } from "../styles";
import { ButtonStyles } from "../styles/ButtonStyles";
import { useControl } from "../Services/ControlDataContext";
import { VectorInput } from "./VectorInput";

export function ControlPanel() {
  const {
    setIsPaused,
    isPaused,
    position,
    setPosition,
    size,
    addCannon,
    setSize,
    elasticity,
    setElasticity,
  } = useControl();

  return (
    <div className={styles.controlPanel}>
      <Button
        className={ButtonStyles.Primary}
        onClick={() => setIsPaused(!isPaused)}
      >
        {isPaused ? "Start" : "Stop"}
      </Button>

      <Button className={ButtonStyles.Primary} onClick={addCannon}>
        {"Shoot"}
      </Button>

      <VectorInput
        title={"position"}
        vector={position}
        onChange={(newPos) => setPosition(newPos)}
        min={{ x: 0 + size / 2, y: 0 + size / 2 }}
        max={{
          x: window.innerWidth - size / 2,
          y: window.innerHeight - size / 2,
        }}
      />

      <h2>Size</h2>
      <Input
        value={size}
        type="range"
        min={4}
        max={100}
        onChange={(e) => setSize(parseInt(e.target.value))}
      />

      <h2>Elasticity</h2>
      <Input
        value={elasticity}
        type="range"
        min={0.1}
        step={0.1}
        max={1}
        onChange={(e) => setElasticity(parseFloat(e.target.value))}
      />
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
