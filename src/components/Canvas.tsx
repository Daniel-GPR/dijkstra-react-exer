import { style } from "typestyle";
import { StandardColors } from "../styles";
import { Cannonball } from "./Cannonball";
import { useEffect, useState } from "react";
import { Position } from "../models";
import { Button, Input } from "reactstrap";
import useMousePosition from "../hooks/UseMousePosition";
import cannon from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/cannon.svg";

export function Canvas() {
  const tan = (useMousePosition().y - 550) / (useMousePosition().x - 20);
  const angle = Math.atan(tan);
  const initial_position = { x: 50, y: 20 };
  const [position, setPosition] = useState<Position>(initial_position);

  const fps = 144;
  const [velocity, setVelocity] = useState(500); //  pixels/sec
  const acceleration = 100; // pixels/sec^2
  const [time, setTime] = useState(0);
  const [runsim, setRunsim] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("click", reset);

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
      }, 1000 / fps);
      return () => {
        clearInterval(interval);
        window.removeEventListener("click", reset);
      };
    }
  });

  function reset() {
    setRunsim(true);
    setPosition(initial_position);
    setVelocity(velocity);
    setTime(0);
  }

  // const mouse = useMousePosition
  return (
    <div className={styles.container}>
      <Input
        type="range"
        className={styles.slider}
        max={1000}
        min={0}
        onChange={(event) => setVelocity(parseInt(event.target.value))}
      />
      <Button onClick={reset} className={styles.button}>
        SHOOT
      </Button>
      <Cannonball
        color={StandardColors.ColorPurple80}
        size={50}
        position={position}
      />
      <img
        src={cannon}
        className={styles.cannon}
        style={{
          transform: `rotate(${angle}rad)`,
        }}
      />
      {/* <h1>img src={cannon}</h1> */}
      <>
        {useMousePosition().x},{useMousePosition().y}
      </>
    </div>
  );
}

const styles = {
  container: style({
    backgroundColor: StandardColors.ColorGreen80,
    width: "100%",
    height: "100%",
    color: StandardColors.ColorBlue80,
    position: "absolute",
  }),
  slider: style({
    backgroundColor: StandardColors.ColorBlack,
    width: "10%",
    height: "10%",
    color: StandardColors.ColorRed05,
    position: "absolute",
    borderRadius: "20%",
    top: "15%",
    left: "5%",
  }),
  button: style({
    position: "absolute",
    top: "5%",
    left: "5%",
  }),
  cannon: style({
    width: "150px",
    position: "absolute",
    top: "550px",
    left: "20px",
  }),
};
