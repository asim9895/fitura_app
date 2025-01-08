import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
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
  read_calorie_by_id_and_selected_date_data,
  udpate_calorie_by_id_and_selected_date_data,
} from "@/api/calorie_apis";
import { SingleCalorieEatenEntry } from "@/types";
import CalorieForm from "@/components/forms/CalorieForm";

const EditCaloriePage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const calorie_id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { colors } = useSelector((state: AppRootState) => state.theme);
  const { selected_date } = useSelector((state: AppRootState) => state.user);
  const globalStyles = globalStylesWrapper(colors);
  const [calorie, setcalorie] = useState<SingleCalorieEatenEntry | null>(null);
  const initial_state = {
    name: calorie?.name || "",
    calorie: calorie?.calorie || 0,
    protein: calorie?.protein || 0,
    carbs: calorie?.carbs || 0,
    fat: calorie?.fat || 0,
    note: calorie?.note || "",
    serving_size: calorie?.serving_size || 0,
    serving_unit: calorie?.serving_unit || "g",
  };

  const [calorie_form, setcalorie_form] = useState(initial_state);

  const find_calorie = async (selected_date: Date, calorie_id: string) => {
    const data = await read_calorie_by_id_and_selected_date_data(
      selected_date,
      calorie_id
    );

    if (data?.status === 200) {
      setcalorie(data?.data);
      setcalorie_form({
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
      setcalorie(null);
    }
  };
  useEffect(() => {
    find_calorie(selected_date, calorie_id);
  }, [calorie_id, selected_date]);

  const update_calorie = async () => {
    const data = await udpate_calorie_by_id_and_selected_date_data(
      selected_date,
      {
        ...calorie_form,
        id: calorie_id,
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

      {calorie !== null && (
        <ScrollView
          style={{ marginHorizontal: 20, marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <CalorieForm
            calorie_form={calorie_form}
            setcalorie_form={setcalorie_form}
          />
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

export default EditCaloriePage;
