import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SingleCalorieBurnedEntry } from "@/types";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { icons } from "@/data/icons";
import { font_family } from "@/theme/font_family";
import { format_number } from "@/utils/variables";
import { globalStylesWrapper } from "@/styles/global.style";
import { calorieTrackerStylesWrapper } from "@/styles/app/tabs/calorie-tracker.style";

interface BurnedCaloriesListingProps {
  calories_burned_by_steps: number;
  calories_burned_data: SingleCalorieBurnedEntry[];
  calories_burned_by_workout: number;
}

const BurnedCaloriesListing: React.FC<BurnedCaloriesListingProps> = ({
  calories_burned_by_steps,
  calories_burned_by_workout,
}) => {
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const globalStyles = globalStylesWrapper(colors);
  const calorieTrackerStyles = calorieTrackerStylesWrapper(colors);
  return (
    <View style={calorieTrackerStyles.tabs_container}>
      <View
        style={[
          {
            backgroundColor: colors.foreground,
          },
          globalStyles.row_center_center,
          calorieTrackerStyles.single_tab,
        ]}
      >
        <Image
          source={icons.shoe}
          style={[
            calorieTrackerStyles.tab_icon,
            { width: 30, height: 30, marginRight: 15 },
          ]}
        />
        <View style={globalStyles.column_start}>
          <Text style={calorieTrackerStyles.tab_text}>Steps </Text>
          <Text
            style={[
              calorieTrackerStyles.tab_sub_text,
              { fontFamily: font_family.font_semibold, fontSize: 17 },
            ]}
          >
            {format_number(calories_burned_by_steps)}
          </Text>
        </View>
      </View>
      <View
        style={[
          {
            backgroundColor: colors.foreground,
          },
          globalStyles.row_center_center,
          calorieTrackerStyles.single_tab,
        ]}
      >
        <Image
          source={icons.workout}
          style={[
            calorieTrackerStyles.tab_icon,
            { width: 30, height: 30, marginRight: 15 },
          ]}
        />
        <View style={globalStyles.column_start}>
          <Text style={calorieTrackerStyles.tab_text}>Workout </Text>
          <Text
            style={[
              calorieTrackerStyles.tab_sub_text,
              { fontFamily: font_family.font_semibold, fontSize: 17 },
            ]}
          >
            {format_number(calories_burned_by_workout)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BurnedCaloriesListing;

const styles = StyleSheet.create({});
