import { View, Text, StatusBar } from "react-native";
import React from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import DatesList from "@/components/DatesList";
import DateHeader from "@/components/DateHeader";
import { water_data } from "@/data/test";

const WaterTrackerPage = () => {
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );

  const globalStyles = globalStylesWrapper(colors);

  const all_water_of_achieved_goal = water_data?.map((steps: any) => {
    const date = new Date(steps.date);
    const steps_of_day = steps.data.reduce((total: any, step: any) => {
      return total + step.steps;
    }, 0);
    return {
      date: date,
      count: steps_of_day,
    };
  });

  return (
    <View style={[globalStyles.background]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DateHeader days={all_water_of_achieved_goal?.length} />
      <DatesList
        onDateSelect={(date: any) => {
          console.log("Selected date:", date);
          // Do something with the selected date
        }}
        achievement_dates={all_water_of_achieved_goal}
      />
    </View>
  );
};

export default WaterTrackerPage;
