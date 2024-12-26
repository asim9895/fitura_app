import { View, Text, StatusBar } from "react-native";
import React from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import DatesList from "@/components/DatesList";
import DateHeader from "@/components/DateHeader";

const WaterTrackerPage = () => {
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const handleDateSelect = (date: any) => {
    console.log("Selected date:", date);
    // Do something with the selected date
  };

  const globalStyles = globalStylesWrapper(colors);

  return (
    <View style={[globalStyles.background]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DateHeader route="Water" />
      <DatesList
        onDateSelect={(date: any) => {
          console.log("Selected date:", date);
          // Do something with the selected date
        }}
      />
    </View>
  );
};

export default WaterTrackerPage;
