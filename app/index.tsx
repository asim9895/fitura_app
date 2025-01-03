import { useAppSelector } from "@/hooks/redux_hooks";
import { Redirect } from "expo-router";
import React from "react";

const IndexPage = () => {
  const { profile_completed } = useAppSelector((state) => state.user);

  return profile_completed ? (
    <Redirect href="/calorie-tracker" />
  ) : (
    <Redirect href="/setup-profile" />
  );
};

export default IndexPage;
