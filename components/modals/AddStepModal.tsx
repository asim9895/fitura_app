import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { font_family } from "@/theme/font_family";
import { average_pace, avergae_step_frequency } from "@/utils/variables";
import { SingleStepEntry } from "@/types";
import { generate_uuid } from "@/utils/generate_uuid";
import { update_steps_data_api } from "@/api/steps_apis";

interface AddStepModalProps {
  add_step_modal: boolean;
  setadd_step_modal: React.Dispatch<React.SetStateAction<boolean>>;
  fetch_selected_date_step_data: any;
  fetch_all_steps_data: () => Promise<void>;
}

const AddStepModal: React.FC<AddStepModalProps> = ({
  add_step_modal,
  setadd_step_modal,
  fetch_all_steps_data,
  fetch_selected_date_step_data,
}) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const { selected_date } = useAppSelector((state: AppRootState) => state.user);
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

  return (
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
  );
};

export default AddStepModal;

const styles = StyleSheet.create({});
