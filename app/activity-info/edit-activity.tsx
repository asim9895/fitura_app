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
  read_activity_by_id_and_selected_date_data,
  udpate_activity_by_id_and_selected_date_data,
} from "@/api/activity_apis";
import { SingleActivityEntry } from "@/types";
import { Colors } from "@/theme/colors";

const hours: number[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
];

const minutes: number[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];

const EditActivityPage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const activity_id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { colors } = useSelector((state: AppRootState) => state.theme);
  const { selected_date } = useSelector((state: AppRootState) => state.user);
  const globalStyles = globalStylesWrapper(colors);
  const editActivityStyles = EditActivityWrapper(colors);
  const [hour_dropdown, sethour_dropdown] = useState(false);
  const [minutes_dropdown, setminutes_dropdown] = useState(false);
  const [activity, setactivity] = useState<SingleActivityEntry | null>(null);
  const initial_state = {
    burned: activity?.burned || 0,
    activity: activity?.activity || "",
    hour: activity?.hour || 0,
    minutes: activity?.minutes || 0,
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

  const find_calorie = async (selected_date: Date, activity_id: string) => {
    const data = await read_activity_by_id_and_selected_date_data(
      selected_date,
      activity_id
    );

    setactivity(data?.data);

    if (data?.status === 200) {
      setactivity(data?.data);
      setactivity_form({
        burned: data?.data?.burned || 0,
        activity: data?.data?.activity || "",
        hour: data?.data?.hour || 0,
        minutes: data?.data?.minutes || 0,
      });
    } else {
      setactivity(null);
    }
  };
  useEffect(() => {
    find_calorie(selected_date, activity_id);
  }, [activity_id, selected_date]);

  const update_calorie = async () => {
    const data = await udpate_activity_by_id_and_selected_date_data(
      selected_date,
      {
        ...activity_form,
        id: activity_id,
      }
    );

    if (data?.status === 200) {
      router.push("/calorie-tracker");
    } else {
    }
  };
  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={editActivityStyles.header}>
        <Text style={editActivityStyles.header_title}>Edit Calorie</Text>
        <TouchableOpacity
          style={{
            padding: 8,
          }}
          onPress={() => router.back()}
        >
          <Image
            source={icons.cross}
            style={editActivityStyles.close_icon}
            tintColor={colors.text}
          />
        </TouchableOpacity>
      </View>

      {activity !== null && (
        <ScrollView
          style={{ marginHorizontal: 20, marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginVertical: 5 }}>
            <Text style={editActivityStyles.input_title}>Activity</Text>
            <TextInput
              keyboardType="number-pad"
              placeholder="Enter serving size"
              value={activity_form.activity}
              placeholderTextColor={colors.light_gray}
              style={editActivityStyles.input}
              onChangeText={(text) =>
                setactivity_form({ ...activity_form, activity: text })
              }
            />
          </View>

          <View style={{ marginVertical: 5 }}>
            <Text style={editActivityStyles.input_title}>
              Burned Calories (kcal)
            </Text>
            <TextInput
              keyboardType="number-pad"
              placeholder="Enter burned calories"
              value={activity_form.burned.toString()}
              placeholderTextColor={colors.light_gray}
              style={editActivityStyles.input}
              onChangeText={(text) =>
                setactivity_form({ ...activity_form, burned: Number(text) })
              }
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={editActivityStyles.input_title}>Hour</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 12,
                width: "100%",
                borderRadius: 8,
                backgroundColor: colors.foreground,
                marginTop: 5,
              }}
              onPress={toggle_hour_dropdown}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: font_family.font_semibold,
                  marginRight: 8,
                  marginLeft: 10,
                  width: "90%",
                  color: colors.text,
                }}
              >
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
              <View
                style={{
                  width: "100%",
                  left: 0,
                  zIndex: 99,
                  right: 0,
                  marginTop: 10,
                }}
              >
                <ScrollView style={{ maxHeight: 200 }}>
                  {hours.map((unit) => (
                    <TouchableOpacity
                      key={unit}
                      style={[
                        {
                          paddingVertical: 12,
                          paddingHorizontal: 16,
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        },
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
                          {
                            fontSize: 16,
                            color: colors.text,
                            fontFamily: font_family.font_semibold,
                          },
                          activity_form.hour === unit && {
                            color: "#2196F3",
                            fontWeight: "500",
                          },
                        ]}
                      >
                        {unit}{" "}
                        {unit === 0 ||
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
                          : "hours"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={editActivityStyles.input_title}>Minutes</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 12,
                width: "100%",
                borderRadius: 8,
                backgroundColor: colors.foreground,
                marginTop: 5,
              }}
              onPress={toggle_minutes_dropdown}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: font_family.font_semibold,
                  marginRight: 8,
                  marginLeft: 10,
                  width: "90%",
                  color: colors.text,
                }}
              >
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
              <View
                style={{
                  width: "100%",
                  left: 0,
                  zIndex: 99,
                  right: 0,
                  marginTop: 10,
                }}
              >
                <ScrollView style={{ maxHeight: 200 }}>
                  {minutes.map((unit) => (
                    <TouchableOpacity
                      key={unit}
                      style={[
                        {
                          paddingVertical: 12,
                          paddingHorizontal: 16,
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        },
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
                          {
                            fontSize: 16,
                            color: colors.text,
                            fontFamily: font_family.font_semibold,
                          },
                          activity_form.minutes === unit && {
                            color: "#2196F3",
                            fontWeight: "500",
                          },
                        ]}
                      >
                        {unit}{" "}
                        {unit === 0 ||
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
                          : "minutes"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 10,
              backgroundColor: colors.button,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              update_calorie();
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
                fontFamily: font_family.font_semibold,
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export const EditActivityWrapper = (colors: Colors) =>
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
  });

export default EditActivityPage;
