import { StandardColors } from "../styles/Colors";
import { addVectors, divVector } from "../utils/VectorUtils";
import { CannonballProps } from "./Cannonball";

// const colors = Object.values(StandardColors);
// const randomColor = colors[Math.floor(Math.random() * colors.length)];
export function defaultCannonball(): CannonballProps {
  const colors = Object.values(StandardColors);
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return {
    color: randomColor,
    size: 50,
    position: { x: 20, y: 20 },
    velocity: { x: 200, y: 200 },
    acceleration: { x: 0, y: 0 },
  };
}
// const defaultCannonball: CannonballProps = {
//   color: randomColor,
//   size: 50,
//   position: { x: 20, y: 20 },
//   velocity: { x: 200, y: 200 },
//   acceleration: { x: 0, y: 0 },
// };
export class Cannon {
  cannonballs: CannonballProps[] = [defaultCannonball()];
  fps: number = 60;

  constructor(cannonballs: CannonballProps[]) {
    this.cannonballs = cannonballs;
  }

  move(cannonball: CannonballProps): void {
    cannonball.velocity = addVectors(
      cannonball.velocity,
      cannonball.acceleration,
    );
    const movement = divVector(cannonball.velocity, this.fps);
    cannonball.position = addVectors(cannonball.position, movement);
  }

  checkBorder(cannonball: CannonballProps): void {
    if (
      Math.abs(cannonball.position.x - window.innerWidth) < cannonball.size ||
      cannonball.position.x < 0
    ) {
      cannonball.velocity.x *= -1;
    }
    if (
      Math.abs(cannonball.position.y - window.innerHeight) < cannonball.size ||
      cannonball.position.y < 0
    ) {
      cannonball.velocity.y *= -1;
    }
  }

  gravity(): void {
    const g = 9.81;
    const density = 0.0005;
    this.cannonballs.forEach((cannonball) => {
      const area = Math.PI * (cannonball.size / 2) ** 2;
      const mass = density * area;
      cannonball.acceleration.y = -mass * g;
    });
  }

  createCannonball(cannon?: CannonballProps): void {
    if (cannon) {
      this.cannonballs.push({ ...cannon });
    } else {
      this.cannonballs.push(defaultCannonball());
    }
  }

  updateValues(): void {
    this.cannonballs.forEach((cannonball) => {
      this.checkBorder(cannonball);
      this.move(cannonball);
    });
  }
}
