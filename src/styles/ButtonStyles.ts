import { style } from "typestyle";
import { Spacing } from "./Spacing";
import { PrimaryColors } from "./PrimaryColors";
import { shadeColor } from "./ColorUtils";
import { StandardColors } from "./Colors";
import { BoxShadowStyles } from "./BoxShadowStyles";

export const ButtonStyles = {
  Primary: createButtonStyle({
    textColor: PrimaryColors.ColorWhite,
    regularBackgroundColor: PrimaryColors.ColorBlue,
    hoverColor: shadeColor(PrimaryColors.ColorBlue, -0.1),
    activeBackgroundColor: shadeColor(PrimaryColors.ColorBlue, -0.2),
    disabledColor: shadeColor(PrimaryColors.ColorBlue, 0.6),
    disabledTextColor: StandardColors.ColorBlack,
    boxShadow: BoxShadowStyles.Medium,
  }),
  Secondary: createButtonStyle({
    textColor: PrimaryColors.ColorBlue,
    regularBackgroundColor: PrimaryColors.ColorTeal,
    hoverColor: shadeColor(PrimaryColors.ColorTeal, -0.1),
    activeBackgroundColor: shadeColor(PrimaryColors.ColorTeal, -0.2),
    disabledColor: shadeColor(PrimaryColors.ColorTeal, 0.6),
    disabledTextColor: StandardColors.ColorBlack,
    boxShadow: BoxShadowStyles.Medium,
    outlineColor: PrimaryColors.ColorTeal,
  }),
};

interface ButtonProperties {
  textColor: string;
  regularBackgroundColor: string;
  hoverColor: string;
  activeBackgroundColor: string;
  disabledColor: string;
  disabledTextColor: string;
  outlineColor?: string | undefined;
  boxShadow?: string;
}

function createButtonStyle({
  textColor,
  regularBackgroundColor,
  hoverColor,
  activeBackgroundColor,
  disabledColor,
  disabledTextColor,
  outlineColor,
  boxShadow,
}: ButtonProperties) {
  return `${style({
    color: textColor,
    background: "none",
    backgroundColor: regularBackgroundColor,
    paddingBlock: Spacing.Medium,
    paddingInline: Spacing.Large * 1.25,
    border: !outlineColor ? "none" : `2px solid`,
    borderColor: outlineColor,
    boxShadow: boxShadow,
    fontWeight: 500,

    $nest: {
      "*:-webkit-focus-ring": {
        outline: "none",
      },
      "&:hover": {
        color: !outlineColor ? textColor : outlineColor,
        backgroundColor: hoverColor,
        border: outlineColor && `2px solid`,
        borderColor: outlineColor && hoverColor,

        $nest: {
          "&:active": {
            /* In FireFox we need to nest active under hover */
            color: `${textColor} !important`,
            backgroundColor: `${activeBackgroundColor} !important`,
          },
        },
      },
      "&:active": {
        color: `${textColor} !important`,
        backgroundColor: `${activeBackgroundColor} !important`,
      },
      "&:visited": {
        color: `${textColor} !important`,
        backgroundColor: `${activeBackgroundColor} !important`,
      },
      "&:disabled": {
        backgroundColor: disabledColor,
        color: disabledTextColor,
        opacity: 0.4,
        boxShadow: "none",
      },

      svg: {
        /* In FireFox SVG steals active mouse press state */
        pointerEvents: "none",
      },
    },
  })}`;
}
