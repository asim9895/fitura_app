import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import { calorieTrackerStylesWrapper } from "@/styles/app/tabs/calorie-tracker.style";
import { icons } from "@/data/icons";
import { format_number } from "@/utils/variables";
import BurnedCaloriesListing from "./BurnedCaloriesListing";
import EatenCaloriesListing from "./EatenCaloriesListing";
import CalorieTrackerMacros from "./CalorieTrackerMacros";

interface CaloriesAndBurnedListingProps {
  current_selection: string;
  setcurrent_selection: React.Dispatch<React.SetStateAction<string>>;
  total_calorie_eaten_for_day: number;
  complete_calories_burned: number;
  totalCalories: number;
  macros: any;

  calorie_eaten_data: any;
  calorie_burned_data: any;
  total_calorie_burned_for_day: number;
}

const CaloriesAndBurnedListing: React.FC<CaloriesAndBurnedListingProps> = ({
  current_selection,
  setcurrent_selection,
  total_calorie_eaten_for_day,
  complete_calories_burned,
  totalCalories,
  total_calorie_burned_for_day,
  macros,
  calorie_eaten_data,
  calorie_burned_data,
}) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const globalStyles = globalStylesWrapper(colors);
  const calorieTrackerStyles = calorieTrackerStylesWrapper(colors);
  return (
    <View
      style={{
        padding: 10,
        paddingHorizontal: 0,
        marginTop: 10,
        borderRadius: 10,
      }}
    >
      <View style={calorieTrackerStyles.tabs_container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setcurrent_selection("Calories")}
          style={[
            {
              backgroundColor:
                current_selection === "Calories"
                  ? colors.foreground
                  : colors.background,

              borderTopEndRadius: current_selection === "Calories" ? 10 : 0,
              borderTopStartRadius: current_selection === "Calories" ? 10 : 0,
            },
            globalStyles.row_center_center,
            calorieTrackerStyles.single_tab,
          ]}
        >
          <Image
            source={icons.calories}
            style={calorieTrackerStyles.tab_icon}
          />
          <Text style={calorieTrackerStyles.tab_text}>
            Calories{" "}
            <Text style={calorieTrackerStyles.tab_sub_text}>
              ({format_number(total_calorie_eaten_for_day)})
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setcurrent_selection("Burned")}
          style={[
            {
              backgroundColor:
                current_selection === "Burned"
                  ? colors.foreground
                  : colors.background,
              borderTopEndRadius: current_selection === "Burned" ? 10 : 0,
              borderTopStartRadius: current_selection === "Burned" ? 10 : 0,
            },
            globalStyles.row_center_center,
            calorieTrackerStyles.single_tab,
          ]}
        >
          <Image source={icons.fire} style={calorieTrackerStyles.tab_icon} />
          <Text style={calorieTrackerStyles.tab_text}>
            Burned{" "}
            <Text style={calorieTrackerStyles.tab_sub_text}>
              ({format_number(complete_calories_burned)})
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      {current_selection === "Calories" ? (
        <View
          style={{
            backgroundColor: colors.foreground,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            borderTopEndRadius: 10,
          }}
        >
          <CalorieTrackerMacros
            macros={macros}
            calorie_eaten_data={calorie_eaten_data}
          />
          <EatenCaloriesListing calorie_eaten_data={calorie_eaten_data} />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: colors.foreground,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            borderTopStartRadius: 10,
          }}
        >
          <BurnedCaloriesListing
            calories_burned_by_steps={Number(totalCalories)}
            calories_burned_data={calorie_burned_data}
            calories_burned_by_workout={total_calorie_burned_for_day}
          />
        </View>
      )}
    </View>
  );
};

export default CaloriesAndBurnedListing;
