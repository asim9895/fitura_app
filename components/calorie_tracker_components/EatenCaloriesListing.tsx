import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SingleCalorieEatenEntry } from "@/types";
import { AppRootState } from "@/redux/store";
import { useAppSelector } from "@/hooks/redux_hooks";
import { font_family } from "@/theme/font_family";
import CalorieEatenCollapsable from "./CalorieEatenCollapsable";
import CalorieOptionModal from "../modals/CalorieOptionModal";
import SingleCalorieItem from "./SingleCalorieItem";
import { remove_selected_date_calorie_data } from "@/api/calorie_apis";

const EatenCaloriesListing: React.FC<{
  calorie_eaten_data: SingleCalorieEatenEntry[];
  fetch_selected_date_calorie_data: any;
}> = ({ calorie_eaten_data, fetch_selected_date_calorie_data }) => {
  const [show_options, setshow_options] = useState(false);
  const [current_calorie_id, setcurrent_calorie_id] = useState("");
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const { selected_date } = useAppSelector((state: AppRootState) => state.user);
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

  const remove_calorie = async () => {
    const request = await remove_selected_date_calorie_data(
      selected_date,
      current_calorie_id
    );

    if (request.status === 200) {
      await fetch_selected_date_calorie_data(selected_date);
    } else {
      console.log("error");
    }
  };
  return (
    <View>
      <CalorieOptionModal
        setshow_options={setshow_options}
        show_options={show_options}
        setcurrent_calorie_id={setcurrent_calorie_id}
        remove_calorie={remove_calorie}
      />
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
                  <SingleCalorieItem
                    key={food.id}
                    food={food}
                    setshow_options={setshow_options}
                    setcurrent_calorie_id={setcurrent_calorie_id}
                  />
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
                  <SingleCalorieItem
                    key={food.id}
                    food={food}
                    setcurrent_calorie_id={setcurrent_calorie_id}
                    setshow_options={setshow_options}
                  />
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
                  <SingleCalorieItem
                    key={food.id}
                    food={food}
                    setcurrent_calorie_id={setcurrent_calorie_id}
                    setshow_options={setshow_options}
                  />
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
                  <SingleCalorieItem
                    key={food.id}
                    food={food}
                    setcurrent_calorie_id={setcurrent_calorie_id}
                    setshow_options={setshow_options}
                  />
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
