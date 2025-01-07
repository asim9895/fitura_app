import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import { font_family } from "@/theme/font_family";
import { useRouter } from "expo-router";
import { icons } from "@/data/icons";
import {
  add_activities_data_api,
  read_activity_by_id_and_selected_date_data,
  udpate_activity_by_id_and_selected_date_data,
} from "@/api/activity_apis";
import { SingleActivityEntry } from "@/types";
import { Colors } from "@/theme/colors";
import { generate_uuid } from "@/utils/generate_uuid";
import { hours, minutes } from "@/data/options";

const AddActivityLogPage = () => {
  const router = useRouter();
  const { colors } = useSelector((state: AppRootState) => state.theme);
  const { selected_date } = useSelector((state: AppRootState) => state.user);
  const globalStyles = globalStylesWrapper(colors);
  const addActivityLogStyles = AddActivityLogWrapper(colors);
  const [hour_dropdown, sethour_dropdown] = useState(false);
  const [minutes_dropdown, setminutes_dropdown] = useState(false);

  const initial_state = {
    burned: 0,
    activity: "",
    hour: 0,
    minutes: 0,
  };

  const show_value = (unit: number, unit_type: string) => {
    if (unit_type === "minutes") {
      return unit === 0 ||
        unit === 1 ||
        unit === 2 ||
        unit === 3 ||
        unit === 4 ||
        unit === 5 ||
        unit === 6 ||
        unit === 7 ||
        unit === 8 ||
        unit === 9
        ? "minute"
        : "minutes";
    }
    if (unit_type === "hours") {
      return unit === 0 ||
        unit === 1 ||
        unit === 2 ||
        unit === 3 ||
        unit === 4 ||
        unit === 5 ||
        unit === 6 ||
        unit === 7 ||
        unit === 8 ||
        unit === 9
        ? "hour"
        : "hours";
    }
  };

  const [activity_form, setactivity_form] = useState(initial_state);
  const toggle_hour_dropdown = () => {
    setminutes_dropdown(false);
    sethour_dropdown(!hour_dropdown);
  };

  const toggle_minutes_dropdown = () => {
    sethour_dropdown(false);
    setminutes_dropdown(!minutes_dropdown);
  };

  const update_calorie = async () => {
    const data = await add_activities_data_api(
      [
        {
          ...activity_form,
          id: generate_uuid(),
        },
      ],
      selected_date
    );

    if (data?.status === 200) {
      router.push("/calorie-tracker");
    } else {
    }
  };
  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={addActivityLogStyles.header}>
        <Text style={addActivityLogStyles.header_title}>Add Activity Log</Text>
        <TouchableOpacity
          style={{
            padding: 8,
          }}
          onPress={() => router.back()}
        >
          <Image
            source={icons.cross}
            style={addActivityLogStyles.close_icon}
            tintColor={colors.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ marginHorizontal: 20, marginTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginVertical: 5 }}>
          <Text style={addActivityLogStyles.input_title}>Activity</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="Enter activity"
            value={activity_form.activity}
            placeholderTextColor={colors.light_gray}
            style={addActivityLogStyles.input}
            onChangeText={(text) =>
              setactivity_form({ ...activity_form, activity: text })
            }
          />
        </View>

        <View style={{ marginVertical: 5 }}>
          <Text style={addActivityLogStyles.input_title}>
            Burned Calories (kcal)
          </Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="Enter burned calories"
            value={activity_form.burned.toString()}
            placeholderTextColor={colors.light_gray}
            style={addActivityLogStyles.input}
            onChangeText={(text) =>
              setactivity_form({ ...activity_form, burned: Number(text) })
            }
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={addActivityLogStyles.input_title}>Hour</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={addActivityLogStyles.dropdown_controller}
            onPress={toggle_hour_dropdown}
          >
            <Text style={addActivityLogStyles.dropdown_controller_text}>
              {activity_form.hour}
            </Text>
            <Image
              source={hour_dropdown ? icons.arrow_up : icons.arrow_down}
              style={{ width: 16, height: 16, marginRight: 8 }}
              tintColor={colors.text}
            />
          </TouchableOpacity>
          {/* Dropdown Menu */}
          {hour_dropdown && (
            <View style={addActivityLogStyles.dropdown_value_container}>
              <ScrollView style={{ maxHeight: 200 }}>
                {hours.map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    style={[
                      addActivityLogStyles.dropdown_options_background,
                      activity_form.hour === unit && {
                        backgroundColor: colors.foreground,
                      },
                    ]}
                    onPress={() => {
                      setactivity_form({
                        ...activity_form,
                        hour: Number(unit),
                      });
                      sethour_dropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        addActivityLogStyles.dropdown_option_text,
                        activity_form.hour === unit && {
                          color: "#2196F3",
                          fontWeight: "500",
                        },
                      ]}
                    >
                      {unit} {show_value(unit, "hours")}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={addActivityLogStyles.input_title}>Minutes</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={addActivityLogStyles.dropdown_controller}
            onPress={toggle_minutes_dropdown}
          >
            <Text style={addActivityLogStyles.dropdown_controller_text}>
              {activity_form.minutes}
            </Text>
            <Image
              source={minutes_dropdown ? icons.arrow_up : icons.arrow_down}
              style={{ width: 16, height: 16, marginRight: 8 }}
              tintColor={colors.text}
            />
          </TouchableOpacity>
          {/* Dropdown Menu */}
          {minutes_dropdown && (
            <View style={addActivityLogStyles.dropdown_value_container}>
              <ScrollView style={{ maxHeight: 200 }}>
                {minutes.map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    style={[
                      addActivityLogStyles.dropdown_options_background,
                      activity_form.minutes === unit && {
                        backgroundColor: colors.foreground,
                      },
                    ]}
                    onPress={() => {
                      setactivity_form({
                        ...activity_form,
                        minutes: Number(unit),
                      });
                      setminutes_dropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        addActivityLogStyles.dropdown_option_text,
                        activity_form.minutes === unit && {
                          color: "#2196F3",
                          fontWeight: "500",
                        },
                      ]}
                    >
                      {unit} {show_value(unit, "minutes")}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={addActivityLogStyles.submit_button}
          onPress={() => {
            update_calorie();
          }}
        >
          <Text style={addActivityLogStyles.submit_button_text}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AddActivityLogWrapper = (colors: Colors) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.foreground,
      zIndex: 1000,
    },
    header_title: {
      color: colors.text,
      fontFamily: font_family.font_semibold,
      fontSize: 17,
    },
    close_icon: { width: 16, height: 16, marginRight: 5 },
    input_title: {
      fontFamily: font_family.font_medium,
      fontSize: 14,
      color: colors.text,
      marginLeft: 5,
    },
    input: {
      backgroundColor: colors.foreground,
      padding: 13,
      borderRadius: 8,
      marginVertical: 5,
      fontFamily: font_family.font_medium,
      color: colors.text,
    },
    submit_button: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      backgroundColor: colors.button,
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    submit_button_text: {
      fontSize: 16,
      color: colors.text,
      fontFamily: font_family.font_semibold,
    },
    dropdown_controller: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 12,
      width: "100%",
      borderRadius: 8,
      backgroundColor: colors.foreground,
      marginTop: 5,
    },
    dropdown_controller_text: {
      fontSize: 16,
      fontFamily: font_family.font_semibold,
      marginRight: 8,
      marginLeft: 10,
      width: "90%",
      color: colors.text,
    },
    dropdown_value_container: {
      width: "100%",
      left: 0,
      zIndex: 99,
      right: 0,
      marginTop: 10,
    },
    dropdown_options_background: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    dropdown_option_text: {
      fontSize: 16,
      color: colors.text,
      fontFamily: font_family.font_semibold,
    },
  });

export default AddActivityLogPage;
