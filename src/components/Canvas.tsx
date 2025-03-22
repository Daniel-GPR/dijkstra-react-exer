import { styles } from "../styles/Styles";
import { Chessboard } from "../graphics/Chessboard";

export function Canvas() {
  return (
    <div className={styles.container}>
      <div className={styles.chessBoardContainer}>
        <Chessboard />
      </div>
    </div>
  );
}
