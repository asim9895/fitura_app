import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { icons } from "@/data/icons";
import { font_family } from "@/theme/font_family";
import { format_number } from "@/utils/variables";
import { globalStylesWrapper } from "@/styles/global.style";
import { calorieTrackerStylesWrapper } from "@/styles/app/tabs/calorie-tracker.style";
import { SingleActivityEntry } from "@/types";
import { remove_selected_date_activity_data } from "@/api/activity_apis";
import ActivityOptionModal from "../modals/ActivityOptionModal";
import SingleActivityItem from "./SingleActivityItem";

interface BurnedCaloriesListingProps {
  activity_data: SingleActivityEntry[];
  fetch_selected_date_activity_data: any;
}

const BurnedCaloriesListing: React.FC<BurnedCaloriesListingProps> = ({
  activity_data,
  fetch_selected_date_activity_data,
}) => {
  const [show_options, setshow_options] = useState(false);
  const [current_activity_id, setcurrent_activity_id] = useState("");
  const { selected_date } = useAppSelector((state: AppRootState) => state.user);
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const globalStyles = globalStylesWrapper(colors);
  const calorieTrackerStyles = calorieTrackerStylesWrapper(colors);

  const remove_activity = async () => {
    const request = await remove_selected_date_activity_data(
      selected_date,
      current_activity_id
    );

    if (request.status === 200) {
      await fetch_selected_date_activity_data(selected_date);
    } else {
      console.log("error");
    }
  };
  return (
    <View style={{ marginHorizontal: 20 }}>
      <ActivityOptionModal
        setshow_options={setshow_options}
        show_options={show_options}
        setcurrent_activity_id={setcurrent_activity_id}
        remove_activity={remove_activity}
      />
      {activity_data?.length > 0 ? (
        <View style={{ marginTop: 20 }}>
          {activity_data?.map((activity: SingleActivityEntry, index) => {
            return (
              <SingleActivityItem
                key={activity.id}
                activity={activity}
                setshow_options={setshow_options}
                setcurrent_activity_id={setcurrent_activity_id}
              />
            );
          })}
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
            No activities added
          </Text>
        </View>
      )}
    </View>
  );
};

export default BurnedCaloriesListing;

const styles = StyleSheet.create({});
