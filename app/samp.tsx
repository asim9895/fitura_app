import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppRootState } from "@/redux/store";
import { useAppSelector } from "@/hooks/redux_hooks";
import { globalStylesWrapper } from "@/styles/global.style";
import DatesList from "@/components/DatesList";
import DateHeader from "@/components/DateHeader";
import { steps } from "@/data/test";
import { isSameDay } from "date-fns";
import { font_family } from "@/theme/font_family";
import { icons } from "@/data/icons";
import * as Progress from "react-native-progress";

type SingleStepEntry = {
  id: string;
  steps: number;
  day_time: string;
};

interface StepData {
  id: string;
  date: Date;
  data: SingleStepEntry[];
}

const StepsTrackerPage = () => {
  const [steps_data, setsteps_data] = useState<SingleStepEntry[]>([]);
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const { selected_date, target_steps } = useAppSelector(
    (state: AppRootState) => state.user
  );

  const globalStyles = globalStylesWrapper(colors);

  const set_steps_data = (selected_date: Date) => {
    const steps_of_selected_date: StepData[] = steps.filter((step) => {
      return isSameDay(new Date(step.date), selected_date);
    });

    if (steps_of_selected_date?.length > 0) {
      setsteps_data(steps_of_selected_date[0]?.data);
    } else {
      setsteps_data([]);
    }
  };
  useEffect(() => {
    set_steps_data(selected_date);
  }, [selected_date]);

  const total_steps_for_day = steps
    .filter((data: any) => {
      const date = new Date(data.date);
      return isSameDay(date, selected_date);
    })
    .reduce(
      (total, step) =>
        total + step.data.reduce((total, step) => total + step.steps, 0),
      0
    );

  const all_steps_of_achieved_goal = steps?.map((steps: any) => {
    const date = new Date(steps.date);
    const steps_of_day = steps.data.reduce((total: any, step: any) => {
      return total + step.steps;
    }, 0);
    return {
      date: date,
      count: steps_of_day,
    };
  });

  const FlatListHeaderComponent = () => (
    <View style={{ marginHorizontal: 15 }}>
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
                width: 100,
              }}
            >
              Today
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
            progress={total_steps_for_day / target_steps}
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
            <Image source={icons.shoe} style={{ width: 50, height: 50 }} />
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_bold,
                fontSize: 30,
                marginTop: 10,
              }}
            >
              {total_steps_for_day}
            </Text>
            <Text
              style={{
                color: colors.light_gray,
                fontFamily: font_family.font_semibold,
                fontSize: 16,
                marginTop: 0,
              }}
            >
              / {target_steps}
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
          Target Steps:{" "}
          <Text
            style={{
              fontFamily: font_family.font_bold,
              color: colors.button,
              fontSize: 17,
              textAlign: "center",
            }}
          >
            {" "}
            {target_steps}
          </Text>
        </Text>
      </View>

      {steps_data?.length > 0 && (
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
            Steps
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
                paddingVertical: 0,
                paddingHorizontal: 10,
                borderRadius: 5,
                marginRight: 10,
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
    </View>
  );

  const FlatListEmptyComponent = () => (
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
        No steps added
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
          Add Steps
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[globalStyles.background]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DateHeader days={all_steps_of_achieved_goal?.length} />
      <DatesList
        onDateSelect={(date: any) => {
          console.log("Selected date:", date);
          // Do something with the selected date
        }}
        achievement_dates={all_steps_of_achieved_goal}
        budget_data={700}
      />

      <FlatList<SingleStepEntry>
        data={steps_data}
        renderItem={({ item }) => {
          return (
            <View key={item.id} style={{}}>
              <Text>{item.steps}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(data) => data.id}
        ListHeaderComponent={FlatListHeaderComponent}
        ListEmptyComponent={FlatListEmptyComponent}
      />
    </View>
  );
};
export default StepsTrackerPage;
