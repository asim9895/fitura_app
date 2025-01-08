import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { font_family } from "@/theme/font_family";
import { convert_minutes_to_hour_minutes } from "@/utils/time_converter";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { format_number } from "@/utils/variables";

interface StepsMacrosProps {
  totalCalories: any;
  total_steps: any;
  speedKmh: any;
  distanceKm: any;
  timeMinutes: any;
}

const StepsMacros: React.FC<StepsMacrosProps> = ({
  timeMinutes,
  totalCalories,
  total_steps,
  speedKmh,
  distanceKm,
}) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            fontFamily: font_family.font_semibold,
            color: colors.light_gray,
            fontSize: 11,
            marginTop: 5,
          }}
        >
          Calories Burned:{" "}
          <Text
            style={{
              fontFamily: font_family.font_bold,
              color: colors.button,
              fontSize: 11,
            }}
          >
            {" "}
            {format_number(Number(totalCalories))} kcal
          </Text>
        </Text>
        <Text
          style={{
            fontFamily: font_family.font_semibold,
            color: colors.light_gray,
            fontSize: 11,
          }}
        >
          Avg Speed:{" "}
          <Text
            style={{
              fontFamily: font_family.font_bold,
              color: colors.button,
              fontSize: 11,
            }}
          >
            {total_steps === 0 ? 0 : format_number(speedKmh)} km / h
          </Text>
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: 5,
        }}
      >
        <Text
          style={{
            fontFamily: font_family.font_semibold,
            color: colors.light_gray,
            fontSize: 11,
          }}
        >
          Distance Covered:{" "}
          <Text
            style={{
              fontFamily: font_family.font_bold,
              color: colors.button,
              fontSize: 11,
            }}
          >
            {format_number(distanceKm)} km
          </Text>
        </Text>
        <Text
          style={{
            fontFamily: font_family.font_semibold,
            color: colors.light_gray,
            fontSize: 11,
          }}
        >
          Time:{" "}
          <Text
            style={{
              fontFamily: font_family.font_bold,
              color: colors.button,
              fontSize: 11,
            }}
          >
            {" "}
            {convert_minutes_to_hour_minutes(Number(timeMinutes))}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default StepsMacros;

const styles = StyleSheet.create({});
