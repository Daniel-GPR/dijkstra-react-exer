import { createContext, useContext, useState } from "react";
import { Position, Vector } from "../models";
import { CannonMaster } from "../models/CannonContext";
import { generateUuid, randomIntFromInterval } from "../utils";
import * as _ from "lodash";

import { PrimaryColors, randColorFromPallete } from "../styles";

export interface ControlDataContext {
  isPaused: boolean;
  setIsPaused: (newVal: boolean) => void;
  mass: number;
  setMass: (newVal: number) => void;
  position: Position;
  setPosition: (newVal: Position) => void;
  velocity: Vector;
  setVelocity: (newVal: Vector) => void;
  elasticity: number;
  setElasticity: (newVal: number) => void;
  size: number;
  setSize: (newSize: number) => void;
  addCannon: () => void;
  cannonMaster: CannonMaster;
}

const ControlContext = createContext<ControlDataContext>({
  isPaused: true,
} as ControlDataContext);

export function useControl() {
  return useContext(ControlContext);
}

export function ControlProvider(props: { children: React.ReactNode }) {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [position, setPosition] = useState<Position>({ x: 30, y: 30 });
  const [velocity, setVelocity] = useState<Vector>({ x: 60, y: 50 });
  const [mass, setMass] = useState<number>(1);
  const [elasticity, setElasticity] = useState<number>(0.75);
  const [size, setSize] = useState<number>(20);
  const [cannonMaster] = useState<CannonMaster>(new CannonMaster({ fps: 120 }));

  function addCannon() {
    const cannonBall = {
      ...cannonMaster.defaultCannon,
      id: generateUuid(),
      color: randColorFromPallete(Object.values(PrimaryColors), 30),
      size: size,
      position,
      velocity: {
        x: randomIntFromInterval(-200, 200),
        y: randomIntFromInterval(0, 200),
      },
      mass: (size * Math.PI * Math.pow(size / 2, 2)) / 1000,
      elasticity,
    };
    console.log(cannonBall);
    cannonMaster.createCannonBall(_.cloneDeep(cannonBall));
  }

  return (
    <ControlContext.Provider
      value={{
        isPaused,
        setIsPaused,
        position,
        setPosition,
        velocity,
        setVelocity,
        mass,
        setMass,
        elasticity,
        setElasticity,
        size,
        setSize,
        addCannon,
        cannonMaster,
      }}
    >
      {props.children}
    </ControlContext.Provider>
  );
}
