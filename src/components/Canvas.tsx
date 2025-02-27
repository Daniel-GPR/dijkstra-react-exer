import { style } from "typestyle";
import { StandardColors } from "../styles";
import { CannonballClass } from "./CannonBallClass";
import { use, useEffect, useState } from "react";
import { Position } from "../models";
import { Button, Input } from "reactstrap";
import useMousePosition from "../hooks/UseMousePosition";
import cannon from "../graphics/cannon2.svg";
import { useMousePositionClick } from "../hooks/UseMousePosition";
import { styles } from "../styles/Styles";
import { Person } from "./TestClass";
import { Cannonball, CannonballProps } from "./Cannonball";
import { CanoniPhysics } from "./CannonPhysics";

export function Canvas() {
  const [runSim, setRunSim] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [angle, setAngle] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const [balls, setBalls] = useState<CannonballClass[]>([]);
  const mousePosition = useMousePosition();
  const mousePositionClick = useMousePositionClick();
  const [size, setSize] = useState<number>(30);
  const fps = 60;
  const ms = 1000 / fps;
  const [stoppedBalls, setStoppedBalls] = useState<CannonballClass[]>([])

  useEffect(() => {
    if (runSim) {
      const interval = setTimeout(() => {
        setTime(time + ms);
        balls.forEach((ball) => CanoniPhysics(time, ball));
      }, ms);
    }
  }, [runSim, time]);

  // Kanoni rotate
  useEffect(() => {
    setTimeout(() => {
      setAngle(
        Math.atan2(
          (0.9 * window.innerHeight - mousePosition[1]) /
            (0.9 * window.innerHeight),
          (mousePosition[0] - 0.1 * window.innerWidth) /
            (0.9 * window.innerWidth),
        ),
      );
    }, 30);
  }, [mousePosition]);

  // Kanoni fire
  useEffect(() => {
    if (clickCount != 0) {
      setRunSim(true);
      const newBall = new CannonballClass(
        time,
        {
          color: StandardColors.ColorBlue70,
          size: size,
          position: {
            x:
              0.9 * window.innerWidth -
              0.13 * window.innerWidth * Math.cos(angle),
            y:
              0.88 * window.innerHeight -
              0.13 * window.innerWidth * Math.sin(angle),
          },
        },
        [
          -(
            (mousePositionClick[0] - 0.11 * window.innerWidth) /
            window.innerWidth
          ) * 400,
          -(
            (0.88 * window.innerHeight - mousePositionClick[1]) /
            window.innerHeight
          ) * 400,
        ],
      );
      setBalls((prevBalls) => [...prevBalls, newBall]);
    }

    setClickCount(clickCount + 1);
  }, [mousePositionClick]);

  return (
    <div className={styles.container}>
      {/* <div className={styles.inputsContainer}>
        <Input
          className={styles.input}
          type="range"
          min={10}
          max={100}
          onChange={(event) => setSize(parseInt(event.target.value))}
        />
      </div> */}
      <img
        src={cannon}
        className={styles.cannon}
        alt="Dynamic Rotation"
        style={{
          transform: `rotate(${0.5 - angle}rad)`,
          transformOrigin: "45% 54%",
        }}
      />
            {stoppedBalls &&
        stoppedBalls.map((element, index) => (
          <Cannonball key={index} {...element.props} />
        ))}
      {balls &&
        balls.map((element, index) => (
          <Cannonball key={index} {...element.props} />
        ))}
    </div>
  );
}

function getElementsByTagName(arg0: string) {
  throw new Error("Function not implemented.");
}
