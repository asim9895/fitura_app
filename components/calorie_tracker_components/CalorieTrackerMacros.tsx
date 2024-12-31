import { View, Text } from "react-native";
import React from "react";
import { globalStylesWrapper } from "@/styles/global.style";
import { font_family } from "@/theme/font_family";
import * as Progress from "react-native-progress";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { isSameDay } from "date-fns";

interface CalorieTackerMacrosProps {
  macros: any;
  calorie_eaten: any;
  selected_date: any;
}

const CalorieTrackerMacros: React.FC<CalorieTackerMacrosProps> = ({
  macros,
  calorie_eaten,
  selected_date,
}) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const globalStyles = globalStylesWrapper(colors);

  const total_protein_eaten_for_day = calorie_eaten
    .filter((data: any) => {
      const date = new Date(data.date);
      return isSameDay(date, selected_date);
    })
    .reduce(
      (total: any, calorie_eaten: any) =>
        total +
        calorie_eaten.data.reduce(
          (total: any, calorie: any) => total + calorie.protein,
          0
        ),
      0
    );

  const total_carbs_eaten_for_day = calorie_eaten
    .filter((data: any) => {
      const date = new Date(data.date);
      return isSameDay(date, selected_date);
    })
    .reduce(
      (total: any, calorie_eaten: any) =>
        total +
        calorie_eaten.data.reduce(
          (total: any, calorie: any) => total + calorie.carbs,
          0
        ),
      0
    );

  const total_fat_eaten_for_day = calorie_eaten
    .filter((data: any) => {
      const date = new Date(data.date);
      return isSameDay(date, selected_date);
    })
    .reduce(
      (total: any, calorie_eaten: any) =>
        total +
        calorie_eaten.data.reduce(
          (total: any, calorie: any) => total + calorie.fat,
          0
        ),
      0
    );

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        width: "100%",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <View style={[globalStyles.column_start]}>
        <Text
          style={{
            color: colors.light_gray,
            fontSize: 13,
            fontFamily: font_family.font_medium,
          }}
        >
          Protein
        </Text>

        <View style={{ marginTop: 5 }}>
          <Progress.Bar
            progress={total_protein_eaten_for_day / Number(macros.protein)}
            width={60}
            height={6}
            borderRadius={25}
            color={colors.button}
            unfilledColor={colors.background}
            borderColor={colors.background}
          />
        </View>
        <Text
          style={{
            fontFamily: font_family.font_semibold,
            color: colors.text,
            marginTop: 5,
            fontSize: 15,
          }}
        >
          {" "}
          {total_protein_eaten_for_day}{" "}
          <Text
            style={{
              color: colors.light_gray,
              fontSize: 12,
              fontFamily: font_family.font_medium,
            }}
          >
            / {macros.protein} g
          </Text>
        </Text>
      </View>
      <View style={[globalStyles.column_start]}>
        <Text
          style={{
            color: colors.light_gray,
            fontSize: 13,
            fontFamily: font_family.font_medium,
          }}
        >
          Carbs
        </Text>

        <View style={{ marginTop: 5 }}>
          <Progress.Bar
            progress={total_carbs_eaten_for_day / Number(macros.carbs)}
            width={60}
            height={6}
            borderRadius={25}
            color={colors.button}
            unfilledColor={colors.background}
            borderColor={colors.background}
          />
        </View>
        <Text
          style={{
            fontFamily: font_family.font_semibold,
            color: colors.text,
            marginTop: 5,
            fontSize: 15,
          }}
        >
          {" "}
          {total_carbs_eaten_for_day}{" "}
          <Text
            style={{
              color: colors.light_gray,
              fontSize: 12,
              fontFamily: font_family.font_medium,
            }}
          >
            / {macros.carbs} g
          </Text>
        </Text>
      </View>
      <View style={[globalStyles.column_start]}>
        <Text
          style={{
            color: colors.light_gray,
            fontSize: 13,
            fontFamily: font_family.font_medium,
          }}
        >
          Fat
        </Text>

        <View style={{ marginTop: 5 }}>
          <Progress.Bar
            progress={total_fat_eaten_for_day / Number(macros.fat)}
            width={60}
            height={6}
            borderRadius={25}
            color={colors.button}
            unfilledColor={colors.background}
            borderColor={colors.background}
          />
        </View>
        <Text
          style={{
            fontFamily: font_family.font_semibold,
            color: colors.text,
            marginTop: 5,
            fontSize: 15,
          }}
        >
          {" "}
          {total_fat_eaten_for_day}{" "}
          <Text
            style={{
              color: colors.light_gray,
              fontSize: 12,
              fontFamily: font_family.font_medium,
            }}
          >
            / {macros.fat} g
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default CalorieTrackerMacros;
