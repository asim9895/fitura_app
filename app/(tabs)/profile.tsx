import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { set_theme } from "@/redux/slices/theme_slice";
import { Colors, dark, light } from "@/theme/colors";
import { globalStylesWrapper } from "@/styles/global.style";
import { AppRootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useNavigation } from "expo-router";
import {
  clear_user_profile,
  set_user_profile,
  update_weight,
} from "@/redux/slices/user_slice";
import { todays_date } from "@/utils/variables";
import {
  calories_count_data,
  CaloriesCount,
  goal_achievement_date,
} from "@/utils/weight_loss_formulas";
import {
  add_or_update_weight_of_selected_data_api,
  read_selected_date_weight_data_api,
  read_weight_data_api,
} from "@/api/weight_apis";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [calorie_count, setcalorie_count] = useState<CaloriesCount>({
    calories_to_loose_weight: 0,
    maintainance_calories: 0,
    bmi: "",
  });

  const navigation = useNavigation();

  const updateProfile = () => {
    dispatch(
      set_user_profile({
        name: "Jane Doe",
        age: 28,
        height: 170,
        weight: 92,
        gender: "Male",
        profile_completed: true,
        creation_date: new Date("2024-12-23T13:42:30.685Z"),
        weight_loss_intensity: 1,
        target_weight: 72,
      })
    );
  };

  const clearProfile = () => {
    dispatch(clear_user_profile());
    navigation.navigate("setup-profile" as never);
  };

  const { colors }: { colors: Colors } = useSelector(
    (state: AppRootState) => state.theme
  );
  const { selected_date } = useSelector((state: AppRootState) => state.user);
  const globalStyles = globalStylesWrapper(colors);

  const weight_goal_data = goal_achievement_date(
    user.weight,
    user.target_weight,
    user.weight_loss_intensity
  );

  const add_or_update_weight_data = async () => {
    const weight = 90.55;
    const request = await add_or_update_weight_of_selected_data_api(
      selected_date,
      weight
    );
    const all_weights = await read_weight_data_api();

    const latest_weight = all_weights.records;

    dispatch(
      update_weight({
        weight: latest_weight?.length !== 0 ? latest_weight[0].weight : weight,
      })
    );
  };

  const update_calorie_data = async (selected_date: Date) => {
    const selected_weight = await read_selected_date_weight_data_api(
      selected_date
    );
    console.log("selected_weight", selected_weight);

    const latest_weight =
      selected_weight?.length === 0 ? user.weight : selected_weight[0].weight;
    console.log("latest_weight", latest_weight);

    const calorie_summary = calories_count_data(
      latest_weight,
      user.weight_loss_intensity,
      user.height,
      "moderate",
      user.age,
      user.gender
    );

    setcalorie_count({
      maintainance_calories: calorie_summary.maintainance_calories,
      calories_to_loose_weight: calorie_summary.calories_to_loose_weight,
      bmi: calorie_summary.bmi,
    });
  };
  /* The commented out `useEffect` hook is intended to fetch all weight data when the component mounts.
The `useEffect` hook is used to perform side effects in function components in React. In this case,
it is calling the `fetch_all_weight_data` function when the component mounts, as indicated by the
empty dependency array `[]`. */
  useEffect(() => {
    update_calorie_data(selected_date);
  }, [selected_date]);

  return (
    <SafeAreaView style={globalStyles.background}>
      <Text>ProfilePage</Text>
      <Button
        title="Dark Theme"
        onPress={() => {
          dispatch(set_theme({ theme: "dark", colors: dark }));
        }}
      />
      <Button
        title="Light Theme"
        onPress={() => {
          dispatch(set_theme({ theme: "light", colors: light }));
        }}
      />
      <Button onPress={add_or_update_weight_data} title="Update Weight" />
      <Text>Name: {user.name}</Text>
      <Text>Age: {user.age}</Text>
      <Text>Gender: {user.gender}</Text>
      <Text>Height: {user.height}</Text>
      <Text>Weight: {user.weight}</Text>
      <Text>Target Weight: {user.target_weight}</Text>
      <Text>Weight Loss Intensity: {user.weight_loss_intensity}</Text>
      <Text>
        Goal Achievement Date:{" "}
        {weight_goal_data.goal_achievement_date.toDateString()}
      </Text>
      <Text>Weeks to goal: {weight_goal_data.weeks_to_goal_value}</Text>
      <Text>Weight to loose: {weight_goal_data.weight_to_loose}</Text>
      <Text>
        Profile Completed: {user.profile_completed === true ? "yes" : "no"}
      </Text>
      <Text>Maintainance Calories: {calorie_count.maintainance_calories}</Text>
      <Text>Calories to loose: {calorie_count.calories_to_loose_weight}</Text>
      <Text>BMI: {calorie_count.bmi}</Text>
      <Button title="Update Profile" onPress={updateProfile} />
      <Button title="Clear Profile" onPress={clearProfile} />
      <Button
        title="Go to Setup Profile"
        onPress={() => {
          navigation.navigate("setup-profile" as never);
        }}
      />
    </SafeAreaView>
  );
};
export default ProfilePage;
