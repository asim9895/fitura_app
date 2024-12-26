import { View, Text, SafeAreaView, Platform, Image } from "react-native";
import React from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { formatDate, todays_date } from "@/utils/variables";
import { font_family } from "@/theme/font_family";
import { icons } from "@/data/icons";
import { differenceInCalendarDays } from "date-fns";

const DateHeader: React.FC<{ days: number }> = ({ days }) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const { selected_date, creation_date } = useAppSelector(
    (state: AppRootState) => state.user
  );

  const formatted_date = formatDate(selected_date);

  const streak_from_creation_date =
    creation_date && todays_date
      ? differenceInCalendarDays(todays_date, creation_date) + 1
      : 0;
  console.log(streak_from_creation_date);

  const display_format = `${formatted_date[1]}, ${formatted_date[0]} ${formatted_date[2]}, 20${formatted_date[3]}`;

  return (
    <SafeAreaView
      style={{
        marginBottom: Platform.OS === "ios" ? 3 : 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        alignItems: "center",
        marginTop: 15,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: font_family.poppins_semiBold,
          color: colors.text,
        }}
      >
        {selected_date === todays_date ? "Today" : display_format}
      </Text>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            backgroundColor: "#f9f2e8",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 0,
            paddingHorizontal: 10,
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Image
            source={icons.crown}
            style={{ width: 17, height: 17, marginRight: 3 }}
          />
          <Text
            style={{
              fontFamily: font_family.poppins_medium,
              fontSize: 16,
              color: colors.text_black,
              paddingTop: 2,
            }}
          >
            {days}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#f9f2e8",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 0,
            paddingHorizontal: 10,
            borderRadius: 20,
          }}
        >
          <Image
            source={icons.streak}
            style={{ width: 17, height: 17, marginRight: 3 }}
          />
          <Text
            style={{
              fontFamily: font_family.poppins_medium,
              fontSize: 16,
              color: colors.text_black,
              paddingTop: 2,
            }}
          >
            {streak_from_creation_date}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default DateHeader;
