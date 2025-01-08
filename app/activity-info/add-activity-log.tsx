import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";

import { useRouter } from "expo-router";
import { icons } from "@/data/icons";
import { add_activities_data_api } from "@/api/activity_apis";

import { generate_uuid } from "@/utils/generate_uuid";
import ActivityForm from "@/components/forms/ActivityForm";

const AddActivityLogPage = () => {
  const router = useRouter();
  const { colors } = useSelector((state: AppRootState) => state.theme);
  const { selected_date } = useSelector((state: AppRootState) => state.user);
  const globalStyles = globalStylesWrapper(colors);

  const initial_state = {
    burned: 0,
    activity: "",
    hour: 0,
    minutes: 0,
  };

  const [activity_form, setactivity_form] = useState(initial_state);

  const update_calorie = async () => {
    const data = await add_activities_data_api(
      [
        {
          ...activity_form,
          id: generate_uuid(),
        },
      ],
      selected_date
    );

    if (data?.status === 200) {
      router.push("/calorie-tracker");
    } else {
    }
  };
  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.header_title}>Add Activity Log</Text>
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

      <ScrollView
        style={{ marginHorizontal: 20, marginTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <ActivityForm form={activity_form} setForm={setactivity_form} />

        <TouchableOpacity
          style={globalStyles.submit_button}
          onPress={() => {
            update_calorie();
          }}
        >
          <Text style={globalStyles.submit_button_text}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddActivityLogPage;
