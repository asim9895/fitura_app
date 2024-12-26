import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import { useNavigation } from "expo-router";
import { set_user_profile } from "@/redux/slices/user_slice";
import { useAppDispatch } from "@/hooks/redux_hooks";
import { todays_date } from "@/utils/variables";

const SetupProfilePage = () => {
  const [progress, setprogress] = useState(0.2);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
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
      {progress === 1 && (
        <Button
          title="Go to Dashboard"
          onPress={() => {
            console.log("go to setup profile");
            navigation.navigate("(tabs)" as never);
          }}
        />
      )}
    </View>
  );
};

export default SetupProfilePage;

const styles = StyleSheet.create({});
