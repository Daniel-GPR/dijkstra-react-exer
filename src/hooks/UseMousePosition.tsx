const useMousePosition = () => {
  document.addEventListener("click", (event: MouseEvent) => {
    console.log(`Mouse clicked at X: ${event.clientX}, Y: ${event.clientY}`);
    return event.clientX, event.clientY;
  });
};

export default useMousePosition;
