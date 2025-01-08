import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { icons } from "@/data/icons";
import { font_family } from "@/theme/font_family";
import { remove_selected_date_step_data } from "@/api/steps_apis";

interface SingleStepItemProps {
  step: {
    id: string;
    day_time: string;
    steps: number;
    step_frequency: number;
    pace: string;
  };
  fetch_selected_date_step_data: any;
  fetch_all_steps_data: () => Promise<void>;
}

const SingleStepItem: React.FC<SingleStepItemProps> = ({
  step,
  fetch_all_steps_data,
  fetch_selected_date_step_data,
}) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const { selected_date } = useAppSelector((state: AppRootState) => state.user);
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
          <Image source={icons.shoe} style={{ width: 30, height: 30 }} />
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
            Steps: <Text style={{ color: colors.button }}>{step.steps}</Text>
          </Text>
          <Text
            style={{
              color: colors.light_gray,
              fontSize: 11,
              fontFamily: font_family.font_semibold,
            }}
          >
            Pace: <Text style={{ color: colors.button }}>{step.pace}</Text>
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
          await remove_selected_date_step_data(selected_date, step.id);
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
};

export default SingleStepItem;

const styles = StyleSheet.create({});
