import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SingleCalorieEatenEntry } from "@/types";
import { AppRootState } from "@/redux/store";
import { useAppSelector } from "@/hooks/redux_hooks";
import { font_family } from "@/theme/font_family";
import CalorieEatenCollapsable from "./CalorieEatenCollapsable";
import { Image } from "react-native";
import { icons } from "@/data/icons";

const EatenCaloriesListing: React.FC<{
  calorie_eaten_data: SingleCalorieEatenEntry[];
}> = ({ calorie_eaten_data }) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const snack_data = calorie_eaten_data.filter(
    (item) => item.day_time === "Snack"
  );
  const lunch_data = calorie_eaten_data.filter(
    (item) => item.day_time === "Lunch"
  );
  const breakfast_data = calorie_eaten_data.filter(
    (item) => item.day_time === "Breakfast"
  );
  const dinner_data = calorie_eaten_data.filter(
    (item) => item.day_time === "Dinner"
  );
  return (
    <View>
      {calorie_eaten_data?.length > 0 ? (
        <View style={{ marginTop: 20 }}>
          {snack_data?.length > 0 && (
            <CalorieEatenCollapsable
              title={`Snack`}
              calorie_count={`(${snack_data.reduce(
                (total, food) => total + food.calorie,
                0
              )} kcal) `}
            >
              {snack_data?.map((food: SingleCalorieEatenEntry, index) => {
                return (
                  <View
                    key={food.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.foreground,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity>
                        <Image
                          source={icons.platter}
                          style={{ width: 30, height: 30, marginRight: 15 }}
                          tintColor={colors.light_gray}
                        />
                      </TouchableOpacity>
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
                          {food.protein}g protein | {food.carbs}g carbs |{" "}
                          {food.fat}g fat
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </CalorieEatenCollapsable>
          )}
          {breakfast_data?.length > 0 && (
            <CalorieEatenCollapsable
              title={`Breakfast`}
              calorie_count={`(${breakfast_data.reduce(
                (total, food) => total + food.calorie,
                0
              )} kcal) `}
            >
              {breakfast_data?.map((food: SingleCalorieEatenEntry, index) => {
                return (
                  <View
                    key={food.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.foreground,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity>
                        <Image
                          source={icons.platter}
                          style={{ width: 30, height: 30, marginRight: 15 }}
                          tintColor={colors.light_gray}
                        />
                      </TouchableOpacity>
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
                          {food.protein}g protein | {food.carbs}g carbs |{" "}
                          {food.fat}g fat
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </CalorieEatenCollapsable>
          )}
          {lunch_data?.length > 0 && (
            <CalorieEatenCollapsable
              title={`Lunch`}
              calorie_count={`(${lunch_data.reduce(
                (total, food) => total + food.calorie,
                0
              )} kcal) `}
            >
              {lunch_data?.map((food: SingleCalorieEatenEntry, index) => {
                return (
                  <View
                    key={food.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.foreground,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity>
                        <Image
                          source={icons.platter}
                          style={{ width: 30, height: 30, marginRight: 15 }}
                          tintColor={colors.light_gray}
                        />
                      </TouchableOpacity>
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
                          {food.protein}g protein | {food.carbs}g carbs |{" "}
                          {food.fat}g fat
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </CalorieEatenCollapsable>
          )}
          {dinner_data?.length > 0 && (
            <CalorieEatenCollapsable
              title={`Dinner`}
              calorie_count={`(${dinner_data.reduce(
                (total, food) => total + food.calorie,
                0
              )} kcal) `}
            >
              {dinner_data?.map((food: SingleCalorieEatenEntry, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.foreground,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity>
                        <Image
                          source={icons.platter}
                          style={{ width: 30, height: 30, marginRight: 15 }}
                          tintColor={colors.light_gray}
                        />
                      </TouchableOpacity>
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
                          {food.protein}g protein | {food.carbs}g carbs |{" "}
                          {food.fat}g fat
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </CalorieEatenCollapsable>
          )}
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
            padding: 10,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontFamily: font_family.font_semibold,
              fontSize: 17,
            }}
          >
            No calories added
          </Text>
        </View>
      )}
    </View>
  );
};

export default EatenCaloriesListing;

const styles = StyleSheet.create({});
