import { Colors } from "@/theme/colors";
import { font_family } from "@/theme/font_family";
import { StyleSheet } from "react-native";

export const profileStylesWrapper = (colors: Colors) =>
  StyleSheet.create({
    header_container: {
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      paddingVertical: 10,
      borderBottomColor: colors.foreground,
      borderBottomWidth: 1,
      zIndex: 2,
    },
    header_text: {
      color: colors.text,
      fontFamily: font_family.font_semibold,
      fontSize: 20,
    },
    card_container: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 15,
      backgroundColor: colors.foreground,
      borderRadius: 10,
      padding: 10,
      marginVertical: 7,
    },
    icon_container: {
      width: "15%",
      alignItems: "center",
    },
    show_icon: { width: 30, height: 30 },
    edit_icon: { width: 20, height: 20 },
    info_container: {
      width: "70%",
      paddingLeft: 10,
    },
    info_title: {
      color: colors.light_gray,
      fontSize: 14,
      fontFamily: font_family.font_medium,
    },
    info_value: {
      color: colors.button,
      fontSize: 16,
      fontFamily: font_family.font_bold,
    },
  });
