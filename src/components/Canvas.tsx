import { style } from "typestyle";
import { StandardColors } from "../styles";
import { Cannonball } from "./Cannonball";
import { useEffect, useState } from "react";
import { Position, Vector } from "../models";
import { Button, Input } from "reactstrap";
import useMousePosition from "../hooks/UseMousePosition";
import cannon from "S:/Git/Saligaryan/dijkstra-react-exer/src/graphics/cannon.svg";

export function Canvas() {
  const tan = (useMousePosition().y - 550) / (useMousePosition().x - 20);
  const angle = Math.atan(tan);
  const initial_position = { x: 50, y: 20 };
  const [position, setPosition] = useState<Position>(initial_position);
  const fps = 60;
  const [initial_velocity, setInitial_velocity] = useState<Vector>({
    x: 500,
    y: 500,
  });
  const [velocity, setVelocity] = useState<Vector>({ ...initial_velocity }); //  pixels/sec
  const acceleration: Vector = { x: 0, y: -100 }; // pixels/sec^2
  const [size, setSize] = useState<number>(50);
  // const [time, setTime] = useState(0);
  const timestep = 1 / fps;
  const [runsim, setRunsim] = useState<boolean>(false);

  useEffect(() => {
    // window.addEventListener("click", resetcannon);
    // console.log("update");

    if (runsim == true) {
      const interval = setInterval(() => {
        setVelocity({
          x: velocity.x + acceleration.x * timestep,
          y: velocity.y + acceleration.y * timestep,
        });
        setPosition({
          x: position.x + velocity.x * timestep,
          y: position.y + velocity.y * timestep,
        });
        // console.log(initial_velocity, velocity);
        // setTime(time + 1 / fps);
      }, 1000 / fps);
      return () => {
        clearInterval(interval);
        // window.removeEventListener("click", resetcannon);
      };
    }
  });

  function resetcannon() {
    // console.log(initial_velocity);
    setPosition({ ...initial_position });
    setVelocity({ ...initial_velocity });
    setRunsim(true);

    // console.log("reset");
    // setTime(0);
  }

  // const mouse = useMousePosition
  return (
    <div className={styles.container}>
      <Input
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
        onChange={(event) =>
          setInitial_velocity({
            ...initial_velocity,
            y: parseInt(event.target.value),
          })
        }
      />
      <Input
        type="range"
        className={styles.slider3}
        max={200}
        min={10}
        onChange={(event) => setSize(parseInt(event.target.value))}
      />
      <Button onClick={resetcannon} className={styles.button}>
        SHOOT
      </Button>
      <Cannonball
        color={StandardColors.ColorPurple80}
        size={size}
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
  cannon: style({
    width: "150px",
    position: "absolute",
    top: "550px",
    left: "20px",
  }),
};
