import { style } from "typestyle";
import { StandardColors } from "../styles";
import { Cannonball, CannonballProps } from "./Cannonball";
import { use, useEffect, useState } from "react";
import { Position } from "../models";
import { Button, Input } from "reactstrap";
import useMousePosition from "../hooks/UseMousePosition";
import cannon from "../graphics/cannon2.svg";
import { useMousePositionClick } from "../hooks/UseMousePosition";

export function Canvas() {
  const [runSim, setRunSim] = useState<boolean>(false);
  const [cannonProps, setCannonProps] = useState<CannonballProps[]>([
    {
      color: StandardColors.ColorBlue10,
      size: 30,
      position: { x: 0.92 * window.innerWidth, y: 0.9 * window.innerHeight },
    },
  ]);
  const [time, setTime] = useState<number>(0);
  const [vel, setVel] = useState<[number, number]>([0, 0]);
  const [angle, setAngle] = useState<number>(0);

  const mousePosition = useMousePosition();
  const mousePositionClick = useMousePositionClick();

  const fps = 60;
  const ms = 1000 / fps;
  const g = 9.81;
  // const cd = 0.04;

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
    setAngle((Math.atan(mousePosition[1] / mousePosition[0]) * 180) / Math.PI);
    console.log(mousePosition);
  }, [mousePosition]);

  // Kanoni fire
  useEffect(() => {
    setVel([
      -(mousePositionClick[0] / window.innerWidth) * 100,
      -((window.innerHeight - mousePositionClick[1]) / window.innerHeight) *
        100,
    ]);
    setRunSim(true);
  }, [mousePositionClick]);

  function CanoniPhysics(time: number) {
    let { position, color, size } = cannonProps[cannonProps.length - 1];

    const cd = [0.001 * vel[0] ** 2, 0.001 * vel[1] ** 2];

    setVel([vel[0] * (1 - cd[0]), vel[1] * (1 - cd[1])]);

    position.x = position.x + (vel[0] * time) / 1000;
    position.y =
      position.y + (vel[1] * time) / 1000 + 0.5 * g * (time / 1000) ** 2;

    const colorNum = 10 * Math.trunc((10 * position.y) / window.innerHeight);
    color =
      StandardColors[("ColorBlue" + colorNum) as keyof typeof StandardColors];

    const hasHitFloor = position.y + size >= window.innerHeight;
    const hasHitTop = position.y - size <= 0;
    const hasHitWall = position.x + size <= 0;
    console.log(position.x);

    if (hasHitWall) {
      position.x = 0;
      setVel([0, 0]);
    }

    cannonProps[cannonProps.length - 1].position = position;
    cannonProps[cannonProps.length - 1].color = color;

    if (hasHitTop) {
      setVel([vel[0], -vel[1]]);
    }
    if (hasHitFloor) {
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
        style={{ transform: `rotate(${angle - 60}deg)` }}
      />
      {cannonProps && cannonProps.map((element) => <Cannonball {...element} />)}
    </div>
  );
}

const styles = {
  container: style({
    backgroundColor: StandardColors.ColorGreen20,
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
    fontSize: 30,
    color: `${StandardColors.ColorPink90} !important`,
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
    top: "78%",
    right: "82%",
  }),
};
function getElementsByTagName(arg0: string) {
  throw new Error("Function not implemented.");
}
