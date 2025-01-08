import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { font_family } from "@/theme/font_family";
import Modal from "react-native-modal";
import { update_water_target } from "@/redux/slices/user_slice";

interface UpdateTargetWaterModalProps {
  update_target_water: boolean;
  setupdate_target_water: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateTargetWaterModal: React.FC<UpdateTargetWaterModalProps> = ({
  update_target_water,
  setupdate_target_water,
}) => {
  const dispatch = useAppDispatch();
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const update_target_water_data = async () => {
    dispatch(update_water_target({ target_water: update_target_water_form }));
    setupdate_target_water(false);
  };
  const { target_water } = useAppSelector((state: AppRootState) => state.user);
  const [update_target_water_form, setupdate_target_water_form] =
    useState(target_water);
  return (
    <View>
      <Modal
        isVisible={update_target_water}
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
              Update Target Water
            </Text>

            <TextInput
              placeholder="Eg: Steps: 4242"
              keyboardType="numeric"
              value={update_target_water_form.toString()}
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
                setupdate_target_water_form(Number(value));
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
                onPress={update_target_water_data}
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
                  // remove_all_water_data();
                  setupdate_target_water(false);
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

export default UpdateTargetWaterModal;

const styles = StyleSheet.create({});
