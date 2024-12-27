import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import React from "react";
import { globalStylesWrapper } from "@/styles/global.style";
import { AppRootState } from "@/redux/store";
import DatesList from "@/components/DatesList";
import { useAppSelector } from "@/hooks/redux_hooks";
import { font_family } from "@/theme/font_family";
import * as Progress from "react-native-progress";
import DateHeader from "@/components/DateHeader";
import { calorie_data } from "@/data/test";
import { icons } from "@/data/icons";

const CalorieTrackerPage = () => {
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );

  const globalStyles = globalStylesWrapper(colors);

  const all_calorie_of_achieved_goal = calorie_data?.map((steps: any) => {
    const date = new Date(steps.date);
    const steps_of_day = steps.data.reduce((total: any, step: any) => {
      return total + step.steps;
    }, 0);
    return {
      date: date,
      count: steps_of_day,
    };
  });

  return (
    <View style={[globalStyles.background]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DateHeader days={all_calorie_of_achieved_goal?.length} />
      <DatesList
        onDateSelect={(date: any) => {
          console.log("Selected date:", date);
          // Do something with the selected date
        }}
        achievement_dates={all_calorie_of_achieved_goal}
      />

      <ScrollView
        style={{ marginHorizontal: 15, marginBottom: 70 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: colors.foreground,
            padding: 15,
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <Text
            style={{
              color: colors.light_gray,
              fontFamily: font_family.poppins_semiBold,
              fontSize: 16,
              marginBottom: 5,
            }}
          >
            Calories left to eat today
          </Text>

          <Text
            style={{
              color: colors.text,
              fontFamily: font_family.poppins_semiBold,
              fontSize: 14,
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.poppins_semiBold,
                fontSize: 25,
              }}
            >
              2215
            </Text>{" "}
            kcal
          </Text>

          <View style={{ marginTop: 5 }}>
            <Progress.Bar
              progress={0.4}
              width={Dimensions.get("window").width / 1.2}
              height={10}
              borderRadius={25}
              color={colors.button}
              unfilledColor={colors.background}
              borderColor={colors.background}
            />
          </View>

          <View
            style={{
              marginTop: 15,
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: colors.background,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                width: "17%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.poppins_semiBold,
                  color: colors.text,
                  marginBottom: Platform.OS === "ios" ? 5 : 0,
                  fontSize: 17,
                }}
              >
                2152
              </Text>
              <Text
                style={{
                  fontFamily: font_family.poppins_semiBold,
                  color: colors.button,
                  fontSize: 10,
                }}
              >
                Budget
              </Text>
            </View>
            <Text
              style={{
                width: "10%",
                fontFamily: font_family.poppins_semiBold,
                color: colors.text,
              }}
            >
              -
            </Text>
            <View
              style={{
                width: "17%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.poppins_semiBold,
                  color: colors.text,
                  marginBottom: Platform.OS === "ios" ? 5 : 0,
                  fontSize: 17,
                }}
              >
                2132
              </Text>
              <Text
                style={{
                  fontFamily: font_family.poppins_semiBold,
                  color: colors.green,
                  fontSize: 10,
                }}
              >
                Eaten
              </Text>
            </View>

            <Text
              style={{
                width: "10%",
                fontFamily: font_family.poppins_semiBold,
                color: colors.text,
              }}
            >
              +
            </Text>
            <View
              style={{
                width: "17%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.poppins_semiBold,
                  color: colors.text,
                  marginBottom: Platform.OS === "ios" ? 5 : 0,
                  fontSize: 17,
                }}
              >
                2321
              </Text>
              <Text
                style={{
                  fontFamily: font_family.poppins_semiBold,
                  color: colors.error,
                  fontSize: 10,
                }}
              >
                Burned
              </Text>
            </View>

            <Text
              style={{
                width: "10%",
                fontFamily: font_family.poppins_semiBold,
                color: colors.text,
              }}
            >
              =
            </Text>
            <View
              style={{
                width: "17%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font_family.poppins_semiBold,
                  color: colors.text,
                  marginBottom: Platform.OS === "ios" ? 5 : 0,
                  fontSize: 17,
                }}
              >
                4324
              </Text>
              <Text
                style={{
                  fontFamily: font_family.poppins_semiBold,
                  color: colors.light_gray,
                  fontSize: 10,
                }}
              >
                Left
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.background,
              height: 14,
              marginTop: 10,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              backgroundColor: colors.background,
              marginTop: 10,
              borderRadius: 10,
              padding: 10,
              paddingVertical: 9,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.poppins_semiBold,
                fontSize: 17,
                marginTop: 4,
              }}
            >
              Today Budget
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: colors.button,
                  fontFamily: font_family.poppins_semiBold,
                  marginTop: 4,
                  fontSize: 18,
                }}
              >
                2234
                <Text style={{ fontSize: 12 }}> kcal</Text>
              </Text>
              <Image
                source={icons.right_arrow}
                style={{ width: 15, height: 15, marginLeft: 15 }}
                tintColor={colors.button}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalorieTrackerPage;
