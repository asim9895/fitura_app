import { Colors } from "@/theme/colors";
import { font_family } from "@/theme/font_family";
import { Platform, StyleSheet } from "react-native";

export const stepTrackerStylesWrapper = (colors: Colors) =>
  StyleSheet.create({
    main_container: {
      backgroundColor: colors.foreground,
      borderRadius: 10,
      padding: 15,
      marginTop: 15,
    },
    header_container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    header_title: {
      fontFamily: font_family.font_semibold,
      fontSize: 18,
      color: colors.text,
      width: 100,
    },
    step_count_container: {
      zIndex: 2,
      top: 40,
      position: "absolute",
      alignItems: "center",
    },
    total_steps: {
      color: colors.text,
      fontFamily: font_family.font_bold,
      fontSize: 30,
      marginTop: 10,
    },
    target_steps: {
      color: colors.light_gray,
      fontFamily: font_family.font_semibold,
      fontSize: 16,
      marginTop: 0,
    },
    step_data_container: {
      marginTop: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    add_button_container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    add_button: {
      backgroundColor: colors.foreground,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 3,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    add_button_icon: {
      width: 13,
      height: 13,
      marginRight: 5,
      marginBottom: 2,
    },
    add_button_text: {
      fontFamily: font_family.font_semibold,
      fontSize: 15,
      color: colors.text,
      paddingTop: 2,
    },
    no_steps_container: {
      marginTop: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    no_steps_text: {
      fontSize: 20,
      fontFamily: font_family.font_semibold,
      color: colors.text,
    },
  });
