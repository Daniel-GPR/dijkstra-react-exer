import { CannonballClass } from "./CannonBallClass";
import { use, useEffect, useState } from "react";
import { StandardColors } from "../styles";

export function CanoniPhysics(currentTime: number, ball: CannonballClass) {
  let { position, color, size } = ball.props;
  let vel = ball.vel;
  let time = currentTime - ball.launchTime;

  const g = 0.981;
  const cd = [0.00001 * vel[0] ** 2, 0.00001 * vel[1] ** 2];

  vel = [vel[0] * (1 - cd[0]), (vel[1] + (g * time) / 1000) * (1 - cd[1])];

  position.x = position.x + (vel[0] * time) / 1000;
  position.y = position.y + (vel[1] * time) / 1000;

  // const colorNum = 10 * Math.trunc((10 * position.y) / window.innerHeight);
  // color =
  //   StandardColors[("ColorBlue" + colorNum) as keyof typeof StandardColors];

  const hasHitFloor = position.y + size >= window.innerHeight;
  const hasHitTop = position.y - size <= 0;
  const hasHitRightWall = position.x - size <= 0;
  const hasHitLeftWall = position.x + size >= window.innerWidth;

  if (hasHitRightWall) {
    position.x = size;
    vel = [-0.8 * vel[0], vel[1]];
  }

  if (hasHitLeftWall) {
    position.x = window.innerWidth - size;
    vel = [-0.8 * vel[0], vel[1]];
  }

  if (hasHitTop) {
    position.y = size;
    vel[1] = -0.8 * vel[1];
  }

  if (hasHitFloor && Math.abs(vel[0]) < 0.1) {
    position.y = window.innerHeight - size;
    vel = [0, 0];
  } else if (hasHitFloor) {
    position.y = window.innerHeight - size;
    vel[1] = -0.8 * vel[1];
    vel[0] = 0.95 * vel[0];
  } else {
  }

  ball.props.position = position;
  ball.props.color = color;
  ball.vel = vel;
}
