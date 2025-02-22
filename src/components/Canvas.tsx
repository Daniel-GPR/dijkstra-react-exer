import { style } from "typestyle";
import { StandardColors } from "../styles";
import { Cannonball, CannonballProps } from "./Cannonball";
import { use, useEffect, useState } from "react";
import { Position } from "../models";
import { Button, Input } from "reactstrap";
import useMousePosition from "../hooks/UseMousePosition";

export function Canvas() {
  const [runSim, setRunSim] = useState<boolean>(false);
  const [initVel, setinitVel] = useState<[number, number]>([0, 0]);
  const [cannonProps, setCannonProps] = useState<CannonballProps[]>([
    {
      color: StandardColors.ColorBlue10,
      size: 30,
      position: { x: 435, y: 120 },
    },
  ]);
  const [vel, setVel] = useState<[number, number]>(initVel);

  const fps = 60;
  const ms = 1000 / fps;
  const g = 9.81;
  // const cd = 0.04;
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (runSim) {
      const interval = setTimeout(() => {
        setTime(time + ms);
        CanoniPhysics(time);
      }, ms);
    }
  }, [runSim, time]);

  function CanoniPhysics(time: number) {
    let { position, color, size } = cannonProps[cannonProps.length - 1];

    const cd = size / 1000;

    setVel([vel[0] * (1 - cd), vel[1] * (1 - cd)]);

    position.x = position.x + (vel[0] * time) / 1000;
    position.y =
      position.y + +(vel[1] * time) / 1000 + 0.5 * g * (time / 1000) ** 2;

    const colorNum = 10 * Math.trunc((10 * position.y) / window.innerHeight);
    color =
      StandardColors[("ColorBlue" + colorNum) as keyof typeof StandardColors];

    const hasHitFloor = position.y + size >= window.innerHeight;

    if (hasHitFloor) {
      position.y = window.innerHeight - size;
      setRunSim(false);
    }
    if (position.x + size >= window.innerWidth) {
      position.x = window.innerWidth - size;
    }

    cannonProps[cannonProps.length - 1].position = position;
    cannonProps[cannonProps.length - 1].color = color;

    if (hasHitFloor) {
      setCannonProps([
        ...cannonProps,
        {
          color: StandardColors.ColorBlue10,
          size: 30,
          position: { x: 435, y: 120 },
        },
      ]);
      setTime(0);
      setVel(initVel);
    } else {
      setCannonProps([...cannonProps]);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.inputsContainer}>
        <h1 className={styles.headers}>
          {" "}
          <center>PP size</center>{" "}
        </h1>
        <Input
          type="range"
          name="range"
          min="20"
          max="80"
          onChange={(event) => {
            cannonProps[cannonProps.length - 1].size = parseInt(
              event.target.value,
            );
            setCannonProps([...cannonProps]);
          }}
        />
        <h1 className={styles.headers}>
          {" "}
          <center>Taxhthta</center>{" "}
        </h1>
        <Input
          type="range"
          name="range"
          min="10"
          max="10000"
          onChange={(event) => {
            setinitVel(parseInt(event.target.value));
          }}
        />
        <Button
          color="primary"
          className={styles.button}
          onClick={() => {
            setRunSim(!runSim);
          }}
        >
          Kanoni FUCk yeah
        </Button>
      </div>

      <img className={styles.image} src="s-l400-removebg-preview.png" />
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
};
function getElementsByTagName(arg0: string) {
  throw new Error("Function not implemented.");
}
