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

  const navigation = useNavigation();

  const updateProfile = () => {
    dispatch(
      set_user_profile({
        name: "Jane Doe",
        age: 28,
        height: 170,
        weight: 90.55,
        gender: "Male",
        profile_completed: true,
        creation_date: new Date("2024-12-23T13:42:30.685Z"),
        weight_loss_intensity: 1,
        target_weight: 72,
        activity_factor: "light",
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
      <Text>Activity Factor: {user.activity_factor}</Text>
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
