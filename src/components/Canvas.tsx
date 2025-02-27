import { style } from "typestyle";
import { StandardColors } from "../styles";
import { Cannonball, CannonballProps } from "./Cannonball";
import { useEffect, useState } from "react";
import { Vector } from "../models";
import { Button, Input } from "reactstrap";
import useMousePosition from "../hooks/UseMousePosition";
import cannon from "./cannon.svg";
import { Cannon, defaultCannonball } from "./Cannon";

export function Canvas() {
  const tan: number =
    (useMousePosition().y - 550) / (useMousePosition().x - 20);
  const angle: number = Math.atan(tan);
  const dist: Vector = {
    x: useMousePosition().x - 20,
    y: -(useMousePosition().y - 550),
  };
  const [runsim, setRunsim] = useState<boolean>(false);
  const [cannonball, setCannonball] =
    useState<CannonballProps>(defaultCannonball());
  const [cannonState, setCannonState] = useState<Cannon>(new Cannon([]));

  const [run, setRun] = useState<boolean>(true);

  useEffect(() => {
    const handleClick = () => {
      resetcannon();
      setCannonball({ ...defaultCannonball(), velocity: dist });
      cannonState.createCannonball(cannonball);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  });

  useEffect(() => {
    // console.log("update");

    if (runsim == true) {
      const interval = setInterval(() => {
        cannonState.updateValues();
        setRun(!run);
      }, 1000 / cannonState.fps);
      return () => {
        clearInterval(interval);
      };
    }
  }, [run, runsim]);

  function resetcannon() {
    setRunsim(true);
  }

  // const mouse = useMousePosition
  return (
    <div className={styles.container}>
      {/* <Input
        type="range"
        className={styles.slider1}
        max={1000}
        min={0}
        onChange={(event) =>
          setInitial_velocity({
            ...initial_velocity,
            x: parseInt(event.target.value),
          })
        }
      />
      <Input
        type="range"
        className={styles.slider2}
        max={1000}
        min={0}
        value={initial_velocity.y}
        onChange={(event) =>
          setInitial_velocity({
            ...initial_velocity,
            y: parseInt(event.target.value),
          })
        }
      /> */}
      <Input
        type="range"
        className={styles.slider2}
        max={200}
        min={10}
        value={cannonball.size}
        onChange={(event) =>
          setCannonball({
            ...defaultCannonball(),
            size: parseInt(event.target.value),
          })
        }
      />
      <Button
        onClick={() => {
          resetcannon();
          cannonState.createCannonball(defaultCannonball());
        }}
        className={styles.button}
      >
        SHOOT
      </Button>
      {cannonState.cannonballs.map((cannonProps, index) => (
        <Cannonball key={index} {...cannonProps} />
      ))}

      <Button onClick={() => cannonState.gravity()} className={styles.button2}>
        Gravity
      </Button>
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
  slider1: style({
    backgroundColor: StandardColors.ColorBlack,
    width: "10%",
    height: "10%",
    color: StandardColors.ColorRed05,
    position: "absolute",
    borderRadius: "20%",
    top: "15%",
    left: "5%",
  }),
  slider2: style({
    backgroundColor: StandardColors.ColorBlack,
    width: "10%",
    height: "10%",
    color: StandardColors.ColorRed05,
    position: "absolute",
    borderRadius: "20%",
    top: "25%",
    left: "5%",
  }),
  slider3: style({
    backgroundColor: StandardColors.ColorBlack,
    width: "10%",
    height: "10%",
    color: StandardColors.ColorRed05,
    position: "absolute",
    borderRadius: "20%",
    top: "35%",
    left: "5%",
  }),
  button: style({
    position: "absolute",
    top: "5%",
    left: "5%",
  }),
  button2: style({
    position: "absolute",
    top: "15%",
    left: "5%",
  }),
  cannon: style({
    width: "150px",
    position: "absolute",
    top: "550px",
    left: "20px",
  }),
};
