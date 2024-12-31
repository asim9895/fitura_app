import { Colors } from "@/theme/colors";
import { font_family } from "@/theme/font_family";
import { Platform, StyleSheet } from "react-native";

export const calorieTrackerStylesWrapper = (colors: Colors) =>
  StyleSheet.create({
    calorie_info_container: {
      backgroundColor: colors.foreground,
      padding: 15,
      borderRadius: 10,
      marginTop: 15,
    },
    calorie_left_to_eat_today: {
      color: colors.light_gray,
      fontFamily: font_family.font_semibold,
      fontSize: 16,
      marginBottom: 5,
    },
    calorie_icon: { width: 20, height: 20 },
    main_calorie: {
      color: colors.text,
      fontFamily: font_family.font_semibold,
      fontSize: 14,
      paddingHorizontal: 5,
    },
    highlighted_main_calorie: {
      color: colors.text,
      fontFamily: font_family.font_semibold,
      fontSize: 25,
    },
    calorie_distribution_container: {
      marginTop: 10,
      width: "100%",
      padding: 10,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 14,
    },

    calorie_distribution_title_1: {
      fontFamily: font_family.font_semibold,
      color: colors.text,
      marginBottom: Platform.OS === "ios" ? 5 : 0,
      fontSize: 14,
      textAlign: "center",
    },
    calorie_distribution_title_2: {
      fontFamily: font_family.font_semibold,

      fontSize: 10,
      textAlign: "center",
    },
    calorie_distribution_symbol: {
      width: "8%",
      fontFamily: font_family.font_semibold,
      color: colors.text,
    },
    total_budget_container: {
      backgroundColor: colors.background,
      marginTop: 10,
      borderRadius: 10,
      padding: 10,
      paddingVertical: 9,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    total_budget_title: {
      color: colors.text,
      fontFamily: font_family.font_semibold,
      fontSize: 17,
      marginTop: 4,
    },
    total_budget_value: {
      color: colors.button,
      fontFamily: font_family.font_semibold,
      marginTop: 4,
      fontSize: 18,
    },
    total_budget_icon: { width: 15, height: 15, marginLeft: 15 },
    tabs_container: {
      // backgroundColor: colors.foreground,
      flexDirection: "row",
      width: "100%",
    },
    single_tab: {
      padding: 10,
      width: "50%",
    },
    tab_icon: { width: 15, height: 15, marginRight: 5 },
    tab_text: {
      fontFamily: font_family.font_semibold,
      color: colors.text,
      fontSize: 16,
    },
    tab_sub_text: { color: colors.button, fontSize: 14 },
  });
