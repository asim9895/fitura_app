import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { Colors } from "@/theme/colors";
import { globalStylesWrapper } from "@/styles/global.style";
import { AppRootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useNavigation } from "expo-router";
import {
  clear_user_profile,
  set_user_profile,
  update_weight,
} from "@/redux/slices/user_slice";
import { format_number } from "@/utils/variables";
import {
  add_or_update_weight_of_selected_data_api,
  read_weight_data_api,
} from "@/api/weight_apis";
import { icons } from "@/data/icons";
import { profileStylesWrapper } from "@/styles/app/tabs/profile.style";
import ProfileCard from "@/components/profile_components/ProfileCard";
import { height_options } from "@/data/options";
import { generate_uuid } from "@/utils/generate_uuid";
import { CalorieEatenData, SingleCalorieEatenEntry } from "@/types";
import {
  add_food_data_api,
  read_foods_data_api,
  remove_all_food_data,
} from "@/api/food_apis";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { colors }: { colors: Colors } = useSelector(
    (state: AppRootState) => state.theme
  );

  const navigation = useNavigation();

  const profileStyles = profileStylesWrapper(colors);

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

  const { selected_date } = useSelector((state: AppRootState) => state.user);
  const globalStyles = globalStylesWrapper(colors);

  const add_or_update_weight_data = async () => {
    const weight = 96.55;
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

    console.log(request);
  };

  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={[profileStyles.header_container]}>
        <Text style={profileStyles.header_text}>Profile</Text>
      </View>

      <ScrollView style={{ marginTop: 15, marginBottom: 100 }}>
        <ProfileCard show_icon={icons.name} title="Name" value={user.name} />
        <ProfileCard
          show_icon={icons.gender}
          title="Gender"
          value={user.gender}
        />
        <ProfileCard
          show_icon={icons.height}
          title="Height"
          value={`${
            height_options?.find((item) => item.cm === user.height)?.cm
          } cm or ${
            height_options?.find((item) => item.cm === user.height)?.display
          }`}
        />
        <ProfileCard
          show_icon={icons.weight}
          title="Weight"
          value={`${user.weight} kg`}
        />
        <ProfileCard
          show_icon={icons.target_weight}
          title="Target Weight"
          value={`${user.target_weight} kg`}
        />
        <ProfileCard
          show_icon={icons.age}
          title="Age"
          value={`${user.age} years`}
        />
        <ProfileCard
          show_icon={icons.water}
          title="Target Water Intake"
          value={`${format_number(user?.target_water)} ml`}
        />
        <ProfileCard
          show_icon={icons.shoe}
          title="Target Steps"
          value={user.target_steps?.toString()}
        />
        <ProfileCard
          show_icon={icons.intensity}
          title="Weight Loss Intensity"
          value={`${user.weight_loss_intensity?.toString()} kg / week`}
        />
        <ProfileCard
          show_icon={icons.activity_factor}
          title="Activity Factor"
          value={`${user.activity_factor?.toString()}`}
        />
        <Button onPress={add_or_update_weight_data} title="Add Calorie" />
        <Button onPress={add_or_update_weight_data} title="Add Activity" />
        <Button onPress={add_or_update_food} title="Add Food" />
        <Button title="Update Profile" onPress={updateProfile} />
      </ScrollView>

      {/* <Button onPress={add_or_update_weight_data} title="Update Weight" />

     
      <Button title="Clear Profile" onPress={clearProfile} />
      <Button
        title="Go to Setup Profile"
        onPress={() => {
          navigation.navigate("setup-profile" as never);
        }}
      /> */}
    </SafeAreaView>
  );
};
export default ProfilePage;
