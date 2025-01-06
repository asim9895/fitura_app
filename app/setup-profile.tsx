import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import { Link, router, Stack, useNavigation, useRouter } from "expo-router";
import {
  clear_user_profile,
  set_user_profile,
} from "@/redux/slices/user_slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { remove_all_step_data } from "@/api/steps_apis";
import { todays_date } from "@/utils/variables";
import {
  add_food_data_api,
  read_foods_data_api,
  remove_all_food_data,
} from "@/api/food_apis";
import { remove_all_calorie_data } from "@/api/calorie_apis";
import {
  read_weight_data_api,
  remove_all_weight_data,
} from "@/api/weight_apis";
import { AppRootState } from "@/redux/store";
import { SingleCalorieEatenEntry } from "@/types";
import { generate_uuid } from "@/utils/generate_uuid";

const SetupProfilePage = () => {
  const [progress, setprogress] = useState(0.2);
  const [food_data, setfood_data] = useState([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { gender, activity_factor } = useAppSelector(
    (state: AppRootState) => state.user
  );

  const updateProfile = () => {
    dispatch(
      set_user_profile({
        name: "Jane Doe",
        age: 28,
        height: 170,
        weight: 90.55,
        gender: "Female",
        profile_completed: true,
        creation_date: todays_date,
        weight_loss_intensity: 0.75,
        target_weight: 72,
        activity_factor: "sedentary",
      })
    );
  };

  const clearProfile = async () => {
    await remove_all_food_data();
    await remove_all_calorie_data();
    await remove_all_step_data();
    await remove_all_weight_data();
    dispatch(clear_user_profile());
    router.push("/setup-profile");
  };

  const get_food_data_api = async () => {
    const request = await read_foods_data_api();

    setfood_data(request.records);
  };

  const add_or_update_food = async () => {
    // await remove_all_food_data();
    const data: SingleCalorieEatenEntry = {
      id: generate_uuid(),
      name: "100g white rice",
      calorie: 130,
      protein: 3,
      carbs: 30,
      fat: 1,
      note: "Boiled rice with extra salt",
      serving_size: 100,
      serving_unit: "g",
    };
    const request = await add_food_data_api(data);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Stack.Screen name="setup-profile" options={{ headerShown: false }} />
      <Button onPress={add_or_update_food} title="Remove All Step Data" />

      <Text>
        SetupProfilePage {gender} {activity_factor}{" "}
      </Text>
      <Progress.Bar
        progress={progress}
        width={200}
        height={10}
        borderRadius={25}
        color="#fa6c3b"
        unfilledColor="#ffeeea"
        borderColor="#ffeeea"
      />
      <Text> {JSON.stringify(food_data)}</Text>
      <Button title="First Step" onPress={() => setprogress(0.4)} />
      <Button title="Second Step" onPress={() => setprogress(0.6)} />
      <Button title="Third Step" onPress={() => setprogress(0.8)} />
      <Button
        title="Fourth Step"
        onPress={() => {
          setprogress(1.0);
          updateProfile();
        }}
      />
      <Button onPress={get_food_data_api} title="Get Food" />
      <Button onPress={add_or_update_food} title="Add Food" />
      <Button title="Clear Profile" onPress={clearProfile} />
      <Button
        title="Remove All Food"
        onPress={async () => {
          await remove_all_food_data();
        }}
      />

      <Button
        title="Go To Dashboard"
        onPress={() => {
          router.push("/(tabs)/profile");
        }}
      />
      <Button
        title="Add Calorie"
        onPress={() => {
          router.push("/calorie-info/add-calorie");
        }}
      />
    </View>
  );
};

export default SetupProfilePage;

const styles = StyleSheet.create({});
