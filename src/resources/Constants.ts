import { Team } from "../models/Team";
import { StandardColors } from "../styles";

interface PieceColor {
  color: string;
  secColor: string;
}
export const teamColor: Record<Team, PieceColor> = {
  [Team.White]: {
    color: StandardColors.ColorWhite,
    secColor: StandardColors.ColorBlue60,
  },
  [Team.Black]: {
    color: StandardColors.ColorBlack,
    secColor: StandardColors.ColorOrange70,
  },
};
