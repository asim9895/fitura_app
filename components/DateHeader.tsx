import { View, Text, SafeAreaView, Platform, Image } from "react-native";
import React from "react";
import { Colors } from "@/theme/colors";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { formatDate, todays_date } from "@/utils/variables";
import { font_family } from "@/theme/font_family";
import { Route } from "@/types";
import { icons } from "@/data/icons";

const DateHeader: React.FC<{ route: Route }> = ({ route }) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const { selected_date } = useAppSelector((state: AppRootState) => state.user);

  const formatted_date = formatDate(selected_date);

  const display_format = `${formatted_date[1]}, ${formatted_date[0]} ${formatted_date[2]}, 20${formatted_date[3]}`;

  return (
    <SafeAreaView
      style={{
        marginBottom: Platform.OS === "ios" ? 15 : 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        alignItems: "center",
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
          0
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DateHeader;
