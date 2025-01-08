import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/theme/colors";
import { font_family } from "@/theme/font_family";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { icons } from "@/data/icons";
import { hours, minutes } from "@/data/options";

interface ActivityFormProps {
  form: {
    activity: string;
    burned: number;
    hour: number;
    minutes: number;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      activity: string;
      burned: number;
      hour: number;
      minutes: number;
    }>
  >;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ form, setForm }) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const editActivityStyles = ActivityFormWrapper(colors);
  const [hour_dropdown, sethour_dropdown] = useState(false);
  const [minutes_dropdown, setminutes_dropdown] = useState(false);
  const toggle_hour_dropdown = () => {
    setminutes_dropdown(false);
    sethour_dropdown(!hour_dropdown);
  };

  const toggle_minutes_dropdown = () => {
    sethour_dropdown(false);
    setminutes_dropdown(!minutes_dropdown);
  };
  return (
    <View>
      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>Activity</Text>
        <TextInput
          keyboardType="default"
          placeholder="Enter activity"
          value={form.activity}
          placeholderTextColor={colors.light_gray}
          style={editActivityStyles.input}
          onChangeText={(text) => setForm({ ...form, activity: text })}
        />
      </View>

      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>
          Burned Calories (kcal)
        </Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Enter burned calories"
          value={form.burned.toString()}
          placeholderTextColor={colors.light_gray}
          style={editActivityStyles.input}
          onChangeText={(text) => setForm({ ...form, burned: Number(text) })}
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>Hour</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
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
            {form.hour}
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
                    form.hour === unit && {
                      backgroundColor: colors.foreground,
                    },
                  ]}
                  onPress={() => {
                    setForm({
                      ...form,
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
                      form.hour === unit && {
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
            paddingVertical: 12,
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
            {form.minutes}
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
                    form.minutes === unit && {
                      backgroundColor: colors.foreground,
                    },
                  ]}
                  onPress={() => {
                    setForm({
                      ...form,
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
                      form.minutes === unit && {
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
    </View>
  );
};

export default ActivityForm;

export const ActivityFormWrapper = (colors: Colors) =>
  StyleSheet.create({
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
