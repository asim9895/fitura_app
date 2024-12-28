import {
  Dimensions,
  Image,
  Platform,
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
import { font_family } from "@/theme/font_family";
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
import { count_step_calories } from "@/utils/count_step_calories";

const CalorieTrackerPage = () => {
  const [calorie_eaten_data, setcalorie_eaten_data] = useState<
    SingleCalorieEatenEntry[]
  >([]);
  const [calorie_burned_data, setcalorie_burned_data] = useState<
    SingleCalorieBurnedEntry[]
  >([]);
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const [current_selection, setcurrent_selection] = useState("Calories");
  const { selected_date, target_calorie, weight } = useAppSelector(
    (state: AppRootState) => state.user
  );
  const globalStyles = globalStylesWrapper(colors);

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

  const total_calories_burned_by_steps = count_step_calories(
    total_steps_for_day,
    weight
  );

  const complete_calories_burned =
    total_calorie_burned_for_day + Number(total_calories_burned_by_steps);

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
        style={{ marginHorizontal: 15, marginBottom: 70 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: colors.foreground,
            padding: 15,
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <Text
            style={{
              color: colors.light_gray,
              fontFamily: font_family.font_semibold,
              fontSize: 16,
              marginBottom: 5,
            }}
          >
            Calories left to eat today
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={icons.calories} style={{ width: 20, height: 20 }} />
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_semibold,
                fontSize: 14,
                paddingHorizontal: 5,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontFamily: font_family.font_semibold,
                  fontSize: 25,
                }}
              >
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
            style={{
              marginTop: 15,
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: colors.background,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                width: "20%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.text,
                  marginBottom: Platform.OS === "ios" ? 5 : 0,
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                {format_number(target_calorie)}
              </Text>
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.button,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                Budget
              </Text>
            </View>
            <Text
              style={{
                width: "8%",
                fontFamily: font_family.font_semibold,
                color: colors.text,
              }}
            >
              -
            </Text>
            <View
              style={{
                width: "18.5%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.text,
                  marginBottom: Platform.OS === "ios" ? 5 : 0,
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                {format_number(total_calorie_eaten_for_day)}
              </Text>
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.green,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                Eaten
              </Text>
            </View>

            <Text
              style={{
                width: "8%",
                fontFamily: font_family.font_semibold,
                color: colors.text,
              }}
            >
              +
            </Text>
            <View
              style={{
                width: "18.5%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.text,
                  marginBottom: Platform.OS === "ios" ? 5 : 0,
                  fontSize: 17,
                }}
              >
                {format_number(complete_calories_burned)}
              </Text>
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.error,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                Burned
              </Text>
            </View>

            <Text
              style={{
                width: "8%",
                fontFamily: font_family.font_semibold,
                color: colors.text,
              }}
            >
              =
            </Text>
            <View
              style={{
                width: "18.5%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.text,
                  marginBottom: Platform.OS === "ios" ? 5 : 0,
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                {total_calorie_eaten_for_day >
                target_calorie + complete_calories_burned
                  ? 0
                  : format_number(total_calories_left_to_eat)}
              </Text>
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.light_gray,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                Left
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.background,
              marginTop: 10,
              borderRadius: 10,
              padding: 10,
              paddingVertical: 9,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_semibold,
                fontSize: 17,
                marginTop: 4,
              }}
            >
              Today Budget
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: colors.button,
                  fontFamily: font_family.font_semibold,
                  marginTop: 4,
                  fontSize: 18,
                }}
              >
                {format_number(2234)}
                <Text style={{ fontSize: 12 }}> kcal</Text>
              </Text>
              <Image
                source={icons.right_arrow}
                style={{ width: 15, height: 15, marginLeft: 15 }}
                tintColor={colors.button}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.foreground,
            padding: 7,
            marginTop: 10,
            flexDirection: "row",
            borderRadius: 10,
            width: "100%",
          }}
        >
          <View
            style={{
              width: "50%",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor:
                current_selection === "Calories"
                  ? colors.background
                  : colors.foreground,
              padding: 7,
              borderRadius: 7,
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.calories}
              style={{ width: 15, height: 15, marginRight: 5 }}
            />
            <Text
              onPress={() => setcurrent_selection("Calories")}
              style={{
                fontFamily: font_family.font_semibold,
                color: colors.text,
                fontSize: 16,
              }}
            >
              Calories{" "}
              <Text style={{ color: colors.button, fontSize: 14 }}>
                ({format_number(total_calorie_eaten_for_day)})
              </Text>
            </Text>
          </View>
          <View
            style={{
              width: "50%",
              padding: 7,
              borderRadius: 7,
              backgroundColor:
                current_selection === "Burned"
                  ? colors.background
                  : colors.foreground,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Image
              source={icons.fire}
              style={{ width: 15, height: 15, marginRight: 5 }}
            />
            <Text
              onPress={() => setcurrent_selection("Burned")}
              style={{
                fontFamily: font_family.font_semibold,
                color: colors.text,
                fontSize: 16,
              }}
            >
              Burned{" "}
              <Text style={{ color: colors.error, fontSize: 14 }}>
                ({format_number(complete_calories_burned)})
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalorieTrackerPage;
