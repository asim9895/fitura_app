import { ActivityIndicator, View } from "react-native";
import React from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { Redirect } from "expo-router";

const IndexPage = () => {
  const { profile_completed } = useAppSelector((state) => state.user);

  if (profile_completed) {
    return <Redirect href="/calorie-tracker" />;
  }

  return <Redirect href="/setup-profile" />;
};

export default IndexPage;
