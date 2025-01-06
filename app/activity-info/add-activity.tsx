import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppRootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { globalStylesWrapper } from "@/styles/global.style";
import { font_family } from "@/theme/font_family";
import { icons } from "@/data/icons";
import { DayTime, SingleActivityEntry } from "@/types";

import { generate_uuid } from "@/utils/generate_uuid";
import { useRouter } from "expo-router";
import {
  read_exercises_data_api,
  remove_exercise_by_id,
} from "@/api/exercise_apis";
import { add_activities_data_api } from "@/api/activity_apis";
import ExerciseOptionModal from "@/components/modals/ExerciseOptionModal";

const AddActivityPage = () => {
  const [exercise_data, setexercise_data] = useState<SingleActivityEntry[]>([]);
  const [selected_exercises, setselected_exercises] = useState<
    SingleActivityEntry[]
  >([]);

  const router = useRouter();
  const { colors } = useSelector((state: AppRootState) => state.theme);
  const { selected_date } = useSelector((state: AppRootState) => state.user);
  const globalStyles = globalStylesWrapper(colors);
  const [current_exercise_id, setcurrent_exercise_id] = useState("");
  const [show_options, setshow_options] = useState(false);

  const fetch_exercise_items = async () => {
    const request = await read_exercises_data_api();

    setexercise_data(request.records);
  };

  useEffect(() => {
    fetch_exercise_items();
  }, []);

  const handle_acitivity_add = async () => {
    const data = selected_exercises?.map((item: SingleActivityEntry) => {
      return {
        ...item,
        id: generate_uuid(),
      };
    });

    const request = await add_activities_data_api(data, selected_date);

    if (request?.status === 200) {
      router.push("/calorie-tracker");
    } else {
      console.log("error", request);
    }
  };

  const remove_exercise = async () => {
    const request = await remove_exercise_by_id(current_exercise_id);
    console.log(request);

    if (request.status === 200) {
      await fetch_exercise_items();
    } else {
      console.log(request);
    }
  };

  return (
    <SafeAreaView style={globalStyles.background}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.foreground,
          zIndex: 1000,
        }}
      >
        {/* Dropdown Section */}
        <Text
          style={{
            color: colors.text,
            fontFamily: font_family.font_semibold,
            fontSize: 17,
          }}
        >
          Add Activity
        </Text>

        {/* Close Button */}
        <TouchableOpacity
          style={{
            padding: 8,
          }}
          onPress={() => router.back()}
        >
          <Image
            source={icons.cross}
            style={{ width: 16, height: 16, marginRight: 5 }}
            tintColor={colors.text}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 10,
          marginHorizontal: 15,
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 0,
          paddingVertical: 9,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.foreground,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: "48%",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            router.push("/activity-info/add-activity-log");
          }}
        >
          <MaterialCommunityIcons
            name="dumbbell"
            size={20}
            color={colors.light_gray}
            style={{ marginRight: 10, marginBottom: 2 }}
          />
          <Text
            style={{
              color: colors.text,
              fontFamily: font_family.font_medium,
              fontSize: 14,
            }}
          >
            Quick Log
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.foreground,
            borderRadius: 10,
            paddingVertical: 7,
            paddingHorizontal: 20,
            width: "48%",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            router.push("/exercise/add-exercise");
          }}
        >
          <MaterialCommunityIcons
            name="run"
            size={20}
            color={colors.light_gray}
            style={{ marginRight: 10, marginBottom: 2 }}
          />
          <Text
            style={{
              color: colors.text,
              fontFamily: font_family.font_medium,
              fontSize: 14,
            }}
          >
            Create Exercise
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          placeholder="Search Exercise"
          placeholderTextColor={colors.light_gray}
          style={{
            backgroundColor: colors.foreground,
            padding: 13,
            borderRadius: 8,
            marginVertical: 10,
            marginHorizontal: 15,
            fontFamily: font_family.font_medium,
            color: colors.text,
          }}
        />
      </View>
      <ExerciseOptionModal
        setshow_options={setshow_options}
        show_options={show_options}
        setcurrent_exercise_id={setcurrent_exercise_id}
        remove_exercise={remove_exercise}
        current_exercise_id={current_exercise_id}
      />
      <ScrollView
        style={{ marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            color: colors.text,
            fontFamily: font_family.font_semibold,
            fontSize: 18,
            marginVertical: 10,
          }}
        >
          Exercises
        </Text>

        {exercise_data.map((exercise, index) => {
          const existingFoodIndex = selected_exercises.findIndex(
            (item) => item.id === exercise.id
          );
          return (
            <View
              key={exercise.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.foreground,
                marginBottom: index === exercise_data.length - 1 ? 100 : 0,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (existingFoodIndex !== -1) {
                      setselected_exercises(
                        selected_exercises.filter(
                          (item) => item.id !== exercise.id
                        )
                      );
                    } else {
                      setselected_exercises([...selected_exercises, exercise]);
                    }
                  }}
                >
                  <Image
                    source={
                      existingFoodIndex !== -1
                        ? icons.check
                        : icons.plus_covered
                    }
                    style={{ width: 30, height: 30, marginRight: 15 }}
                    tintColor={
                      existingFoodIndex !== -1
                        ? colors.button
                        : colors.light_gray
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: Dimensions.get("window").width / 1.4 }}
                  onPress={() => {
                    setcurrent_exercise_id(exercise.id);
                    setshow_options(true);
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: font_family.font_semibold,
                      color: colors.text,
                      fontSize: 16,
                      width: 300,
                    }}
                  >
                    {exercise.activity}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: font_family.font_medium,
                      color: colors.light_gray,
                      fontSize: 13,
                      marginTop: 3,
                    }}
                  >
                    {exercise.burned} calories
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: font_family.font_medium,
                      color: colors.light_gray,
                      fontSize: 13,
                      marginTop: 3,
                    }}
                  >
                    {exercise.hour} hours {exercise.minutes} minutes
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={icons.right_arrow}
                style={{ width: 16, height: 16 }}
                tintColor={colors.light_gray}
              />
            </View>
          );
        })}
      </ScrollView>
      {selected_exercises?.length > 0 && (
        <View
          style={{
            position: "absolute",
            height: 70,
            bottom: 0,
            width: "100%",
            zIndex: 99,
            backgroundColor: colors.foreground,
            padding: 10,
            paddingHorizontal: 15,
            borderTopWidth: 1,
            borderTopColor: colors.foreground,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: colors.text_black,
                fontFamily: font_family.font_semibold,
                fontSize: 19,
                backgroundColor: colors.button,
                width: 30,
                height: 30,
                textAlign: "center",
                borderRadius: 18,
                paddingTop: 3,
              }}
            >
              {selected_exercises?.length}
            </Text>
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_semibold,
                fontSize: 22,
                marginLeft: 15,
              }}
            >
              {selected_exercises.reduce(
                (total, food) => total + food.burned,
                0
              )}{" "}
              kcal
            </Text>
          </View>

          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: colors.background,
              paddingHorizontal: 40,
              borderRadius: 10,
            }}
            onPress={handle_acitivity_add}
          >
            <Text
              style={{
                fontFamily: font_family.font_semibold,
                fontSize: 22,
                color: colors.text,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddActivityPage;
