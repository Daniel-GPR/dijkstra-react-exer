import { Input } from "reactstrap";
import { Vector } from "../models";
import { style } from "typestyle";
import { Spacing } from "../styles";

interface VectorInputProps {
  title: string;
  vector: Vector;
  onChange: (v: Vector) => void;
  max: Vector;
  min: Vector;
}
export function VectorInput({
  title,
  vector,
  onChange,
  max,
  min,
}: VectorInputProps) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <h3>X</h3>
      <Input
        type="range"
        min={min.x}
        max={max.x}
        onChange={(e) => onChange({ ...vector, x: parseInt(e.target.value) })}
      />
      <h3>Y</h3>
      <Input
        type="range"
        min={min.y}
        max={max.y}
        onChange={(e) => onChange({ ...vector, y: parseInt(e.target.value) })}
      />
    </div>
  );
}

const styles = {
  container: style({
    display: "flex",
    flexDirection: "column",
    rowGap: Spacing.Small,
  }),
};
