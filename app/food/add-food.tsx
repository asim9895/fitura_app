import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import { useRouter } from "expo-router";
import { icons } from "@/data/icons";
import { ServingUnit, SingleCalorieEatenEntry } from "@/types";
import { add_food_data_api } from "@/api/food_apis";
import { generate_uuid } from "@/utils/generate_uuid";
import CalorieForm from "@/components/forms/CalorieForm";

const AddFoodPage = () => {
  const router = useRouter();

  const { colors } = useSelector((state: AppRootState) => state.theme);
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

  const [food_form, setfood_form] = useState(initial_state);

  const update_food = async () => {
    const data = await add_food_data_api({
      ...food_form,
      serving_unit: food_form.serving_unit as ServingUnit,
      id: generate_uuid(),
    });

    if (data?.status === 200) {
      router.push("/calorie-info/add-calorie");
    } else {
    }
  };
  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.header_title}>Add Food</Text>
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
        <CalorieForm calorie_form={food_form} setcalorie_form={setfood_form} />

        <TouchableOpacity
          style={globalStyles.submit_button}
          onPress={() => {
            update_food();
          }}
        >
          <Text style={globalStyles.submit_button_text}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddFoodPage;
