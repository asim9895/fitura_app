import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import { font_family } from "@/theme/font_family";
import { useRouter } from "expo-router";
import { icons } from "@/data/icons";
import {
  read_activity_by_id_and_selected_date_data,
  udpate_activity_by_id_and_selected_date_data,
} from "@/api/activity_apis";
import { SingleActivityEntry } from "@/types";
import ActivityForm from "@/components/forms/ActivityForm";

const EditActivityPage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const activity_id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { colors } = useSelector((state: AppRootState) => state.theme);
  const { selected_date } = useSelector((state: AppRootState) => state.user);
  const globalStyles = globalStylesWrapper(colors);

  const [activity, setactivity] = useState<SingleActivityEntry | null>(null);
  const initial_state = {
    burned: activity?.burned || 0,
    activity: activity?.activity || "",
    hour: activity?.hour || 0,
    minutes: activity?.minutes || 0,
  };

  const [activity_form, setactivity_form] = useState(initial_state);

  const find_calorie = async (selected_date: Date, activity_id: string) => {
    const data = await read_activity_by_id_and_selected_date_data(
      selected_date,
      activity_id
    );

    if (data?.status === 200) {
      setactivity(data?.data);
      setactivity_form({
        burned: data?.data?.burned || 0,
        activity: data?.data?.activity || "",
        hour: data?.data?.hour || 0,
        minutes: data?.data?.minutes || 0,
      });
    } else {
      setactivity(null);
    }
  };
  useEffect(() => {
    find_calorie(selected_date, activity_id);
  }, [activity_id, selected_date]);

  const update_calorie = async () => {
    const data = await udpate_activity_by_id_and_selected_date_data(
      selected_date,
      {
        ...activity_form,
        id: activity_id,
      }
    );

    if (data?.status === 200) {
      router.push("/calorie-tracker");
    } else {
    }
  };
  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.header_title}>Edit Calorie</Text>
        <TouchableOpacity
          style={{
            padding: 8,
          }}
          onPress={() => router.back()}
        >
          <Image
            source={icons.cross}
            style={globalStyles.close_icon}
            tintColor={colors.text}
          />
        </TouchableOpacity>
      </View>

      {activity !== null && (
        <ScrollView
          style={{ marginHorizontal: 20, marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <ActivityForm form={activity_form} setForm={setactivity_form} />
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 10,
              backgroundColor: colors.button,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              update_calorie();
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontFamily: font_family.font_semibold,
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default EditActivityPage;
