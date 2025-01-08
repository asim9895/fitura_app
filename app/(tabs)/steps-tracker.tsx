import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppRootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { globalStylesWrapper } from "@/styles/global.style";
import DatesList from "@/components/DatesList";
import DateHeader from "@/components/DateHeader";
import { icons } from "@/data/icons";
import * as Progress from "react-native-progress";
import { format_number } from "@/utils/variables";
import { SingleStepEntry, StepData } from "@/types";
import {
  read_selected_date_steps_data_api,
  read_steps_data_api,
} from "@/api/steps_apis";
import {
  total_calories_burned_by_steps,
  total_steps_for_day,
} from "@/helpers/steps_helper";
import { set_steps_count_data } from "@/redux/slices/step_slice";
import AddStepModal from "@/components/modals/AddStepModal";
import UpdateTargetStepsModal from "@/components/modals/UpdateTargetStepsModal";
import SingleStepItem from "@/components/step_tracker_components/SingleStepItem";
import StepsMacros from "@/components/step_tracker_components/StepsMacros";
import { stepTrackerStylesWrapper } from "@/styles/app/tabs/step-tracker.style";

const StepsTrackerPage = () => {
  const dispatch = useAppDispatch();
  const { distanceKm, timeMinutes, totalCalories, speedKmh } = useAppSelector(
    (state: AppRootState) => state.step
  );
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const stepTrackerStyles = stepTrackerStylesWrapper(colors);

  const [steps_data, setsteps_data] = useState<SingleStepEntry[]>([]);
  const [add_step_modal, setadd_step_modal] = useState(false);
  const [update_target_steps, setupdate_target_steps] = useState(false);
  const [all_steps_data, setall_steps_data] = useState<StepData[]>([]);

  const { selected_date, target_steps, weight } = useAppSelector(
    (state: AppRootState) => state.user
  );

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
      <AddStepModal
        add_step_modal={add_step_modal}
        setadd_step_modal={setadd_step_modal}
        fetch_selected_date_step_data={fetch_selected_date_step_data}
        fetch_all_steps_data={fetch_all_steps_data}
      />

      <UpdateTargetStepsModal
        setupdate_target_steps={setupdate_target_steps}
        update_target_steps={update_target_steps}
      />

      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DateHeader
        days={
          all_steps_of_achieved_goal?.filter((item) => item.condition === true)
            .length
        }
      />
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
        <View style={stepTrackerStyles.main_container}>
          <View style={stepTrackerStyles.header_container}>
            <View>
              <Text style={stepTrackerStyles.header_title}>Steps</Text>
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
            <View style={stepTrackerStyles.step_count_container}>
              <Image source={icons.shoe} style={{ width: 50, height: 50 }} />
              <Text style={stepTrackerStyles.total_steps}>
                {format_number(total_steps)}
              </Text>
              <Text style={stepTrackerStyles.target_steps}>
                {format_number(target_steps)}
              </Text>
            </View>
          </View>

          <StepsMacros
            timeMinutes={timeMinutes}
            totalCalories={totalCalories}
            distanceKm={distanceKm}
            speedKmh={speedKmh}
            total_steps={total_steps}
          />
        </View>

        {steps_data?.length > 0 && (
          <View style={stepTrackerStyles.step_data_container}>
            <Text style={stepTrackerStyles.header_title}>Steps</Text>
            <View style={stepTrackerStyles.add_button_container}>
              <TouchableOpacity
                onPress={() => setadd_step_modal(true)}
                style={stepTrackerStyles.add_button}
              >
                <Image
                  source={icons.plus}
                  style={stepTrackerStyles.add_button_icon}
                  tintColor={colors.light_gray}
                />
                <Text style={stepTrackerStyles.add_button_text}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{ marginBottom: 150 }}>
          {steps_data.length > 0 ? (
            steps_data.map((step: SingleStepEntry) => {
              return (
                <SingleStepItem
                  key={step.id}
                  step={step}
                  fetch_all_steps_data={fetch_all_steps_data}
                  fetch_selected_date_step_data={fetch_selected_date_step_data}
                />
              );
            })
          ) : (
            <View style={stepTrackerStyles.no_steps_container}>
              <Text style={stepTrackerStyles.no_steps_text}>
                No steps added
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setadd_step_modal(true);
                }}
                style={[stepTrackerStyles.add_button, { marginTop: 10 }]}
              >
                <Image
                  source={icons.plus}
                  style={stepTrackerStyles.add_button_icon}
                  tintColor={colors.light_gray}
                />
                <Text style={stepTrackerStyles.add_button_text}>Add Steps</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default StepsTrackerPage;
