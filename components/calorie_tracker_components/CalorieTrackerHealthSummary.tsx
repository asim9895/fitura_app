import { View, Text } from "react-native";
import React from "react";
import CollapsibleView from "../CollapsableView";
import { font_family } from "@/theme/font_family";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { format_number } from "@/utils/variables";
import { bmi_space } from "@/utils/bmi_space";

interface CalorieTrackerHealthSummaryProps {
  dated_weight: number;
  calorie_count: any;
  user: any;
}

const CalorieTrackerHealthSummary: React.FC<
  CalorieTrackerHealthSummaryProps
> = ({ dated_weight, calorie_count, user }) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  return (
    <CollapsibleView title="Health Summary">
      <View
        style={{
          padding: 5,
          margin: 5,
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 0,
          marginVertical: 0,
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            color: colors.light_gray,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          Weight on this day:{" "}
        </Text>
        <Text
          style={{
            color: colors.button,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          {dated_weight} kg
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          margin: 5,
          marginTop: 0,
          paddingTop: 0,
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 0,
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            color: colors.light_gray,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          Calorie To Maintain Current Weight:{" "}
        </Text>
        <Text
          style={{
            color: colors.button,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          {format_number(Number(calorie_count.maintainance_calories))} kcal /
          day
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          margin: 5,
          marginTop: 0,
          paddingTop: 0,
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 0,
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            color: colors.light_gray,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          Calorie To Achieve {user.target_weight}kg with pace of{" "}
          {user.weight_loss_intensity}kg per week:{" "}
        </Text>
        <Text
          style={{
            color: colors.button,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          {format_number(Number(calorie_count.calories_to_loose_weight))} kcal
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          margin: 5,
          marginTop: 0,
          paddingTop: 0,
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 0,
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            color: colors.light_gray,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          Calorie Deficiet:{" "}
        </Text>
        <Text
          style={{
            color: colors.button,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          {format_number(Number(calorie_count.daily_deficiet))} kcal / day
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          margin: 5,
          marginTop: 0,
          paddingTop: 0,
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 0,
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            color: colors.light_gray,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          BMI:{" "}
        </Text>
        <Text
          style={{
            color: colors.button,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          {format_number(Number(calorie_count.bmi))} (
          {bmi_space(Number(calorie_count.bmi))})
        </Text>
      </View>
    </CollapsibleView>
  );
};

export default CalorieTrackerHealthSummary;
