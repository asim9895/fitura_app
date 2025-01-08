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
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.foreground,
      zIndex: 1000,
    },
    header_title: {
      color: colors.text,
      fontFamily: font_family.font_semibold,
      fontSize: 17,
    },
    close_icon: { width: 16, height: 16, marginRight: 5 },
    submit_button: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      backgroundColor: colors.button,
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    submit_button_text: {
      fontSize: 16,
      color: colors.text,
      fontFamily: font_family.font_semibold,
    },
  });
