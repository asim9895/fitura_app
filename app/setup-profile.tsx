import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import { useNavigation } from "expo-router";
import {
  clear_user_profile,
  set_user_profile,
} from "@/redux/slices/user_slice";
import { useAppDispatch } from "@/hooks/redux_hooks";
import { remove_all_step_data } from "@/api/steps_apis";
import { todays_date } from "@/utils/variables";
import { remove_all_food_data } from "@/api/food_apis";
import { remove_all_calorie_data } from "@/api/calorie_apis";
import { remove_all_weight_data } from "@/api/weight_apis";

const SetupProfilePage = () => {
  const [progress, setprogress] = useState(0.2);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

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

  const add_or_update_food = async () => {
    await remove_all_step_data();
  };

  const clearProfile = async () => {
    await remove_all_food_data();
    await remove_all_calorie_data();
    await remove_all_step_data();
    await remove_all_weight_data();
    dispatch(clear_user_profile());
    navigation.navigate("setup-profile" as never);
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
      <Button onPress={add_or_update_food} title="Remove All Step Data" />
      <Text>SetupProfilePage</Text>
      <Progress.Bar
        progress={progress}
        width={200}
        height={10}
        borderRadius={25}
        color="#fa6c3b"
        unfilledColor="#ffeeea"
        borderColor="#ffeeea"
      />
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
      <Button title="Clear Profile" onPress={clearProfile} />
      {progress === 1 && (
        <Button
          title="Go to Dashboard"
          onPress={() => {
            navigation.navigate("(tabs)" as never);
          }}
        />
      )}
    </View>
  );
};

export default SetupProfilePage;

const styles = StyleSheet.create({});
