import { style } from "typestyle";
import { StandardColors } from "../styles";
import { useState } from "react";

type skibiTuple = string[];

type dev = (num: number) => number

const doubleFunc: dev = (number) => {return number * 2}

export function Canvas() {
  const [inputValues, setInputValues] = useState<skibiTuple>(['','']);

  const [clickCounter, setClickCounter] = useState<number>(0);

  // const [ animal , age] = skibifi(['cat',5]);

  // const inputValues: skibiTuple = ["", null];
  function superClick(e: any): void {
    setClickCounter(0);
  }
  function megaClcik(e: any): void {
    setClickCounter(clickCounter * 100);
  }


  return (
    <div className={styles.container}>
      <h1 className={styles.text}> input </h1>
      {/* <input onChange={(event) =}>   </input> */}
      <input
        onChange={(event) => {
          inputValues[1] = event.target.value;
          setInputValues([...inputValues]);
        }}
        className={styles.inputStyle}
      />
      
      <h1 className="malakia-class">UIIAIUIIIAI</h1>

      <h1>Button</h1>
      <button onClick={(event) => setClickCounter(clickCounter + 1)}>
        Cliggers 
      </button>
      <button onClick={superClick}>Resset</button>
      <h1 className={styles.text}> {skibifi(inputValues[1])} </h1>
      <button onClick={megaClcik}> Megaclick </button>
      <h1> You have commited {clickCounter} Clicks </h1>
    </div>
  );
}

const styles = {
  container: style({
    backgroundColor: StandardColors.ColorBlue40,
    width: "100%",
    height: "100%",
  }),
  text: style({
    color: StandardColors.ColorGreen30,
    whiteSpace: "pre-line",
  }),
  chessBoard: style({
    backgroundColor:
      "repeating-linear-gradient(45deg, red, red 10px, blue 10px, blue20px",
    width: "100%",
    height: "100%",
  }),
  inputStyle: style({
    color: StandardColors.ColorOrange40,
    backgroundColor: StandardColors.ColorBlue10,
    whiteSpace: "pre-line",
  }),
};

// function name(var: number): number {}


function skibifi(skibi: string): any[] {
  if (skibi  === "Elomas") {
    return ["sdddaaaaadsddsd", 420];
  }
  return ["SPEOS"];
}
