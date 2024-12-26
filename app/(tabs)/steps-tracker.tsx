import { View, Text, StatusBar } from "react-native";
import React from "react";
import { AppRootState } from "@/redux/store";
import { useAppSelector } from "@/hooks/redux_hooks";
import { globalStylesWrapper } from "@/styles/global.style";
import DatesList from "@/components/DatesList";
import DateHeader from "@/components/DateHeader";
import { steps } from "@/data/test";
import { isSameDay } from "date-fns";

const StepsTrackerPage = () => {
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const { selected_date, target_steps } = useAppSelector(
    (state: AppRootState) => state.user
  );

  const globalStyles = globalStylesWrapper(colors);

  const total_steps_for_day = steps
    .filter((data: any) => {
      const date = new Date(data.date);
      return isSameDay(date, selected_date);
    })
    .reduce(
      (total, step) =>
        total + step.data.reduce((total, step) => total + step.steps, 0),
      0
    );

  console.log(total_steps_for_day);

  const all_steps_of_achieved_goal = steps
    ?.map((steps: any) => {
      const date = new Date(steps.date);
      const steps_of_day = steps.data.reduce((total: any, step: any) => {
        return total + step.steps;
      }, 0);
      return {
        date: date,
        steps: steps_of_day,
      };
    })
    ?.map((data: any) => {
      return data?.date;
    });

  return (
    <View style={[globalStyles.background]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DateHeader days={all_steps_of_achieved_goal?.length} />
      <DatesList
        onDateSelect={(date: any) => {
          console.log("Selected date:", date);
          // Do something with the selected date
        }}
        achievement_dates={all_steps_of_achieved_goal}
      />
    </View>
  );
};

export default StepsTrackerPage;
