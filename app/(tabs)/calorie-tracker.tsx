import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { globalStylesWrapper } from "@/styles/global.style";
import { AppRootState } from "@/redux/store";
import DatesList from "@/components/DatesList";
import { useAppSelector } from "@/hooks/redux_hooks";
import * as Progress from "react-native-progress";
import DateHeader from "@/components/DateHeader";
import { calorie_burned } from "@/data/test";
import { icons } from "@/data/icons";
import { format_number } from "@/utils/variables";
import { isSameDay } from "date-fns";
import {
  CalorieBurnedData,
  CalorieEatenData,
  SingleCalorieBurnedEntry,
  SingleCalorieEatenEntry,
} from "@/types";

import { calorieTrackerStylesWrapper } from "@/styles/app/tabs/calorie-tracker.style";
import { read_weight_data_api } from "@/api/weight_apis";

import {
  calories_count_data,
  CaloriesCount,
  goal_achievement_date,
} from "@/utils/weight_loss_formulas";

import {
  total_calories_burned_by_steps,
  total_steps_for_day,
} from "@/helpers/steps_helper";
import {
  read_selected_date_steps_data_api,
  read_steps_data_api,
} from "@/api/steps_apis";

import CalorieTrackerHealthSummary from "@/components/calorie_tracker_components/CalorieTrackerHealthSummary";
import CalorieTrackerGoalSummary from "@/components/calorie_tracker_components/CalorieTrackerGoalSummary";

import CalorieTrackerBudgetCalculator from "@/components/calorie_tracker_components/CalorieTrackerBudgetCalculator";

import CaloriesAndBurnedListing from "@/components/calorie_tracker_components/CaloriesAndBurnedListing";
import FloatingActionButton from "@/components/calorie_tracker_components/FloatingActionButton";
import {
  read_calories_data_api,
  read_selected_date_calories_data_api,
} from "@/api/calorie_apis";
import { Stack } from "expo-router";

