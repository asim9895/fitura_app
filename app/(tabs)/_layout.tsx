import { Easing, Image, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { Slot, Tabs } from "expo-router";
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
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="calorie-tracker"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.light_gray,
          headerShown: false,
          tabBarShowLabel: true,
          animation: "none",
          tabBarLabelStyle: {
            fontFamily: font_family.font_medium,
            fontSize: 11,
          },
          lazy: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: colors.background,
            borderTopWidth: 0.7,
            borderColor: colors.foreground,
            height: Platform.OS === "ios" ? 85 : 70,
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name="calorie-tracker"
          options={{
            tabBarLabel: "Calories",
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
    </View>
  );
};

export default TabsLayout;
