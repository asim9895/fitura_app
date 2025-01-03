import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppRootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { globalStylesWrapper } from "@/styles/global.style";
import { font_family } from "@/theme/font_family";
import { icons } from "@/data/icons";
import { DayTime, SingleCalorieEatenEntry } from "@/types";
import { read_foods_data_api } from "@/api/food_apis";
import { add_calories_data_api } from "@/api/calorie_apis";
import { generate_uuid } from "@/utils/generate_uuid";
import { useRouter } from "expo-router";

const meals: { name: DayTime; icon: any }[] = [
  {
    name: "Breakfast",
    icon: icons.breakfast,
  },
  {
    name: "Lunch",
    icon: icons.lunch,
  },
  {
    name: "Dinner",
    icon: icons.dinner,
  },
  {
    name: "Snack",
    icon: icons.snack,
  },
];

const AddCaloriePage = () => {
  const currentHour = new Date().getHours();

  const initial_value =
    currentHour >= 5 && currentHour < 11
      ? meals[0]
      : currentHour >= 11 && currentHour < 16
      ? meals[1]
      : currentHour >= 16 && currentHour < 21
      ? meals[2]
      : meals[3];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(initial_value); // State for selected meal

  const [food_data, setfood_data] = useState<SingleCalorieEatenEntry[]>([]);
  const [selected_foods, setselected_foods] = useState<
    SingleCalorieEatenEntry[]
  >([]);

  const router = useRouter();
  const { colors } = useSelector((state: AppRootState) => state.theme);
  const { selected_date } = useSelector((state: AppRootState) => state.user);
  const globalStyles = globalStylesWrapper(colors);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMealSelect = (meal: any) => {
    setSelectedMeal(meal); // Update selected meal

    setIsDropdownOpen(false);
  };

  const fetch_food_items = async () => {
    const request = await read_foods_data_api();

    setfood_data(request.records);
  };

  useEffect(() => {
    fetch_food_items();
  }, []);

  const handle_calorie_add = async () => {
    const data = selected_foods?.map((item: SingleCalorieEatenEntry) => {
      return {
        ...item,
        id: generate_uuid(),
        day_time: selectedMeal.name,
      };
    });

    const request = await add_calories_data_api(data, selected_date);

    if (request?.status === 200) {
      router.push("/calorie-tracker");
    } else {
      console.log("error", request);
    }
  };

  return (
    <SafeAreaView style={globalStyles.background}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.foreground,
          zIndex: 1000,
        }}
      >
        {/* Dropdown Section */}
        <View
          style={{
            position: "relative",
            zIndex: 1001,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 8,
            }}
            onPress={toggleDropdown}
          >
            <Image
              source={selectedMeal.icon}
              style={{ width: 24, height: 24 }}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: font_family.font_semibold,
                marginRight: 8,
                marginLeft: 10,
                color: colors.text,
              }}
            >
              {selectedMeal.name}
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
                width: 140,
                left: 0,
                right: 0,
                backgroundColor: colors.foreground,
                borderRadius: 10,
                marginTop: 50,
                elevation: 5,
              }}
            >
              {meals.map((meal) => (
                <TouchableOpacity
                  key={meal.name}
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
                    selectedMeal.name === meal.name && {
                      backgroundColor: colors.foreground,
                    },
                  ]}
                  onPress={() => handleMealSelect(meal)}
                >
                  <Image
                    source={meal.icon}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: colors.text,
                        fontFamily: font_family.font_semibold,
                      },
                      selectedMeal === meal && {
                        color: "#2196F3",
                        fontWeight: "500",
                      },
                    ]}
                  >
                    {meal.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Close Button */}
        <TouchableOpacity
          style={{
            padding: 8,
          }}
          onPress={() => router.back()}
        >
          <Image
            source={icons.cross}
            style={{ width: 16, height: 16, marginRight: 5 }}
            tintColor={colors.text}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 10,
          marginHorizontal: 15,
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 0,
          paddingVertical: 9,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.foreground,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            width: "48%",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            router.push("/add-calorie-log");
          }}
        >
          <MaterialCommunityIcons
            name="food-apple"
            size={20}
            color={colors.light_gray}
            style={{ marginRight: 10, marginBottom: 2 }}
          />
          <Text
            style={{
              color: colors.text,
              fontFamily: font_family.font_medium,
              fontSize: 16,
            }}
          >
            Quick Log
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.foreground,
            borderRadius: 10,
            paddingVertical: 7,
            paddingHorizontal: 20,
            width: "48%",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            router.push("/add-activity");
          }}
        >
          <MaterialCommunityIcons
            name="food-variant"
            size={20}
            color={colors.light_gray}
            style={{ marginRight: 10, marginBottom: 2 }}
          />
          <Text
            style={{
              color: colors.text,
              fontFamily: font_family.font_medium,
              fontSize: 16,
            }}
          >
            Create Food
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          placeholder="Search Food Item"
          placeholderTextColor={colors.light_gray}
          style={{
            backgroundColor: colors.foreground,
            padding: 13,
            borderRadius: 8,
            marginVertical: 10,
            marginHorizontal: 15,
            fontFamily: font_family.font_medium,
            color: colors.text,
          }}
        />
      </View>

      <ScrollView
        style={{ marginHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            color: colors.text,
            fontFamily: font_family.font_semibold,
            fontSize: 18,
            marginVertical: 10,
          }}
        >
          Food Items
        </Text>

        {food_data.map((food, index) => {
          const existingFoodIndex = selected_foods.findIndex(
            (item) => item.id === food.id
          );
          return (
            <View
              key={food.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.foreground,
                marginBottom: index === food_data.length - 1 ? 100 : 0,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (existingFoodIndex !== -1) {
                      setselected_foods(
                        selected_foods.filter((item) => item.id !== food.id)
                      );
                    } else {
                      setselected_foods([...selected_foods, food]);
                    }
                  }}
                >
                  <Image
                    source={
                      existingFoodIndex !== -1
                        ? icons.check
                        : icons.plus_covered
                    }
                    style={{ width: 30, height: 30, marginRight: 15 }}
                    tintColor={
                      existingFoodIndex !== -1
                        ? colors.button
                        : colors.light_gray
                    }
                  />
                </TouchableOpacity>
                <View style={{ width: Dimensions.get("window").width / 1.4 }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: font_family.font_semibold,
                      color: colors.text,
                      fontSize: 16,
                      width: 300,
                    }}
                  >
                    {food.name}
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
                    {food.serving_size}
                    {food.serving_unit} serving | {food.calorie} kcal
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
                    {food.protein}g protein | {food.carbs}g carbs | {food.fat}g
                    fat
                  </Text>
                </View>
              </View>
              <Image
                source={icons.right_arrow}
                style={{ width: 16, height: 16 }}
                tintColor={colors.light_gray}
              />
            </View>
          );
        })}
      </ScrollView>
      {selected_foods?.length > 0 && (
        <View
          style={{
            position: "absolute",
            height: 70,
            bottom: 0,
            width: "100%",
            zIndex: 99,
            backgroundColor: colors.foreground,
            padding: 10,
            paddingHorizontal: 15,
            borderTopWidth: 1,
            borderTopColor: colors.foreground,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: colors.text_black,
                fontFamily: font_family.font_semibold,
                fontSize: 19,
                backgroundColor: colors.button,
                width: 30,
                height: 30,
                textAlign: "center",
                borderRadius: 18,
                paddingTop: 3,
              }}
            >
              {selected_foods?.length}
            </Text>
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_semibold,
                fontSize: 22,
                marginLeft: 15,
              }}
            >
              {selected_foods.reduce((total, food) => total + food.calorie, 0)}{" "}
              kcal
            </Text>
          </View>

          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: colors.background,
              paddingHorizontal: 40,
              borderRadius: 10,
            }}
            onPress={handle_calorie_add}
          >
            <Text
              style={{
                fontFamily: font_family.font_semibold,
                fontSize: 22,
                color: colors.text,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddCaloriePage;
