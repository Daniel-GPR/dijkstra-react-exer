import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { style } from "typestyle";
import { StandardColors } from "../styles";

export function Example() {
  const initial_time = new Date();
  const [time, setTime] = useState(new Date());
  const [timepassed, setTimepassed] = useState(0);
  const [click, setClick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const time_now = new Date();
      setTime(time_now);
      setTimepassed(time_now.getTime() - initial_time.getTime());
      console.log(time.getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [click]);

  return (
    <>
      <Button
        className={styles.button}
        onClick={() => setClick(Math.abs(click - 1))}
      >
        Refresh Elapsed Time
      </Button>
      <h1>The current time is: {time.toLocaleTimeString()}</h1>
      <h1>
        The time that has elapsed is {Math.round(timepassed / 1000)} seconds
      </h1>
    </>
  );
}

const styles = {
  button: style({
    // width: "10%",
    // height: "100%",
    color: StandardColors.ColorBlue80,
    position: "relative",
  }),
};
