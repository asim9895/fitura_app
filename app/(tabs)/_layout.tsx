import { Easing, Image, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { AppRootState } from "@/redux/store";
import { Colors } from "@/theme/colors";
import { useSelector } from "react-redux";
import { font_family } from "@/theme/font_family";
import { icons } from "@/data/icons";

const TabsLayout = () => {
  const { colors }: { colors: Colors } = useSelector(
    (state: AppRootState) => state.theme
  );
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.light_gray,
        headerShown: false,
        tabBarShowLabel: true,
        animation: "none",
        tabBarLabelStyle: {
          fontFamily: font_family.poppins_medium,
          fontSize: 11,
        },
        lazy: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: colors.background,
          borderTopWidth: 0.7,
          borderColor: colors.foreground,
          elevation: 0,
          height: Platform.OS === "ios" ? 85 : 70,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="calorie-tracker"
        options={{
          tabBarLabel: "Calories",
          // transitionSpec: {
          //   animation: "timing",
          //   config: {
          //     duration: 150,
          //     easing: Easing.inOut(Easing.ease),
          //   },
          // },
          // sceneStyleInterpolator: ({ current }) => ({
          //   sceneStyle: {
          //     opacity: current.progress.interpolate({
          //       inputRange: [-1, 0, 1],
          //       outputRange: [0, 1, 0],
          //     }),
          //   },
          // }),
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? icons.calorie_filled : icons.calorie_outlined}
              style={{ width: 23, height: 23, marginBottom: 5 }}
              tintColor={focused ? colors.text : colors.light_gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="steps-tracker"
        options={{
          tabBarLabel: "Steps",
          // transitionSpec: {
          //   animation: "timing",
          //   config: {
          //     duration: 150,
          //     easing: Easing.inOut(Easing.ease),
          //   },
          // },
          // sceneStyleInterpolator: ({ current }) => ({
          //   sceneStyle: {
          //     opacity: current.progress.interpolate({
          //       inputRange: [-1, 0, 1],
          //       outputRange: [0, 1, 0],
          //     }),
          //   },
          // }),
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? icons.steps_filled : icons.steps_outlined}
              style={{ width: 23, height: 23, marginBottom: 5 }}
              tintColor={focused ? colors.text : colors.light_gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="water-tracker"
        options={{
          tabBarLabel: "Water",
          // transitionSpec: {
          //   animation: "timing",
          //   config: {
          //     duration: 150,
          //     easing: Easing.inOut(Easing.ease),
          //   },
          // },
          // sceneStyleInterpolator: ({ current }) => ({
          //   sceneStyle: {
          //     opacity: current.progress.interpolate({
          //       inputRange: [-1, 0, 1],
          //       outputRange: [0, 1, 0],
          //     }),
          //   },
          // }),
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? icons.water_filled : icons.water_outlined}
              style={{ width: 23, height: 23, marginBottom: 5 }}
              tintColor={focused ? colors.text : colors.light_gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          // transitionSpec: {
          //   animation: "timing",
          //   config: {
          //     duration: 150,
          //     easing: Easing.inOut(Easing.ease),
          //   },
          // },
          // sceneStyleInterpolator: ({ current }) => ({
          //   sceneStyle: {
          //     opacity: current.progress.interpolate({
          //       inputRange: [-1, 0, 1],
          //       outputRange: [0, 1, 0],
          //     }),
          //   },
          // }),

          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? icons.profile_filled : icons.profile_outlined}
              style={{ width: 23, height: 23, marginBottom: 5 }}
              tintColor={focused ? colors.text : colors.light_gray}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
