import { Children, useEffect, useState } from "react";
import { Tile } from "../graphics/Tile";
import { StandardColors } from "../styles";
import { TileProps } from "../graphics/Tile";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition([ev.clientX, ev.clientY]);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export const useMousePositionClick = () => {
  const [mousePositionClick, setMousePositionClick] = useState<
    [number, number]
  >([0, 0]);

  useEffect(() => {
    const updateMousePositionClick = (ev: MouseEvent) => {
      setMousePositionClick([ev.clientX, ev.clientY]);
    };

    window.addEventListener("click", updateMousePositionClick);

    return () => {
      window.removeEventListener("click", updateMousePositionClick);
    };
  }, []);

  return mousePositionClick;
};

export function getSurroundingDiv(x: number, y: number): HTMLDivElement | null {
  const element = document.elementFromPoint(x, y);

  if (element instanceof HTMLDivElement) {
    return element;
  }

  const parentDiv = element?.closest("div") as HTMLDivElement | null;
  return parentDiv;
}

export function mouseTrack() {
  document.addEventListener("click", (ev) => {
    const target = (ev.target as HTMLElement).closest("div[data-piece]");

    if (target) {
      const piece = target.getAttribute("data-piece");
      const team = target.getAttribute("data-team");
      const props = target.getAttribute("props");
      // if ( typeof props === TileProps)

      if (piece) {
        console.log(`Clicked on ${piece} from team ${team}`);
      } else {
        console.log("Empty Tile");
      }
    }
  });
}
