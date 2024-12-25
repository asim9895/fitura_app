import {
  Dimensions,
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

const CalorieTrackerPage = () => {
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );

  const globalStyles = globalStylesWrapper(colors);

  return (
    <View style={[globalStyles.background]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DatesList route="Calorie" />

      <ScrollView style={{ margin: 15 }}>
        <View
          style={{
            backgroundColor: colors.foreground,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: colors.light_gray,
              fontFamily: font_family.poppins_semiBold,
              fontSize: 15,
            }}
          >
            Calories left to eat today
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              padding: 5,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.poppins_semiBold,
                fontSize: 14,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontFamily: font_family.poppins_semiBold,
                  fontSize: 19,
                }}
              >
                2215
              </Text>{" "}
              kcal
            </Text>
            <Text
              style={{
                color: colors.button,
                fontFamily: font_family.poppins_semiBold,
                fontSize: 15,
              }}
            >
              <Text
                style={{
                  color: colors.light_gray,
                  fontFamily: font_family.poppins_medium,
                  fontSize: 13,
                }}
              >
                Total Budget:
              </Text>{" "}
              2152
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Progress.Bar
              progress={0.4}
              width={Dimensions.get("window").width / 1.15}
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
        </View>
      </ScrollView>
      <Text style={{ color: colors.text }}>Index</Text>
    </View>
  );
};

export default CalorieTrackerPage;
