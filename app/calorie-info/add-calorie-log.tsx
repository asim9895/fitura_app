import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import { font_family } from "@/theme/font_family";
import { useRouter } from "expo-router";
import { icons } from "@/data/icons";
import { add_calories_data_api } from "@/api/calorie_apis";
import { DayTime, ServingUnit } from "@/types";
import { Colors } from "@/theme/colors";
import { generate_uuid } from "@/utils/generate_uuid";
import CalorieForm from "@/components/forms/CalorieForm";

const serving_units: ServingUnit[] = ["g", "kg", "l", "ml"];

const AddCalorieLogPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const dayTime: DayTime = Array.isArray(params.dayTime)
    ? (params.dayTime[0] as DayTime)
    : (params.dayTime as DayTime);
  const { colors } = useSelector((state: AppRootState) => state.theme);
  const { selected_date } = useSelector((state: AppRootState) => state.user);
  const globalStyles = globalStylesWrapper(colors);

  const initial_state = {
    name: "",
    calorie: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    note: "",
    serving_size: 0,
    serving_unit: "g",
  };

  const [calorie_form, setcalorie_form] = useState(initial_state);

  const update_calorie = async () => {
    const data = await add_calories_data_api(
      [
        {
          ...calorie_form,
          id: generate_uuid(),
          day_time: dayTime,
          serving_unit: calorie_form.serving_unit as ServingUnit,
        },
      ],
      selected_date
    );

    if (data?.status === 200) {
      router.push("/calorie-tracker");
    } else {
      // Handle error case
    }
  };
  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.header_title}>Add Calorie Log</Text>
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
        <CalorieForm
          calorie_form={calorie_form}
          setcalorie_form={setcalorie_form}
        />

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

export default AddCalorieLogPage;
