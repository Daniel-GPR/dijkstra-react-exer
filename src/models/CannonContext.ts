import { CannonBallProps } from "../components/CannonBall";
import { StandardColors } from "../styles";
import { generateUuid } from "../utils";
import { addVectors, divideVector, isZeroVector } from "../utils/PhysicsUtils";
import { Vector } from "./Vector";

enum CollisionPlane {
  Top = "Top",
  Bottom = "Bottom",
  Left = "Left",
  Right = "Right",
}

interface CannonContextProps {
  fps: number;
}

export class CannonMaster {
  gravity: Vector = { x: 0, y: -980 };
  floorFriction: number = 5;
  cannonInstances: CannonBallProps[] = [];
  fps: number = 60;
  updateTickRate: number = 1000 / this.fps;
  constantWorldForces: Vector[] = [this.gravity];

  static velocityThreshold = 300;

  defaultCannon: CannonBallProps = {
    id: generateUuid(),
    size: 40,
    color: StandardColors.ColorOrange60,
    position: { y: 100, x: 100 },
    velocity: { y: 700, x: -400 },
    mass: 2,
    elasticity: 0.4, // between 0-1 with 1 being fully elastic
  };

  constructor(props: CannonContextProps) {
    this.fps = props.fps;
    this.updateTickRate = 1000 / props.fps;
    this.#init();
  }

  // runs on every tick
  runUpdate() {
    this.updateAllCannonValues();
  }

  updateAllCannonValues(): void {
    this.cannonInstances.forEach((inst) => {
      if (this.isStationary(inst)) {
        return; // don't update if object is stationary
      }
      this.updateCannonValues(inst);
    });
  }

  isStationary(cannon: CannonBallProps) {
    return isZeroVector(cannon.velocity);
  }

  normalizeForceVector(v: Vector): Vector {
    return divideVector(v, this.fps);
  }

  updateCannonValues(cannonInstance: CannonBallProps): void {
    const colPlane = this.checkCollisionWithWalls(cannonInstance);

    cannonInstance.position = addVectors(
      this.normalizeForceVector(cannonInstance.velocity),
      cannonInstance.position,
    );

    const needsJitterCorrection =
      Math.abs(cannonInstance.velocity.y) < 1 &&
      colPlane.includes(CollisionPlane.Bottom);

    this.applyConstantWorldForcesToCannon(cannonInstance);

    if (needsJitterCorrection) {
      cannonInstance.velocity.y = 0;
    }
  }

  applyConstantWorldForcesToCannon(cannonInstance: CannonBallProps): void {
    this.constantWorldForces.forEach((force) => {
      cannonInstance.velocity = addVectors(
        cannonInstance.velocity,
        this.normalizeForceVector(force),
      );
    });
  }

  #init() {
    this.createCannonBall(this.defaultCannon);
  }

  createCannonBall(canonProps: CannonBallProps): void {
    this.cannonInstances.push(canonProps);
  }

  getCannonRadius(cannonBall: CannonBallProps) {
    return cannonBall.size / 2;
  }

  checkCollisionWithWalls(cannonBall: CannonBallProps): CollisionPlane[] {
    const collisionPlanes = this.collisionWithWall(cannonBall);
    if (collisionPlanes.length) {
      this.updateVelocityOnColission(cannonBall, collisionPlanes);
    }

    return collisionPlanes;
  }

  updateVelocityOnColission(
    cannonBall: CannonBallProps,
    collisionPlanes: CollisionPlane[],
  ) {
    // top or bottom
    if (
      collisionPlanes.includes(CollisionPlane.Bottom) ||
      collisionPlanes.includes(CollisionPlane.Top)
    ) {
      cannonBall.velocity.y = -this.getVelocityAfterLoss(
        cannonBall.velocity.y,
        cannonBall,
      );

      if (
        cannonBall.position.y == this.getCannonRadius(cannonBall) &&
        cannonBall.velocity.y <
          CannonMaster.velocityThreshold * cannonBall.elasticity
      ) {
        cannonBall.velocity.y = 0;
      }
      // need to apply this, so that ball doesn't keep rolling indefinitely
      this.updateForRollVelocity(cannonBall);
    }

    //left or right
    if (
      collisionPlanes.includes(CollisionPlane.Left) ||
      collisionPlanes.includes(CollisionPlane.Right)
    ) {
      cannonBall.velocity.x = -this.getVelocityAfterLoss(
        cannonBall.velocity.x,
        cannonBall,
      );
    }
  }

  getVelocityAfterLoss(vel: number, cannonBall: CannonBallProps) {
    return vel * Math.min(1, cannonBall.elasticity);
  }

  updateForRollVelocity(cannonBall: CannonBallProps): void {
    cannonBall.velocity.x = Math.max(
      0,
      cannonBall.velocity.x - this.floorFriction,
    );
  }

  // returns true if cannonball is colliding with wall
  collisionWithWall(cannonBall: CannonBallProps): CollisionPlane[] {
    // check vertical
    const collisionPlanes: CollisionPlane[] = [];

    if (
      window.innerHeight <=
      this.getCannonRadius(cannonBall) + cannonBall.position.y
    ) {
      collisionPlanes.push(CollisionPlane.Top);
      cannonBall.position.y =
        window.innerHeight - this.getCannonRadius(cannonBall);
    }

    if (cannonBall.position.y - this.getCannonRadius(cannonBall) <= 0) {
      collisionPlanes.push(CollisionPlane.Bottom);
      cannonBall.position.y = this.getCannonRadius(cannonBall);
    }

    if (
      window.innerWidth <=
      this.getCannonRadius(cannonBall) + cannonBall.position.x
    ) {
      collisionPlanes.push(CollisionPlane.Right);
      cannonBall.position.x =
        window.innerWidth - this.getCannonRadius(cannonBall);
    }
    if (cannonBall.position.x - this.getCannonRadius(cannonBall) <= 0) {
      collisionPlanes.push(CollisionPlane.Left);
      cannonBall.position.x = this.getCannonRadius(cannonBall);
    }

    return collisionPlanes;
  }
}
