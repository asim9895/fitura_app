import { ActivityIndicator, View } from "react-native";
import { useAppSelector } from "@/hooks/redux_hooks";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

const IndexPage = () => {
  const { profile_completed } = useAppSelector((state) => state.user);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {profile_completed ? (
        <Redirect href="/(tabs)/calorie-tracker" />
      ) : (
        <Redirect href="/setup-profile" />
      )}
      <ActivityIndicator size="large" />
    </View>
  );
};

export default IndexPage;
