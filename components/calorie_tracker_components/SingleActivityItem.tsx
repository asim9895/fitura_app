import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { SingleActivityEntry, SingleCalorieEatenEntry } from "@/types";
import { icons } from "@/data/icons";
import { font_family } from "@/theme/font_family";

const SingleActivityItem: React.FC<{
  activity: SingleActivityEntry;
  setshow_options: React.Dispatch<React.SetStateAction<boolean>>;
  setcurrent_activity_id: React.Dispatch<React.SetStateAction<string>>;
}> = ({ activity, setshow_options, setcurrent_activity_id }) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.foreground,
      }}
      onPress={() => {
        setcurrent_activity_id(activity.id);
        setshow_options(true);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            source={icons.platter}
            style={{ width: 30, height: 30, marginRight: 15 }}
            tintColor={colors.light_gray}
          />
        </View>
        <View>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: font_family.font_semibold,
              color: colors.text,
              fontSize: 16,
              width: 300,
            }}
          >
            {activity.activity}
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
            {activity.burned} kcal
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
            {activity.hour} hour and {activity.minutes} minutes
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SingleActivityItem;
