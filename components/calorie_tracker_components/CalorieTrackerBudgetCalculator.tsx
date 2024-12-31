import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  UIManager,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { calorieTrackerStylesWrapper } from "@/styles/app/tabs/calorie-tracker.style";
import { globalStylesWrapper } from "@/styles/global.style";
import { format_number } from "@/utils/variables";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CalorieTrackerBudgetCalculatorProps {
  calorie_count: any;
  total_calorie_eaten_for_day: number;
  complete_calories_burned: number;
  total_calories_left_to_eat: number;
}

const CalorieTrackerBudgetCalculator: React.FC<
  CalorieTrackerBudgetCalculatorProps
> = ({
  calorie_count,
  total_calorie_eaten_for_day,
  complete_calories_burned,
  total_calories_left_to_eat,
}) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const calorieTrackerStyles = calorieTrackerStylesWrapper(colors);
  const globalStyles = globalStylesWrapper(colors);

  return (
    <View
      style={{
        paddingVertical: 0,
        paddingTop: 0,

        backgroundColor: colors.foreground,
        borderRadius: 10,
      }}
    >
      <View
        style={[
          calorieTrackerStyles.calorie_distribution_container,
          globalStyles.row_center_center,
        ]}
      >
        <View style={[{ width: "20%" }, globalStyles.column_start_center]}>
          <Text style={calorieTrackerStyles.calorie_distribution_title_1}>
            {format_number(Number(calorie_count.calories_to_loose_weight))}
          </Text>
          <Text
            style={[
              { color: colors.button },
              calorieTrackerStyles.calorie_distribution_title_2,
            ]}
          >
            Budget
          </Text>
        </View>
        <Text style={calorieTrackerStyles.calorie_distribution_symbol}>-</Text>
        <View style={[{ width: "18.5%" }, globalStyles.column_start_center]}>
          <Text style={calorieTrackerStyles.calorie_distribution_title_1}>
            {format_number(total_calorie_eaten_for_day)}
          </Text>
          <Text
            style={[
              { color: colors.green },
              calorieTrackerStyles.calorie_distribution_title_2,
            ]}
          >
            Eaten
          </Text>
        </View>

        <Text style={calorieTrackerStyles.calorie_distribution_symbol}>+</Text>
        <View style={[{ width: "18.5%" }, globalStyles.column_start_center]}>
          <Text style={calorieTrackerStyles.calorie_distribution_title_1}>
            {format_number(complete_calories_burned)}
          </Text>
          <Text
            style={[
              { color: colors.error },
              calorieTrackerStyles.calorie_distribution_title_2,
            ]}
          >
            Burned
          </Text>
        </View>

        <Text style={calorieTrackerStyles.calorie_distribution_symbol}>=</Text>
        <View style={[{ width: "18.5%" }, globalStyles.column_start_center]}>
          <Text style={calorieTrackerStyles.calorie_distribution_title_1}>
            {total_calorie_eaten_for_day >
            Number(calorie_count.calories_to_loose_weight) +
              complete_calories_burned
              ? 0
              : format_number(total_calories_left_to_eat)}
          </Text>
          <Text
            style={[
              { color: colors.button },
              calorieTrackerStyles.calorie_distribution_title_2,
            ]}
          >
            Left
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CalorieTrackerBudgetCalculator;
