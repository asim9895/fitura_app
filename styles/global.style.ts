import { Colors } from "@/theme/colors";
import { font_family } from "@/theme/font_family";
import { StyleSheet } from "react-native";

export const globalStylesWrapper = (colors: Colors) =>
  StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      flex: 1,
    },
    row_center: {
      flexDirection: "row",
      alignItems: "center",
    },
    column_start: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    column_start_center: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    row_center_center: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    row_space_between: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    screen_spacing: { marginHorizontal: 15 },
  });
