import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { font_family } from "@/theme/font_family";
import { useRouter } from "expo-router";

interface CalorieOptionModalProps {
  show_options: boolean;
  setshow_options: (show_options: boolean) => void;
  setcurrent_activity_id: (id: string) => void;
  remove_activity: () => void;
  current_activity_id: string;
}

const ActivityOptionModal: React.FC<CalorieOptionModalProps> = ({
  show_options,
  setshow_options,
  setcurrent_activity_id,
  remove_activity,
  current_activity_id,
}) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const router = useRouter();

  return (
    <View>
      <ReactNativeModal
        isVisible={show_options}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        backdropOpacity={0.7}
        backdropColor={colors.text_black}
        onBackdropPress={() => setshow_options(false)}
      >
        <View
          style={{
            bottom: 60,
            position: "absolute",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.foreground,
              padding: 20,
              borderRadius: 10,
              width: "90%",
              paddingVertical: 0,
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/activity-info/edit-activity",
                    params: { id: current_activity_id },
                  });
                }}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  paddingVertical: 15,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.button,
                    textAlign: "center",
                    fontFamily: font_family.font_bold,
                    fontSize: 17,
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: 2,
                  alignSelf: "center",
                  backgroundColor: colors.background,
                  width: "90%",
                }}
              ></View>
              <TouchableOpacity
                onPress={async () => {
                  await remove_activity();
                  setcurrent_activity_id("");
                  setshow_options(false);
                }}
                style={{
                  width: "100%",
                  padding: 10,
                  paddingVertical: 15,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.error,
                    textAlign: "center",
                    fontFamily: font_family.font_bold,
                    fontSize: 17,
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.foreground,
              padding: 20,
              borderRadius: 10,
              marginTop: 10,
              width: "90%",
              paddingVertical: 0,
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  setcurrent_activity_id("");
                  setshow_options(false);
                }}
                style={{
                  width: "100%",
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
      </ReactNativeModal>
    </View>
  );
};

export default ActivityOptionModal;
