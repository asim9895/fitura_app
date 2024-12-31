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
import { calorie_burned, calorie_eaten } from "@/data/test";
import { icons } from "@/data/icons";
import { format_number } from "@/utils/variables";
import { isSameDay } from "date-fns";
import {
  CalorieBurnedData,
  CalorieEatenData,
  SingleCalorieBurnedEntry,
  SingleCalorieEatenEntry,
} from "@/types";
import EatenCaloriesListing from "@/components/calorie_tracker_components/EatenCaloriesListing";
import BurnedCaloriesListing from "@/components/calorie_tracker_components/BurnedCaloriesListing";
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
import CalorieTrackerMacros from "@/components/calorie_tracker_components/CalorieTrackerMacros";
import CalorieTrackerBudgetCalculator from "@/components/calorie_tracker_components/CalorieTrackerBudgetCalculator";

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

  const total_calorie_eaten_for_day = calorie_eaten
    .filter((data: any) => {
      const date = new Date(data.date);
      return isSameDay(date, selected_date);
    })
    .reduce(
      (total, calorie_eaten) =>
        total +
        calorie_eaten.data.reduce(
          (total, calorie) => total + calorie.calorie,
          0
        ),
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
    const promises = calorie_eaten.map(async (calories: CalorieEatenData) => {
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
    });
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
  }, [calorie_eaten, user, complete_calories_burned]);

  return (
    <View style={[globalStyles.background]}>
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

          <CalorieTrackerBudgetCalculator
            calorie_count={calorie_count}
            complete_calories_burned={complete_calories_burned}
            total_calorie_eaten_for_day={total_calorie_eaten_for_day}
            total_calories_left_to_eat={total_calories_left_to_eat}
          />
          <CalorieTrackerMacros
            macros={macros}
            calorie_eaten={calorie_eaten}
            selected_date={selected_date}
          />
        </View>

        <CalorieTrackerHealthSummary
          dated_weight={dated_weight}
          calorie_count={calorie_count}
          user={user}
        />
        <CalorieTrackerGoalSummary weight_goal_data={weight_goal_data} />

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
