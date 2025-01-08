import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import CollapsibleView from "../CollapsableView";
import { font_family } from "@/theme/font_family";

const CalorieTrackerGoalSummary: React.FC<{ weight_goal_data: any }> = ({
  weight_goal_data,
}) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  return (
    <CollapsibleView title="Goal Summary">
      <View
        style={{
          padding: 5,

          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 0,
          marginVertical: 2,
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
          Goal Achievement Date:{" "}
        </Text>
        <Text
          style={{
            color: colors.button,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          {weight_goal_data.goal_achievement_date.toDateString()}
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
          Week to achieve goal:{" "}
        </Text>
        <Text
          style={{
            color: colors.button,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          {weight_goal_data.weeks_to_goal_value.toFixed(0)} Weeks
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
          Weight Left to loose:{" "}
        </Text>
        <Text
          style={{
            color: colors.button,
            fontFamily: font_family.font_medium,
            fontSize: 12,
          }}
        >
          {weight_goal_data.weight_to_loose.toFixed(0)} kg
        </Text>
      </View>
    </CollapsibleView>
  );
};

export default CalorieTrackerGoalSummary;
