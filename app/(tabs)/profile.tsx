import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import React from "react";
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
import { goal_achievement_date } from "@/utils/weight_loss_formulas";
import {
  add_or_update_weight_of_selected_data_api,
  read_weight_data_api,
} from "@/api/weight_apis";
import { icons } from "@/data/icons";
import { profileStylesWrapper } from "@/styles/app/tabs/profile.style";
import ProfileCard from "@/components/ProfileCard";
import { height_options } from "@/data/options";

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

  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={[profileStyles.header_container]}>
        <Text style={profileStyles.header_text}>Profile</Text>
      </View>

      <ScrollView style={{ marginTop: 15, marginBottom: 100 }}>
        <ProfileCard show_icon={icons.crown} title="Name" value={user.name} />
        <ProfileCard
          show_icon={icons.crown}
          title="Gender"
          value={user.gender}
        />
        <ProfileCard
          show_icon={icons.crown}
          title="Height"
          value={`${
            height_options?.find((item) => item.cm === user.height)?.cm
          }cm or ${
            height_options?.find((item) => item.cm === user.height)?.display
          }`}
        />
        <ProfileCard
          show_icon={icons.crown}
          title="Weight"
          value={`${user.weight} Kg`}
        />
        <ProfileCard
          show_icon={icons.crown}
          title="Target Weight"
          value={`${user.target_weight} Kg`}
        />
        <ProfileCard
          show_icon={icons.crown}
          title="Age"
          value={`${user.age} years`}
        />
        <ProfileCard
          show_icon={icons.crown}
          title="Target Water Intake"
          value={`${format_number(user?.target_water)} ml`}
        />
        <ProfileCard
          show_icon={icons.crown}
          title="Target Steps"
          value={user.target_steps?.toString()}
        />
        <ProfileCard
          show_icon={icons.crown}
          title="Weight Loss Intensity"
          value={`${user.weight_loss_intensity?.toString()} kg / week`}
        />
        <ProfileCard
          show_icon={icons.crown}
          title="Activity Factor"
          value={`${user.activity_factor?.toString()}`}
        />
      </ScrollView>

      <Button onPress={add_or_update_weight_data} title="Update Weight" />

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
