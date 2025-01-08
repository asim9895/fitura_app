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
import { SingleStepEntry, SingleWaterEntry } from "@/types";
import { generate_uuid } from "@/utils/generate_uuid";
import { update_water_data_api } from "@/api/water_apis";

interface AddWaterIntakeModalProps {
  add_water_modal: boolean;
  setadd_water_modal: React.Dispatch<React.SetStateAction<boolean>>;
  fetch_selected_date_water_data: any;
  fetch_all_water_data: () => Promise<void>;
}

const AddWaterIntakeModal: React.FC<AddWaterIntakeModalProps> = ({
  add_water_modal,
  setadd_water_modal,
  fetch_all_water_data,
  fetch_selected_date_water_data,
}) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const { selected_date } = useAppSelector((state: AppRootState) => state.user);
  const [add_water, setadd_water] = useState<{
    day_time: string;
    intake: number;
  }>({
    day_time: "",
    intake: 0,
  });

  const add_waters_data = async () => {
    const waters_data_to_push: SingleWaterEntry = {
      id: generate_uuid(),
      day_time: add_water.day_time,
      intake: add_water.intake,
    };

    const request = await update_water_data_api(
      waters_data_to_push,
      selected_date
    );
    if (request?.status === 200) {
      setadd_water_modal(false);
      await fetch_selected_date_water_data(selected_date);
      await fetch_all_water_data();
    } else {
      console.log("error");
    }
  };

  return (
    <View>
      <Modal
        isVisible={add_water_modal}
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
                marginBottom: 10,
              }}
            >
              Add Water Intake
            </Text>
            <Text
              style={{
                color: colors.text,
                fontSize: 12,
                fontFamily: font_family.font_semibold,
                paddingHorizontal: 15,
              }}
            >
              Day Time
            </Text>
            <TextInput
              placeholder="Morning, Evening, Night"
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
                setadd_water((prev) => ({
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
              Intake
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
                setadd_water((prev) => ({
                  ...prev,
                  intake: Number(value),
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
                onPress={add_waters_data}
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
                  // remove_all_water_data();
                  setadd_water_modal(false);
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

export default AddWaterIntakeModal;

const styles = StyleSheet.create({});