const CalorieTrackerPage = () => {
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const user = useAppSelector((state: AppRootState) => state.user);
  const { totalCalories } = useAppSelector((state: AppRootState) => state.step);
  const globalStyles = globalStylesWrapper(colors);
  const calorieTrackerStyles = calorieTrackerStylesWrapper(colors);
  const [calorie_eaten_data, setcalorie_eaten_data] = useState<
    SingleCalorieEatenEntry[]
  >([]);
  const [calorie_eaten_data_loading, setcalorie_eaten_data_loading] =
    useState(false);
  const [all_calorie_data, setall_calorie_data] = useState<CalorieEatenData[]>(
    []
  );

  const [calorie_burned_data, setcalorie_burned_data] = useState<
    SingleCalorieBurnedEntry[]
  >([]);
  const [all_calorie_of_achieved_goal, setAllCalorieOfAchievedGoal] = useState<
    any[]
  >([]);

  const [current_selection, setcurrent_selection] = useState("Calories");
  const { selected_date, weight } = useAppSelector(
    (state: AppRootState) => state.user
  );
  const [calorie_count, setcalorie_count] = useState<CaloriesCount>({
    calories_to_loose_weight: "",
    maintainance_calories: "",
    bmi: "",
    daily_deficiet: "",
  });
  const [macros, setmacros] = useState({
    protein: "",
    carbs: "",
    fat: "",
  });
  const [dated_weight, setdated_weight] = useState(weight);

  const fetch_selected_date_calorie_data = async (selected_date: Date) => {
    setcalorie_eaten_data_loading(true);
    const selected_day_steps_data = await read_selected_date_calories_data_api(
      selected_date
    );

    setcalorie_eaten_data(selected_day_steps_data);
    setcalorie_eaten_data_loading(false);
  };

  const fetch_all_steps_data = async () => {
    const all_steps_data = await read_calories_data_api();

    setall_calorie_data(all_steps_data?.records);
  };
  useEffect(() => {
    fetch_selected_date_calorie_data(selected_date);
  }, [selected_date]);

  useEffect(() => {
    fetch_all_steps_data();
  }, []);

  const total_calorie_eaten_for_day = calorie_eaten_data.reduce(
    (total: any, food: any) => total + food.calorie,
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

  const complete_calories_burned =
    total_calorie_burned_for_day + Number(totalCalories);

  const total_calories_left_to_eat =
    Number(calorie_count.calories_to_loose_weight) -
    total_calorie_eaten_for_day +
    complete_calories_burned;

  const progress_percent_calculator =
    total_calorie_eaten_for_day /
    (Number(calorie_count.calories_to_loose_weight) + complete_calories_burned);

  const update_health_goal_data = async (dated_weight: number) => {
    const calorie_summary = calories_count_data(
      dated_weight,
      user.weight_loss_intensity,
      user.height,
      user.activity_factor,
      user.age,
      user.gender
    );

    setcalorie_count({
      maintainance_calories: calorie_summary.maintainance_calories,
      calories_to_loose_weight: calorie_summary.calories_to_loose_weight,
      bmi: calorie_summary.bmi,
      daily_deficiet: calorie_summary.daily_deficiet,
    });

    const protein = dated_weight * 2;
    const fat =
      ((Number(calorie_summary.daily_deficiet) + complete_calories_burned) *
        0.25) /
      9;
    const carbs =
      (Number(calorie_summary.daily_deficiet) +
        complete_calories_burned -
        (protein + fat)) /
      4;

    setmacros({
      protein: protein.toFixed(0),
      fat: fat.toFixed(0),
      carbs: carbs.toFixed(0),
    });
  };

  useEffect(() => {
    update_health_goal_data(dated_weight);
  }, [dated_weight, user]);

  const update_dated_weight = async (selected_date: Date) => {
    const all_weights = await read_weight_data_api();

    const dated_weight = all_weights.records?.filter((item: any) => {
      const itemDate = new Date(item?.date).getDate();
      const compareDate = new Date(selected_date).getDate();

      return itemDate <= compareDate;
    });

    const latest_weight =
      dated_weight?.length === 0 ? user.weight : dated_weight[0].weight;

    setdated_weight(latest_weight);
  };

  useEffect(() => {
    update_dated_weight(selected_date);
  }, [selected_date, dated_weight]);

  const weight_goal_data = goal_achievement_date(
    dated_weight,
    user.target_weight,
    user.weight_loss_intensity
  );

  const calculateCalorieGoals = async () => {
    const promises = all_calorie_data.map(
      async (calories: CalorieEatenData) => {
        const date = new Date(calories.date);
        const calories_of_day = calories.data.reduce(
          (total: any, item: SingleCalorieEatenEntry) => {
            return total + item.calorie;
          },
          0
        );
        const total_calorie_burned_for_day = calorie_burned
          .filter((data: CalorieBurnedData) => {
            const day_date = new Date(data.date);
            return isSameDay(day_date, date);
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

        const all_steps_data = await read_steps_data_api();
        const selected_day_steps_data = await read_selected_date_steps_data_api(
          date
        );

        const all_weights = await read_weight_data_api();
        const dated_weight = all_weights.records?.filter((item: any) => {
          const itemDate = new Date(item?.date).getDate();
          const compareDate = new Date(date).getDate();
          return itemDate <= compareDate;
        });

        const weight_for_date =
          dated_weight?.length === 0 ? user.weight : dated_weight[0].weight;
        const calorie_summary = calories_count_data(
          weight_for_date,
          user.weight_loss_intensity,
          user.height,
          user.activity_factor,
          user.age,
          user.gender
        );
        const maintainance_calories = calorie_summary.maintainance_calories;
        const target_calories = calorie_summary.calories_to_loose_weight;
        const current_deficiet = Number(calorie_summary.daily_deficiet);

        const total_steps = total_steps_for_day(all_steps_data.records, date);

        const calories_burned_by_steps = total_calories_burned_by_steps(
          weight_for_date,
          all_steps_data?.records,
          selected_day_steps_data,
          date,
          total_steps
        );

        const maintainance_calories_deficiet =
          Number(maintainance_calories) -
          calories_of_day +
          calories_burned_by_steps.totalCalories +
          total_calorie_burned_for_day;

        const deficit =
          Number(target_calories) -
          calories_of_day +
          calories_burned_by_steps.totalCalories +
          total_calorie_burned_for_day;

        const count =
          maintainance_calories_deficiet < 0 ? 0 : current_deficiet + deficit;

        const condition = deficit < 0 ? false : true;

        return {
          date: date,
          count: count,
          condition: condition,
        };
      }
    );
    // Filter out entries with 0 deficit before setting state

    const resolved_data = await Promise.all(promises);

    const non_zero_deficit_entries = resolved_data.filter(
      (entry) => entry.count > 0
    );
    setAllCalorieOfAchievedGoal(non_zero_deficit_entries);
  };

  // Add useEffect to trigger the calculation
  useEffect(() => {
    calculateCalorieGoals();
  }, [all_calorie_data, user, complete_calories_burned, calorie_eaten_data]);

  return (
    <SafeAreaView style={[globalStyles.background]}>
      <Stack.Screen name="calorie-tracker" options={{ headerShown: false }} />
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DateHeader
        days={
          all_calorie_of_achieved_goal?.filter(
            (item) => item.condition === true
          )?.length
        }
      />
      <DatesList
        onDateSelect={(date: any) => {
          // Do something with the selected date
        }}
        achievement_dates={all_calorie_of_achieved_goal}
        route="calorie"
      />

      <FloatingActionButton />

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
                Number(calorie_count.calories_to_loose_weight) +
                  complete_calories_burned
                  ? 0
                  : format_number(total_calories_left_to_eat)}
              </Text>{" "}
              kcal
            </Text>
          </View>

          <View style={{ marginTop: 10, marginBottom: 0 }}>
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

          <CalorieTrackerBudgetCalculator
            calorie_count={calorie_count}
            complete_calories_burned={complete_calories_burned}
            total_calorie_eaten_for_day={total_calorie_eaten_for_day}
            total_calories_left_to_eat={total_calories_left_to_eat}
          />

          <CalorieTrackerHealthSummary
            dated_weight={dated_weight}
            calorie_count={calorie_count}
            user={user}
          />
          <CalorieTrackerGoalSummary weight_goal_data={weight_goal_data} />
        </View>

        <View style={{ paddingBottom: 150 }}>
          <CaloriesAndBurnedListing
            current_selection={current_selection}
            setcurrent_selection={setcurrent_selection}
            calorie_eaten_data={calorie_eaten_data}
            calorie_burned_data={calorie_burned_data}
            complete_calories_burned={complete_calories_burned}
            totalCalories={totalCalories}
            total_calorie_burned_for_day={total_calorie_burned_for_day}
            total_calorie_eaten_for_day={total_calorie_eaten_for_day}
            macros={macros}
            fetch_selected_date_calorie_data={fetch_selected_date_calorie_data}
            calorie_eaten_data_loading={calorie_eaten_data_loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CalorieTrackerPage;
