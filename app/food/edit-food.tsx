import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import { useRouter } from "expo-router";
import { icons } from "@/data/icons";
import { SingleCalorieEatenEntry } from "@/types";
import { read_food_by_id_api, update_food_data_api } from "@/api/food_apis";
import CalorieForm from "@/components/forms/CalorieForm";

const EditFoodPage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const food_id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { colors } = useSelector((state: AppRootState) => state.theme);
  const globalStyles = globalStylesWrapper(colors);
  const [food, setfood] = useState<SingleCalorieEatenEntry | null>(null);
  const initial_state = {
    name: food?.name || "",
    calorie: food?.calorie || 0,
    protein: food?.protein || 0,
    carbs: food?.carbs || 0,
    fat: food?.fat || 0,
    note: food?.note || "",
    serving_size: food?.serving_size || 0,
    serving_unit: food?.serving_unit || "g",
  };

  const [food_form, setfood_form] = useState(initial_state);

  const find_food = async (food_id: string) => {
    const data = await read_food_by_id_api(food_id);

    if (data?.status === 200) {
      setfood(data?.data);
      setfood_form({
        name: data?.data?.name || "",
        calorie: data?.data?.calorie || 0,
        protein: data?.data?.protein || 0,
        carbs: data?.data?.carbs || 0,
        fat: data?.data?.fat || 0,
        note: data?.data?.note || "",
        serving_size: data?.data?.serving_size || 0,
        serving_unit: data?.data?.serving_unit || "g",
      });
    } else {
      setfood(null);
    }
  };
  useEffect(() => {
    find_food(food_id);
  }, [food_id]);

  const update_food = async () => {
    const data = await update_food_data_api({
      ...food_form,
      id: food_id,
    });

    if (data?.status === 200) {
      router.push("/calorie-info/add-calorie");
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

      {food !== null && (
        <ScrollView
          style={{ marginHorizontal: 20, marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <CalorieForm
            calorie_form={food_form}
            setcalorie_form={setfood_form}
          />

          <TouchableOpacity
            style={globalStyles.submit_button}
            onPress={() => {
              update_food();
            }}
          >
            <Text style={globalStyles.submit_button_text}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default EditFoodPage;
