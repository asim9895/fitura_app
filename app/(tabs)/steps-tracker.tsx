import { View, Text, StatusBar } from "react-native";
import React from "react";
import { AppRootState } from "@/redux/store";
import { useAppSelector } from "@/hooks/redux_hooks";
import { globalStylesWrapper } from "@/styles/global.style";
import DatesList from "@/components/DatesList";
import DateHeader from "@/components/DateHeader";

const StepsTrackerPage = () => {
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );

  const globalStyles = globalStylesWrapper(colors);

  return (
    <View style={[globalStyles.background]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DateHeader route="Steps" />
      <DatesList
        onDateSelect={(date: any) => {
          console.log("Selected date:", date);
          // Do something with the selected date
        }}
      />
      <Text style={{ color: colors.text }}>Index</Text>
    </View>
  );
};

export default StepsTrackerPage;
