import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
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
import { ServingUnit, SingleCalorieEatenEntry } from "@/types";
import { Colors } from "@/theme/colors";
import { read_food_by_id_api, update_food_data_api } from "@/api/food_apis";

const serving_units: ServingUnit[] = ["g", "kg", "l", "ml"];

const EditFoodPage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const food_id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { colors } = useSelector((state: AppRootState) => state.theme);
  const { selected_date } = useSelector((state: AppRootState) => state.user);
  const globalStyles = globalStylesWrapper(colors);
  const editCalorieStyles = EditCalorieWrapper(colors);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
      <View style={editCalorieStyles.header}>
        <Text style={editCalorieStyles.header_title}>Edit Calorie</Text>
        <TouchableOpacity
          style={{
            padding: 8,
          }}
          onPress={() => router.back()}
        >
          <Image
            source={icons.cross}
            style={editCalorieStyles.close_icon}
            tintColor={colors.text}
          />
        </TouchableOpacity>
      </View>

      {food !== null && (
        <ScrollView
          style={{ marginHorizontal: 20, marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginVertical: 5 }}>
            <Text style={editCalorieStyles.input_title}>Calorie Name</Text>
            <TextInput
              keyboardType="default"
              placeholder="Enter food name"
              value={food_form.name}
              placeholderTextColor={colors.light_gray}
              style={editCalorieStyles.input}
              onChangeText={(text) =>
                setfood_form({ ...food_form, name: text })
              }
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={editCalorieStyles.input_title}>Serving Size</Text>
            <TextInput
              keyboardType="number-pad"
              placeholder="Enter serving size"
              value={food_form.serving_size.toString()}
              placeholderTextColor={colors.light_gray}
              style={editCalorieStyles.input}
              onChangeText={(text) =>
                setfood_form({ ...food_form, serving_size: Number(text) })
              }
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={editCalorieStyles.input_title}>Serving Unit</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 12,
                width: "100%",
                borderRadius: 8,
                backgroundColor: colors.foreground,
                marginTop: 5,
              }}
              onPress={toggleDropdown}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: font_family.font_semibold,
                  marginRight: 8,
                  marginLeft: 10,
                  width: "90%",
                  color: colors.text,
                }}
              >
                {food_form.serving_unit}
              </Text>
              <Image
                source={isDropdownOpen ? icons.arrow_up : icons.arrow_down}
                style={{ width: 16, height: 16, marginRight: 8 }}
                tintColor={colors.text}
              />
            </TouchableOpacity>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  left: 0,
                  zIndex: 99,
                  right: 0,
                  backgroundColor: colors.foreground,
                  borderRadius: 10,
                  marginTop: 80,
                  elevation: 5,
                }}
              >
                {serving_units.map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    style={[
                      {
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderTopEndRadius: 10,
                        borderTopStartRadius: 10,
                        borderBottomEndRadius: 10,
                        borderBottomStartRadius: 10,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      },
                      food_form.serving_unit === unit && {
                        backgroundColor: colors.foreground,
                      },
                    ]}
                    onPress={() => {
                      setfood_form({
                        ...food_form,
                        serving_unit: unit,
                      });
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        {
                          fontSize: 16,
                          color: colors.text,
                          fontFamily: font_family.font_semibold,
                        },
                        food_form.serving_unit === unit && {
                          color: "#2196F3",
                          fontWeight: "500",
                        },
                      ]}
                    >
                      {unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={editCalorieStyles.input_title}>Calorie (kcal)</Text>
            <TextInput
              keyboardType="number-pad"
              placeholder="Enter calories"
              value={food_form.calorie.toString()}
              placeholderTextColor={colors.light_gray}
              style={editCalorieStyles.input}
              onChangeText={(text) =>
                setfood_form({ ...food_form, calorie: Number(text) })
              }
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={editCalorieStyles.input_title}>Protein (g)</Text>
            <TextInput
              keyboardType="number-pad"
              placeholder="Enter protein"
              value={food_form.protein.toString()}
              placeholderTextColor={colors.light_gray}
              style={editCalorieStyles.input}
              onChangeText={(text) =>
                setfood_form({ ...food_form, protein: Number(text) })
              }
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={editCalorieStyles.input_title}>Carbs (g)</Text>
            <TextInput
              keyboardType="number-pad"
              placeholder="Enter carbs"
              value={food_form.carbs.toString()}
              placeholderTextColor={colors.light_gray}
              style={editCalorieStyles.input}
              onChangeText={(text) =>
                setfood_form({ ...food_form, carbs: Number(text) })
              }
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={editCalorieStyles.input_title}>Fat (g)</Text>
            <TextInput
              keyboardType="number-pad"
              placeholder="Enter fat"
              value={food_form.fat.toString()}
              placeholderTextColor={colors.light_gray}
              style={editCalorieStyles.input}
              onChangeText={(text) =>
                setfood_form({ ...food_form, fat: Number(text) })
              }
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={editCalorieStyles.input_title}>Note</Text>
            <TextInput
              keyboardType="default"
              numberOfLines={12}
              multiline={true}
              placeholder="Enter note"
              value={food_form.note}
              placeholderTextColor={colors.light_gray}
              style={editCalorieStyles.input}
              onChangeText={(text) =>
                setfood_form({ ...food_form, note: text })
              }
            />
          </View>

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
              update_food();
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

export const EditCalorieWrapper = (colors: Colors) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.foreground,
      zIndex: 1000,
    },
    header_title: {
      color: colors.text,
      fontFamily: font_family.font_semibold,
      fontSize: 17,
    },
    close_icon: { width: 16, height: 16, marginRight: 5 },
    input_title: {
      fontFamily: font_family.font_medium,
      fontSize: 14,
      color: colors.text,
      marginLeft: 5,
    },
    input: {
      backgroundColor: colors.foreground,
      padding: 13,
      borderRadius: 8,
      marginVertical: 5,
      fontFamily: font_family.font_medium,
      color: colors.text,
    },
  });

export default EditFoodPage;
