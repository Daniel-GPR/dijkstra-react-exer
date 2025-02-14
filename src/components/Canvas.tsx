import { style } from "typestyle";
import { StandardColors } from "../styles";
import { Cannonball } from "./Cannonball";
import { runUpdate } from "../utils/timeutils";
import { useEffect, useState } from "react";
import { Position } from "../models";

export function Canvas() {
  const [position, setPosition] = useState<Position>({ x: 435, y: 120 });
  const [runSim, setRunSim] = useState<boolean>(false);
  const [currentVelocity, setCurrentVelocity] = useState<number>(20);

  const fps = 30;
  const ms = 1000 / fps;
  const g = 10;
  const aero = 0.4;

  useEffect(() => {
    if (runSim) {
      const interval = setInterval(() => {
        CanoniPhysics();
      }, ms);

      return () => clearInterval(interval);
    }
  }, [runSim, currentVelocity]);

  useEffect(() => {
    let vel = 0;
    if (currentVelocity - aero > 0) {
      vel = currentVelocity - aero;
    } else vel = 0;
    setCurrentVelocity(vel);
  }, [position]);

  function CanoniPhysics() {
    position.x = position.x + currentVelocity;
    position.y = position.y + g;

    setPosition({ ...position });
  }

  return (
    <div className={styles.container}>
      <button onClick={() => setRunSim(!runSim)}>KANONI</button>
      <img className={styles.image} src="s-l400-removebg-preview.png" />
      <Cannonball
        color={StandardColors.ColorBlack}
        size={50}
        position={position}
      />
    </div>
  );
}

const styles = {
  container: style({
    backgroundColor: StandardColors.ColorGreen70,
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
};
