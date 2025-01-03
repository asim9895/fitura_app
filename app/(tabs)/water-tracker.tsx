import { View, Text, StatusBar, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import DatesList from "@/components/DatesList";
import DateHeader from "@/components/DateHeader";
import { water } from "@/data/test";
import { icons } from "@/data/icons";
import * as Progress from "react-native-progress";
import { font_family } from "@/theme/font_family";
import { isSameDay } from "date-fns";
import { format_number } from "@/utils/variables";
import { SingleWaterEntry, WaterData } from "@/types";

const WaterTrackerPage = () => {
  const [water_data, setwater_data] = useState<SingleWaterEntry[]>([]);

  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const { selected_date, target_water } = useAppSelector(
    (state: AppRootState) => state.user
  );

  const globalStyles = globalStylesWrapper(colors);

  const all_water_of_achieved_goal = water?.map((water_entry) => {
    const date = new Date(water_entry.date);
    const intake_of_day = water_entry.data.reduce((total: any, item: any) => {
      return total + item.intake;
    }, 0);
    return {
      date: date,
      count: intake_of_day,
      condition:
        target_water === undefined ||
        target_water === null ||
        target_water === 0
          ? false
          : intake_of_day < Number(target_water)
          ? false
          : true,
    };
  });

  const total_water_intake_for_day = water
    .filter((data: any) => {
      const date = new Date(data.date);
      return isSameDay(date, selected_date);
    })
    .reduce(
      (total, water_data) =>
        total +
        water_data.data.reduce((total, water) => total + water.intake, 0),
      0
    );

  const set_water_data = (selected_date: Date) => {
    const intake_of_selected_date: WaterData[] = water.filter((step) => {
      return isSameDay(new Date(step.date), selected_date);
    });

    if (intake_of_selected_date?.length > 0) {
      setwater_data(intake_of_selected_date[0]?.data);
    } else {
      setwater_data([]);
    }
  };
  useEffect(() => {
    set_water_data(selected_date);
  }, [selected_date]);

  return (
    <View style={[globalStyles.background]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DateHeader days={all_water_of_achieved_goal?.length} />
      <DatesList
        onDateSelect={(date: any) => {
          // Do something with the selected date
        }}
        achievement_dates={all_water_of_achieved_goal}
        route="water"
      />
      <ScrollView
        style={{ marginHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: colors.foreground,
            borderRadius: 10,
            padding: 15,
            marginTop: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              width: "100%",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: font_family.font_semibold,
                  fontSize: 18,
                  color: colors.text,
                  width: 150,
                }}
              >
                Water Intake
              </Text>
            </View>
            <View>
              <Image
                source={icons.edit}
                style={{ width: 18, height: 18 }}
                tintColor={colors.light_gray}
              />
            </View>
          </View>

          <View style={{ alignItems: "center", marginVertical: 15 }}>
            <Progress.Circle
              progress={0.5}
              color={colors.button}
              thickness={10}
              size={230}
              borderWidth={1}
              unfilledColor={colors.background}
              strokeCap="round"
              borderColor={colors.background}
            />
            <View
              style={{
                zIndex: 2,
                top: 40,
                position: "absolute",
                alignItems: "center",
              }}
            >
              <Image source={icons.water} style={{ width: 40, height: 40 }} />
              <Text
                style={{
                  color: colors.text,
                  fontFamily: font_family.font_bold,
                  fontSize: 30,
                  marginTop: 10,
                }}
              >
                {format_number(total_water_intake_for_day)}
              </Text>
              <Text
                style={{
                  color: colors.light_gray,
                  fontFamily: font_family.font_semibold,
                  fontSize: 16,
                  marginTop: 0,
                }}
              >
                / {format_number(target_water)} ml
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: font_family.font_semibold,
              color: colors.light_gray,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Target Water:{" "}
            <Text
              style={{
                fontFamily: font_family.font_bold,
                color: colors.button,
                fontSize: 17,
                textAlign: "center",
              }}
            >
              {" "}
              {format_number(target_water)} ml
            </Text>
          </Text>
        </View>

        {water_data?.length > 0 && (
          <View
            style={{
              marginTop: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: font_family.font_semibold,
                fontSize: 18,
                width: 100,
                color: colors.text,
              }}
            >
              Water
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: colors.foreground,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 3,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}
              >
                <Image
                  source={icons.plus}
                  style={{
                    width: 13,
                    height: 13,
                    marginRight: 5,
                    marginBottom: 2,
                  }}
                  tintColor={colors.light_gray}
                />
                <Text
                  style={{
                    fontFamily: font_family.font_semibold,
                    fontSize: 15,
                    color: colors.text,
                    paddingTop: 2,
                  }}
                >
                  Add
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={{ marginBottom: 100 }}>
          {water_data.length > 0 ? (
            water_data.map((step: SingleWaterEntry) => {
              return (
                <View
                  key={step.id}
                  style={{
                    backgroundColor: colors.foreground,
                    marginTop: 10,
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    display: "flex",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <View style={{ width: "15%" }}>
                      <Image
                        source={icons.water}
                        style={{ width: 25, height: 25 }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "85%",
                      }}
                    >
                      <Text
                        numberOfLines={2}
                        style={{
                          color: colors.text,
                          fontSize: 16,
                          fontFamily: font_family.font_medium,
                          textTransform: "capitalize",
                        }}
                      >
                        {step.day_time}
                      </Text>
                      <Text
                        style={{
                          color: colors.button,
                          fontSize: 18,
                          fontFamily: font_family.font_semibold,
                        }}
                      >
                        {format_number(step.intake)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View
              style={{
                marginTop: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: font_family.font_semibold,
                  color: colors.text,
                }}
              >
                No water intake added
              </Text>
              <View
                style={{
                  backgroundColor: colors.foreground,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  marginTop: 10,
                }}
              >
                <Image
                  source={icons.plus}
                  style={{
                    width: 13,
                    height: 13,
                    marginRight: 10,
                  }}
                  tintColor={colors.light_gray}
                />
                <Text
                  style={{
                    fontFamily: font_family.font_semibold,
                    fontSize: 15,
                    color: colors.text,
                    paddingTop: 2,
                  }}
                >
                  Add Water Intake
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default WaterTrackerPage;
