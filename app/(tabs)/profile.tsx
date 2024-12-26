import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
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
} from "@/redux/slices/user_slice";
import { todays_date } from "@/utils/variables";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const navigation = useNavigation();

  const updateProfile = () => {
    dispatch(
      set_user_profile({
        name: "Jane Doe",
        age: 28,
        height: "170",
        weight: "60",
        gender: "female",
        profile_completed: true,
        creation_date: new Date("2024-12-23T13:42:30.685Z"),
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
  const globalStyles = globalStylesWrapper(colors);

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
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.age}</Text>
      <Text>Age: {user.gender}</Text>
      <Text>Height: {user.height}</Text>
      <Text>Weight: {user.weight}</Text>
      <Text>
        Profile Completed: {user.profile_completed === true ? "yes" : "no"}
      </Text>
      <Button title="Update Profile" onPress={updateProfile} />
      <Button title="Clear Profile" onPress={clearProfile} />
      <Button
        title="Go to Setup Profile"
        onPress={() => {
          console.log("go to setup profile");
          navigation.navigate("setup-profile" as never);
        }}
      />
    </SafeAreaView>
  );
};

export default ProfilePage;
