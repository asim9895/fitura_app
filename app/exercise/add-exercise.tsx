import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import { useRouter } from "expo-router";
import { icons } from "@/data/icons";
import { add_exercise_data_api } from "@/api/exercise_apis";
import { generate_uuid } from "@/utils/generate_uuid";
import ActivityForm from "@/components/forms/ActivityForm";

const AddExercisePage = () => {
  const router = useRouter();

  const { colors } = useSelector((state: AppRootState) => state.theme);

  const globalStyles = globalStylesWrapper(colors);

  const initial_state = {
    burned: 0,
    activity: "",
    hour: 0,
    minutes: 0,
  };

  const [exercise_form, setexercise_form] = useState(initial_state);

  const add_exercise = async () => {
    const data = await add_exercise_data_api({
      ...exercise_form,
      id: generate_uuid(),
    });

    if (data?.status === 200) {
      router.push("/activity-info/add-activity");
    } else {
    }
  };
  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.header_title}>Add Exercise</Text>
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
        <ActivityForm form={exercise_form} setForm={setexercise_form} />

        <TouchableOpacity
          style={globalStyles.submit_button}
          onPress={() => {
            add_exercise();
          }}
        >
          <Text style={globalStyles.submit_button_text}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddExercisePage;
