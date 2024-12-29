import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { globalStylesWrapper } from "@/styles/global.style";
import { AppRootState } from "@/redux/store";
import DatesList from "@/components/DatesList";
import { useAppSelector } from "@/hooks/redux_hooks";
import * as Progress from "react-native-progress";
import DateHeader from "@/components/DateHeader";
import { calorie_burned, calorie_eaten, steps } from "@/data/test";
import { icons } from "@/data/icons";
import { format_number } from "@/utils/variables";
import { isSameDay } from "date-fns";
import {
  CalorieBurnedData,
  CalorieEatenData,
  SingleCalorieBurnedEntry,
  SingleCalorieEatenEntry,
} from "@/types";
import EatenCaloriesListing from "@/components/EatenCaloriesListing";
import BurnedCaloriesListing from "@/components/BurnedCaloriesListing";
import { calorieTrackerStylesWrapper } from "@/styles/app/tabs/calorie-tracker.style";

const CalorieTrackerPage = () => {
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const { totalCalories } = useAppSelector((state: AppRootState) => state.step);
  const globalStyles = globalStylesWrapper(colors);
  const calorieTrackerStyles = calorieTrackerStylesWrapper(colors);
  const [calorie_eaten_data, setcalorie_eaten_data] = useState<
    SingleCalorieEatenEntry[]
  >([]);
  const [calorie_burned_data, setcalorie_burned_data] = useState<
    SingleCalorieBurnedEntry[]
  >([]);

  const [current_selection, setcurrent_selection] = useState("Calories");
  const { selected_date, target_calorie, weight } = useAppSelector(
    (state: AppRootState) => state.user
  );

  const all_calorie_of_achieved_goal = calorie_eaten?.map(
    (calories: CalorieEatenData) => {
      const date = new Date(calories.date);
      const calories_of_day = calories.data.reduce(
        (total: any, item: SingleCalorieEatenEntry) => {
          return total + item.eaten;
        },
        0
      );
      return {
        date: date,
        count: calories_of_day,
      };
    }
  );

  const total_calorie_eaten_for_day = calorie_eaten
    .filter((data: any) => {
      const date = new Date(data.date);
      return isSameDay(date, selected_date);
    })
    .reduce(
      (total, calorie_eaten) =>
        total +
        calorie_eaten.data.reduce((total, calorie) => total + calorie.eaten, 0),
      0
    );

  const total_calorie_burned_for_day = calorie_burned
    .filter((data: CalorieBurnedData) => {
      const date = new Date(data.date);
      return isSameDay(date, selected_date);
    })
    .reduce(
      (total, calorie_burned) =>
        total +
        calorie_burned.data.reduce(
          (total, calorie) => total + calorie.burned,
          0
        ),
      0
    );

  const set_calorie_eaten_data = (selected_date: Date) => {
    const intake_of_selected_date: CalorieEatenData[] = calorie_eaten.filter(
      (step) => {
        return isSameDay(new Date(step.date), selected_date);
      }
    );

    if (intake_of_selected_date?.length > 0) {
      setcalorie_eaten_data(intake_of_selected_date[0]?.data);
    } else {
      setcalorie_eaten_data([]);
    }
  };
  useEffect(() => {
    set_calorie_eaten_data(selected_date);
  }, [selected_date]);

  const complete_calories_burned =
    total_calorie_burned_for_day + Number(totalCalories);

  const total_calories_left_to_eat =
    target_calorie - total_calorie_eaten_for_day + complete_calories_burned;

  const progress_percent_calculator =
    total_calorie_eaten_for_day / (target_calorie + complete_calories_burned);

  return (
    <View style={[globalStyles.background]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DateHeader days={all_calorie_of_achieved_goal?.length} />
      <DatesList
        onDateSelect={(date: any) => {
          console.log("Selected date:", date);
          // Do something with the selected date
        }}
        achievement_dates={all_calorie_of_achieved_goal}
        budget_data={target_calorie}
      />

      <ScrollView
        style={globalStyles.screen_spacing}
        showsVerticalScrollIndicator={false}
      >
        <View style={calorieTrackerStyles.calorie_info_container}>
          <Text style={calorieTrackerStyles.calorie_left_to_eat_today}>
            Calories left to eat today
          </Text>

          <View style={globalStyles.row_center}>
            <Image
              source={icons.calories}
              style={calorieTrackerStyles.calorie_icon}
            />
            <Text style={calorieTrackerStyles.main_calorie}>
              <Text style={calorieTrackerStyles.highlighted_main_calorie}>
                {total_calorie_eaten_for_day >
                target_calorie + complete_calories_burned
                  ? 0
                  : format_number(total_calories_left_to_eat)}
              </Text>{" "}
              kcal
            </Text>
          </View>

          <View style={{ marginTop: 5 }}>
            <Progress.Bar
              progress={progress_percent_calculator}
              width={Dimensions.get("window").width / 1.2}
              height={10}
              borderRadius={25}
              color={colors.button}
              unfilledColor={colors.background}
              borderColor={colors.background}
            />
          </View>

          <View
            style={[
              calorieTrackerStyles.calorie_distribution_container,
              globalStyles.row_center_center,
            ]}
          >
            <View style={[{ width: "20%" }, globalStyles.column_start_center]}>
              <Text style={calorieTrackerStyles.calorie_distribution_title_1}>
                {format_number(target_calorie)}
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
            <Text style={calorieTrackerStyles.calorie_distribution_symbol}>
              -
            </Text>
            <View
              style={[{ width: "18.5%" }, globalStyles.column_start_center]}
            >
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

            <Text style={calorieTrackerStyles.calorie_distribution_symbol}>
              +
            </Text>
            <View
              style={[{ width: "18.5%" }, globalStyles.column_start_center]}
            >
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

            <Text style={calorieTrackerStyles.calorie_distribution_symbol}>
              =
            </Text>
            <View
              style={[{ width: "18.5%" }, globalStyles.column_start_center]}
            >
              <Text style={calorieTrackerStyles.calorie_distribution_title_1}>
                {total_calorie_eaten_for_day >
                target_calorie + complete_calories_burned
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

          <View style={calorieTrackerStyles.total_budget_container}>
            <Text style={calorieTrackerStyles.total_budget_title}>
              Today Budget
            </Text>
            <View style={globalStyles.row_center}>
              <Text style={calorieTrackerStyles.total_budget_value}>
                {format_number(target_calorie)}
                <Text style={{ fontSize: 12 }}> kcal</Text>
              </Text>
              <Image
                source={icons.right_arrow}
                style={calorieTrackerStyles.total_budget_icon}
                tintColor={colors.button}
              />
            </View>
          </View>
        </View>

        <View style={calorieTrackerStyles.tabs_container}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setcurrent_selection("Calories")}
            style={[
              {
                backgroundColor:
                  current_selection === "Calories"
                    ? colors.background
                    : colors.foreground,
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
                    ? colors.background
                    : colors.foreground,
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
          <EatenCaloriesListing />
        ) : (
          <BurnedCaloriesListing
            calories_burned_by_steps={Number(totalCalories)}
            calories_burned_data={calorie_burned_data}
            calories_burned_by_workout={total_calorie_burned_for_day}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default CalorieTrackerPage;
