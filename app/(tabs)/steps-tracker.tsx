import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppRootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { globalStylesWrapper } from "@/styles/global.style";
import DatesList from "@/components/DatesList";
import DateHeader from "@/components/DateHeader";
import { isSameDay } from "date-fns";
import { font_family } from "@/theme/font_family";
import { icons } from "@/data/icons";
import * as Progress from "react-native-progress";
import {
  average_pace,
  avergae_step_frequency,
  format_number,
} from "@/utils/variables";
import { SingleStepEntry, StepData } from "@/types";
import Modal from "react-native-modal";
import {
  read_selected_date_steps_data_api,
  read_steps_data_api,
  remove_selected_date_step_data,
  update_steps_data_api,
} from "@/api/steps_apis";
import { generate_uuid } from "@/utils/generate_uuid";
import {
  total_calories_burned_by_steps,
  total_steps_for_day,
} from "@/helpers/steps_helper";
import { convert_minutes_to_hour_minutes } from "@/utils/time_converter";
import { set_steps_count_data } from "@/redux/slices/step_slice";
import { update_steps_target } from "@/redux/slices/user_slice";

const StepsTrackerPage = () => {
  const dispatch = useAppDispatch();
  const { distanceKm, timeMinutes, totalCalories, speedKmh } = useAppSelector(
    (state: AppRootState) => state.step
  );

  const [steps_data, setsteps_data] = useState<SingleStepEntry[]>([]);
  const [add_step_modal, setadd_step_modal] = useState(false);
  const [update_target_steps, setupdate_target_steps] = useState(false);
  const [all_steps_data, setall_steps_data] = useState<StepData[]>([]);
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const { selected_date, target_steps, weight } = useAppSelector(
    (state: AppRootState) => state.user
  );

  const [update_target_steps_form, setupdate_target_steps_form] =
    useState(target_steps);

  const [add_step, setadd_step] = useState<{
    day_time: string;
    steps: number;
    step_frequency: number;
    pace: string;
  }>({
    day_time: "",
    steps: 0,
    step_frequency: avergae_step_frequency,
    pace: average_pace,
  });

  const globalStyles = globalStylesWrapper(colors);

  const fetch_selected_date_step_data = async (selected_date: Date) => {
    const selected_day_steps_data = await read_selected_date_steps_data_api(
      selected_date
    );

    setsteps_data(selected_day_steps_data);
  };

  const fetch_all_steps_data = async () => {
    const all_steps_data = await read_steps_data_api();

    setall_steps_data(all_steps_data?.records);
  };
  useEffect(() => {
    fetch_selected_date_step_data(selected_date);
  }, [selected_date]);

  useEffect(() => {
    fetch_all_steps_data();
  }, []);

  const all_steps_of_achieved_goal = all_steps_data?.map((steps: any) => {
    const date = new Date(steps.date);

    const steps_of_day = steps?.data?.reduce((total: any, step: any) => {
      return total + step.steps;
    }, 0);

    return {
      date: date,
      count: steps_of_day,
      condition:
        target_steps === undefined ||
        target_steps === null ||
        target_steps === 0
          ? false
          : steps_of_day < Number(target_steps)
          ? false
          : true,
    };
  });

  const add_steps_data = async () => {
    const steps_data_to_push: SingleStepEntry = {
      id: generate_uuid(),
      day_time: add_step.day_time,
      steps: add_step.steps,
      step_frequency: add_step.step_frequency,
      pace: add_step.pace,
    };

    const request = await update_steps_data_api(
      steps_data_to_push,
      selected_date
    );
    if (request?.status === 200) {
      setadd_step_modal(false);
      await fetch_selected_date_step_data(selected_date);
      await fetch_all_steps_data();
    } else {
      console.log("error");
    }
  };

  const update_target_step_data = async () => {
    dispatch(update_steps_target({ target_steps: update_target_steps_form }));
    setupdate_target_steps(false);
  };

  const total_steps = total_steps_for_day(all_steps_data, selected_date);

  useEffect(() => {
    const calories_burned = total_calories_burned_by_steps(
      weight,
      all_steps_data,
      steps_data,
      selected_date,
      total_steps
    );

    const data = {
      totalCalories:
        Number.isNaN(calories_burned.totalCalories) || calories_burned === null
          ? 0
          : calories_burned.totalCalories,
      timeMinutes:
        Number.isNaN(calories_burned.timeMinutes) || calories_burned === null
          ? 0
          : calories_burned.timeMinutes,
      speedKmh:
        Number.isNaN(calories_burned.speedKmh) || calories_burned === null
          ? 0
          : calories_burned.speedKmh,
      distanceKm:
        Number.isNaN(calories_burned.distanceKm) || calories_burned === null
          ? 0
          : calories_burned.distanceKm,
    };

    dispatch(set_steps_count_data(data));
  }, [weight, all_steps_data, steps_data, selected_date, total_steps]);

  return (
    <View style={[globalStyles.background]}>
      <View>
        <Modal
          isVisible={add_step_modal}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          backdropOpacity={0.7}
          backdropColor={colors.text_black}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: colors.foreground,
                padding: 10,
                borderRadius: 10,
                width: "90%",
                paddingVertical: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.font_bold,
                  color: colors.text,
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Add Steps
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 12,
                  fontFamily: font_family.font_semibold,
                  paddingHorizontal: 15,
                }}
              >
                Activity
              </Text>
              <TextInput
                placeholder="Morning, Wedding, Hiking"
                placeholderTextColor={colors.light_gray}
                style={{
                  color: colors.text,
                  fontFamily: font_family.font_semibold,
                  fontSize: 15,
                  backgroundColor: colors.background,
                  padding: 10,
                  margin: 10,
                  marginTop: 4,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.background,
                }}
                onChangeText={(value) => {
                  setadd_step((prev) => ({
                    ...prev,
                    day_time: value,
                  }));
                }}
              />

              <Text
                style={{
                  color: colors.text,
                  fontSize: 12,
                  fontFamily: font_family.font_semibold,
                  paddingHorizontal: 15,
                }}
              >
                Steps
              </Text>
              <TextInput
                placeholder="Eg: Steps: 4242"
                keyboardType="numeric"
                placeholderTextColor={colors.light_gray}
                style={{
                  color: colors.text,
                  fontFamily: font_family.font_semibold,
                  fontSize: 15,
                  backgroundColor: colors.background,
                  padding: 10,
                  margin: 10,
                  marginTop: 4,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.background,
                }}
                onChangeText={(value) => {
                  setadd_step((prev) => ({
                    ...prev,
                    steps: Number(value),
                  }));
                }}
              />
              <Text
                style={{
                  color: colors.text,
                  fontSize: 12,
                  fontFamily: font_family.font_semibold,
                  paddingHorizontal: 15,
                }}
              >
                Step Frequency (/ minute) (default: 100)
              </Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Eg: 100 "
                placeholderTextColor={colors.light_gray}
                style={{
                  color: colors.text,
                  fontFamily: font_family.font_semibold,
                  fontSize: 15,
                  backgroundColor: colors.background,
                  padding: 10,
                  margin: 10,
                  marginTop: 4,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.background,
                }}
                onChangeText={(value) => {
                  setadd_step((prev) => ({
                    ...prev,
                    step_frequency: Number(value),
                  }));
                }}
              />
              <Text
                style={{
                  color: colors.text,
                  fontSize: 12,
                  fontFamily: font_family.font_semibold,
                  paddingHorizontal: 15,
                }}
              >
                Pace (default: 13'11)
              </Text>
              <TextInput
                placeholder="Eg: 13'11"
                placeholderTextColor={colors.light_gray}
                style={{
                  color: colors.text,
                  fontFamily: font_family.font_semibold,
                  fontSize: 15,
                  backgroundColor: colors.background,
                  padding: 10,
                  margin: 10,
                  marginTop: 4,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.background,
                }}
                onChangeText={(value) => {
                  setadd_step((prev) => ({
                    ...prev,
                    pace: value,
                  }));
                }}
              />

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  onPress={add_steps_data}
                  style={{
                    width: "45%",
                    backgroundColor: colors.button,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text_white,
                      textAlign: "center",
                      fontFamily: font_family.font_bold,
                      fontSize: 17,
                    }}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // remove_all_step_data();
                    setadd_step_modal(false);
                  }}
                  style={{
                    width: "45%",
                    backgroundColor: colors.background,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      textAlign: "center",
                      fontFamily: font_family.font_bold,
                      fontSize: 17,
                    }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View>
        <Modal
          isVisible={update_target_steps}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          backdropOpacity={0.7}
          backdropColor={colors.text_black}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: colors.foreground,
                padding: 10,
                borderRadius: 10,
                width: "90%",
                paddingVertical: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.font_bold,
                  color: colors.text,
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Update Target Steps
              </Text>

              <TextInput
                placeholder="Eg: Steps: 4242"
                keyboardType="numeric"
                value={update_target_steps_form.toString()}
                placeholderTextColor={colors.light_gray}
                style={{
                  color: colors.text,
                  fontFamily: font_family.font_semibold,
                  fontSize: 15,
                  backgroundColor: colors.background,
                  padding: 15,
                  margin: 10,
                  marginTop: 15,
                  borderRadius: 10,
                }}
                onChangeText={(value) => {
                  setupdate_target_steps_form(Number(value));
                }}
              />

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity
                  onPress={update_target_step_data}
                  style={{
                    width: "45%",
                    backgroundColor: colors.button,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text_white,
                      textAlign: "center",
                      fontFamily: font_family.font_bold,
                      fontSize: 17,
                    }}
                  >
                    Update
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // remove_all_step_data();
                    setupdate_target_steps(false);
                  }}
                  style={{
                    width: "45%",
                    backgroundColor: colors.background,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      textAlign: "center",
                      fontFamily: font_family.font_bold,
                      fontSize: 17,
                    }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DateHeader days={all_steps_of_achieved_goal?.length} />
      <DatesList
        onDateSelect={(date: any) => {
          // Do something with the selected date
        }}
        achievement_dates={all_steps_of_achieved_goal}
        route="steps"
      />

      <ScrollView
        style={{ marginHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: colors.foreground,
            borderRadius: 10,
            padding: 15,
            marginTop: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              width: "100%",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  fontSize: 18,
                  color: colors.text,
                  width: 100,
                }}
              >
                Steps
              </Text>
            </View>
            <TouchableOpacity onPress={() => setupdate_target_steps(true)}>
              <Image
                source={icons.edit}
                style={{ width: 18, height: 18 }}
                tintColor={colors.light_gray}
              />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center", marginVertical: 15 }}>
            <Progress.Circle
              progress={total_steps / target_steps}
              color={colors.button}
              thickness={10}
              size={230}
              borderWidth={1}
              unfilledColor={colors.background}
              strokeCap="round"
              borderColor={colors.background}
            />
            <View
              style={{
                zIndex: 2,
                top: 40,
                position: "absolute",
                alignItems: "center",
              }}
            >
              <Image source={icons.shoe} style={{ width: 50, height: 50 }} />
              <Text
                style={{
                  color: colors.text,
                  fontFamily: font_family.font_bold,
                  fontSize: 30,
                  marginTop: 10,
                }}
              >
                {format_number(total_steps)}
              </Text>
              <Text
                style={{
                  color: colors.light_gray,
                  fontFamily: font_family.font_semibold,
                  fontSize: 16,
                  marginTop: 0,
                }}
              >
                {format_number(target_steps)}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.light_gray,
                  fontSize: 11,
                  marginTop: 5,
                }}
              >
                Calories Burned:{" "}
                <Text
                  style={{
                    fontFamily: font_family.font_bold,
                    color: colors.button,
                    fontSize: 11,
                  }}
                >
                  {" "}
                  {format_number(Number(totalCalories))} kcal
                </Text>
              </Text>
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.light_gray,
                  fontSize: 11,
                }}
              >
                Avg Speed:{" "}
                <Text
                  style={{
                    fontFamily: font_family.font_bold,
                    color: colors.button,
                    fontSize: 11,
                  }}
                >
                  {total_steps === 0 ? 0 : format_number(speedKmh)} km / h
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.light_gray,
                  fontSize: 11,
                }}
              >
                Distance Covered:{" "}
                <Text
                  style={{
                    fontFamily: font_family.font_bold,
                    color: colors.button,
                    fontSize: 11,
                  }}
                >
                  {format_number(distanceKm)} km
                </Text>
              </Text>
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  color: colors.light_gray,
                  fontSize: 11,
                }}
              >
                Time:{" "}
                <Text
                  style={{
                    fontFamily: font_family.font_bold,
                    color: colors.button,
                    fontSize: 11,
                  }}
                >
                  {" "}
                  {convert_minutes_to_hour_minutes(Number(timeMinutes))}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {steps_data?.length > 0 && (
          <View
            style={{
              marginTop: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: font_family.font_semibold,
                fontSize: 18,
                width: 100,
                color: colors.text,
              }}
            >
              Steps
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => setadd_step_modal(true)}
                style={{
                  backgroundColor: colors.foreground,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 3,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}
              >
                <Image
                  source={icons.plus}
                  style={{
                    width: 13,
                    height: 13,
                    marginRight: 5,
                    marginBottom: 2,
                  }}
                  tintColor={colors.light_gray}
                />
                <Text
                  style={{
                    fontFamily: font_family.font_semibold,
                    fontSize: 15,
                    color: colors.text,
                    paddingTop: 2,
                  }}
                >
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{ marginBottom: 150 }}>
          {steps_data.length > 0 ? (
            steps_data.map((step: SingleStepEntry) => {
              return (
                <View
                  key={step.id}
                  style={{
                    backgroundColor: colors.foreground,
                    marginTop: 10,
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "80%",
                    }}
                  >
                    <View style={{ width: "20%" }}>
                      <Image
                        source={icons.shoe}
                        style={{ width: 30, height: 30 }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "70%",
                      }}
                    >
                      <Text
                        numberOfLines={2}
                        style={{
                          color: colors.text,
                          fontSize: 16,
                          fontFamily: font_family.font_medium,
                          textTransform: "capitalize",
                        }}
                      >
                        {step.day_time}
                      </Text>
                      <Text
                        style={{
                          color: colors.light_gray,
                          fontSize: 11,
                          fontFamily: font_family.font_semibold,
                        }}
                      >
                        Steps:{" "}
                        <Text style={{ color: colors.button }}>
                          {step.steps}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          color: colors.light_gray,
                          fontSize: 11,
                          fontFamily: font_family.font_semibold,
                        }}
                      >
                        Pace:{" "}
                        <Text style={{ color: colors.button }}>
                          {step.pace}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          color: colors.light_gray,
                          fontSize: 11,
                          fontFamily: font_family.font_semibold,
                        }}
                      >
                        Step Frequency:{" "}
                        <Text style={{ color: colors.button }}>
                          {step.step_frequency} / minute
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={async () => {
                      await remove_selected_date_step_data(
                        selected_date,
                        step.id
                      );
                      await fetch_selected_date_step_data(selected_date);
                      await fetch_all_steps_data();
                    }}
                  >
                    <Image
                      style={{ width: 22, height: 22 }}
                      source={icons.remove}
                      tintColor={colors.light_gray}
                    />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View
              style={{
                marginTop: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: font_family.font_semibold,
                  color: colors.text,
                }}
              >
                No steps added
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setadd_step_modal(true);
                }}
                style={{
                  backgroundColor: colors.foreground,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  marginTop: 10,
                }}
              >
                <Image
                  source={icons.plus}
                  style={{
                    width: 13,
                    height: 13,
                    marginRight: 10,
                  }}
                  tintColor={colors.light_gray}
                />
                <Text
                  style={{
                    fontFamily: font_family.font_semibold,
                    fontSize: 15,
                    color: colors.text,
                    paddingTop: 2,
                  }}
                >
                  Add Steps
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default StepsTrackerPage;
