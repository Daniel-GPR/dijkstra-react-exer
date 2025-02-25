import { style } from "typestyle";
import { StandardColors } from "../styles";
import { Cannonball, CannonballProps } from "./Cannonball";
import { use, useEffect, useState } from "react";
import { Position } from "../models";
import { Button, Input } from "reactstrap";
import useMousePosition from "../hooks/UseMousePosition";
import cannon from "../graphics/cannon2.svg";
import { useMousePositionClick } from "../hooks/UseMousePosition";
import { styles } from "../styles/Styles";

export function Canvas() {
  const [cannonProps, setCannonProps] = useState<CannonballProps[]>([
    {
      color: StandardColors.ColorBlue10,
      size: 30,
      position: { x: 0.92 * window.innerWidth, y: 0.9 * window.innerHeight },
    },
  ]);

  const [runSim, setRunSim] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [vel, setVel] = useState<[number, number]>([0, 0]);
  const [angle, setAngle] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);

  const mousePosition = useMousePosition();
  const mousePositionClick = useMousePositionClick();

  const fps = 60;
  const ms = 1000 / fps;
  const g = 9.81;

  useEffect(() => {
    if (runSim) {
      const interval = setTimeout(() => {
        setTime(time + ms);
        CanoniPhysics(time);
      }, ms);
    }
  }, [runSim, time]);

  // Kanoni rotate
  useEffect(() => {
    setAngle(
      Math.atan2(
        (0.9 * window.innerHeight - mousePosition[1]) /
          (0.9 * window.innerHeight),
        (mousePosition[0] - 0.1 * window.innerWidth) /
          (0.9 * window.innerWidth),
      ),
    );
    if (time > 3000) {
      setRunSim(false);
      setTime(0);
    }
  }, [mousePosition]);

  // Kanoni fire
  useEffect(() => {
    setVel([
      -(mousePositionClick[0] / window.innerWidth) * 50,
      -((window.innerHeight - mousePositionClick[1]) / window.innerHeight) * 50,
    ]);
    setClickCount(clickCount + 1);
    if (clickCount >= 1) {
      setRunSim(true);
    }
  }, [mousePositionClick]);

  function CanoniPhysics(time: number) {
    let { position, color, size } = cannonProps[cannonProps.length - 1];

    const cd = [0.0001 * vel[0] ** 2, 0.0001 * vel[1] ** 2];

    // setVel([vel[0] * (1 - cd[0]), vel[1] * (1 - cd[1])]);

    position.x = position.x + (vel[0] * time) / 1000;
    position.y =
      position.y + (vel[1] * time) / 1000 + 0.5 * g * (time / 1000) ** 2;

    const colorNum = 10 * Math.trunc((10 * position.y) / window.innerHeight);
    color =
      StandardColors[("ColorBlue" + colorNum) as keyof typeof StandardColors];

    const hasHitFloor = position.y + size >= window.innerHeight;
    const hasHitTop = position.y - size <= 0;
    const hasHitRightWall = position.x - size <= 0;
    const hasHitLeftWall = position.x + size >= window.innerWidth;

    // console.log(position.x, position.y, "mama mia");

    if (hasHitRightWall) {
      position.x = 0;
      setVel([-0.8 * vel[0], vel[1]]);
    }

    if (hasHitLeftWall) {
      position.x = window.innerWidth;
      setVel([-0.8 * vel[0], vel[1]]);
    }
    // cannonProps[cannonProps.length - 1].position = position;
    // cannonProps[cannonProps.length - 1].color = color;

    if (hasHitTop) {
      position.y = 0;
      setVel([vel[0], -0.8 * vel[1]]);
    }

    if (hasHitFloor && vel[0] < 0.1) {
      setCannonProps([
        ...cannonProps,
        {
          color: StandardColors.ColorBlue10,
          size: 30,
          position: {
            x: 0.92 * window.innerWidth,
            y: 0.9 * window.innerHeight,
          },
        },
      ]);
      position.y = window.innerHeight - size;
      setRunSim(false);
      setTime(0);
    } else if (hasHitFloor) {
      position.y = window.innerHeight - size;
      setVel([vel[0], -0.8 * vel[1]]);
      setCannonProps([...cannonProps]);
    } else {
      setCannonProps([...cannonProps]);
    }
  }

  return (
    <div className={styles.container}>
      <img
        src={cannon}
        className={styles.cannon}
        alt="Dynamic Rotation"
        style={{ transform: `rotate(${0.5 - angle}rad)` }}
      />
      {cannonProps && cannonProps.map((element) => <Cannonball {...element} />)}
    </div>
  );
}

function getElementsByTagName(arg0: string) {
  throw new Error("Function not implemented.");
}
