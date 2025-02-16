import { style } from "typestyle";
import { StandardColors } from "../styles";
import { Cannonball } from "./Cannonball";
import { useEffect, useState } from "react";
import { Position } from "../models";
import { Button } from "reactstrap";

export function Canvas() {
  const initial_position = { x: 50, y: 50 };
  const [position, setPosition] = useState<Position>(initial_position);
  // const [gravity];

  const fps = 144;
  const velocity = 200; //  pixels/sec
  const acceleration = 100; // pixels/sec^2
  const [time, setTime] = useState(0);
  const [runsim, setRunsim] = useState<boolean>(false);

  useEffect(() => {
    if (runsim == true) {
      const interval = setInterval(() => {
        setPosition({
          x: initial_position.x + velocity * time,
          y:
            initial_position.y +
            velocity * time -
            0.5 * acceleration * time ** 2,
        });
        setTime(time + 1 / fps);
        // console.log(time);
      }, 1000 / fps);
      return () => clearInterval(interval);
    }
  });

  function reset() {
    setRunsim(true);
    setPosition(initial_position);
    setTime(0);
  }
  return (
    <div className={styles.container}>
      <Button onClick={reset}>SHOOT</Button>
      <Cannonball
        color={StandardColors.ColorPurple80}
        size={50}
        position={position}
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
