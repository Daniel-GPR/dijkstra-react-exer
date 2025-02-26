import { style } from "typestyle";
import { StandardColors } from "../styles";
import { CannonballClass, CannonballProps } from "./CannonBallClass";
import { use, useEffect, useState } from "react";
import { Position } from "../models";
import { Button, Input } from "reactstrap";
import useMousePosition from "../hooks/UseMousePosition";
import cannon from "../graphics/cannon2.svg";
import { useMousePositionClick } from "../hooks/UseMousePosition";
import { styles } from "../styles/Styles";
import { Person } from "./TestClass";
import { Cannonball } from "./Cannonball";

export function Canvas() {
  const zisis = new Person("zisi-san", 40);

  const [cannonProps, setCannonProps] = useState<CannonballProps[]>([
    {
      color: StandardColors.ColorTransparent,
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
    setCannonProps([
      ...cannonProps,
      {
        color: StandardColors.ColorBlue70,
        size: 30,
        position: {
          x:
            0.9 * window.innerWidth -
            0.13 * window.innerWidth * Math.cos(angle),
          y:
            0.88 * window.innerHeight -
            0.13 * window.innerWidth * Math.sin(angle),
        },
      },
    ]);

    setVel([
      -(
        (mousePositionClick[0] - 0.11 * window.innerWidth) /
        window.innerWidth
      ) * 50,
      -(
        (0.88 * window.innerHeight - mousePositionClick[1]) /
        window.innerHeight
      ) * 50,
    ]);
    setClickCount(clickCount + 1);
    if (clickCount >= 1) {
      setRunSim(true);
    }
  }, [mousePositionClick]);

  function CanoniPhysics(time: number) {
    let { position, color, size } = cannonProps[cannonProps.length - 1];

    const cd = [0.0001 * vel[0] ** 2, 0.0001 * vel[1] ** 2];

    setVel([vel[0] * (1 - cd[0]), vel[1] * (1 - cd[1])]);

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
      position.x = size;
      setVel([-0.8 * vel[0], vel[1]]);
    }

    if (hasHitLeftWall) {
      position.x = window.innerWidth;
      setVel([-0.8 * vel[0], vel[1]]);
    }
    cannonProps[cannonProps.length - 1].position = position;
    cannonProps[cannonProps.length - 1].color = color;

    if (hasHitTop) {
      position.y = size;
      setVel([vel[0], -0.8 * vel[1]]);
    }

    if (hasHitFloor && Math.abs(vel[0]) < 0.1) {
      setCannonProps([
        ...cannonProps,
        {
          color: StandardColors.ColorBlue70,
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
      console.log("mamamia");
      position.y = window.innerHeight - size;
      setVel([vel[0], -0.8 * vel[1]]);
      setCannonProps([...cannonProps]);
    } else {
      setCannonProps([...cannonProps]);
    }

    if (time > 5000) {
      window.alert("Runtime limit Exeded");
      setRunSim(false);
      setTime(0);
      setCannonProps([
        ...cannonProps,
        {
          color: StandardColors.ColorBlue70,
          size: 30,
          position: {
            x: 0.92 * window.innerWidth,
            y: 0.9 * window.innerHeight,
          },
        },
      ]);
    }
  }

  return (
    <div className={styles.container}>
      <Button
        className={styles.button}
        onClick={() => {
          setVel([0, 0]);
          setRunSim(false);
          setClickCount(0);
        }}
      >
        {" "}
        Stop Sim
      </Button>
      <Button
        className={styles.button}
        onClick={() => {
          setCannonProps([
            {
              color: StandardColors.ColorTransparent,
              size: 30,
              position: {
                x: 0.92 * window.innerWidth,
                y: 0.9 * window.innerHeight,
              },
            },
          ]);
          setClickCount(0);
          setRunSim(false);
        }}
      >
        Clear Balls
      </Button>
      <img
        src={cannon}
        className={styles.cannon}
        alt="Dynamic Rotation"
        style={{
          transform: `rotate(${0.5 - angle}rad)`,
          transformOrigin: "45% 54%",
        }}
      />
      {cannonProps && cannonProps.map((element) => <Cannonball {...element} />)}
    </div>
  );
}

function getElementsByTagName(arg0: string) {
  throw new Error("Function not implemented.");
}
