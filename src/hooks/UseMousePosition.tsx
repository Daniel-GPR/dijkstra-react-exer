import { useEffect, useState } from "react";

const useMousePosition = () => {
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

export default useMousePosition;
