import { StyleSheet, View } from "react-native";
import React from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { Redirect } from "expo-router";

const IndexPage = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <View>
      {user.profile_completed ? (
        <Redirect href={"/calorie-tracker"} />
      ) : (
        <Redirect href={"/setup-profile"} />
      )}
    </View>
  );
};

export default IndexPage;

const styles = StyleSheet.create({});
