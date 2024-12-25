import { View, Text, StatusBar } from "react-native";
import React from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import DatesList from "@/components/DatesList";

const WaterTrackerPage = () => {
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
      <DatesList route="Water" />
      <Text style={{ color: colors.text }}>Index</Text>
    </View>
  );
};

export default WaterTrackerPage;
