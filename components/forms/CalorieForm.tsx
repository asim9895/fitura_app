import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/theme/colors";
import { font_family } from "@/theme/font_family";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { icons } from "@/data/icons";
import { serving_units } from "@/data/options";

interface CalorieFormProps {
  calorie_form: {
    name: string;
    calorie: number;
    protein: number;
    carbs: number;
    fat: number;
    note: string;
    serving_size: number;
    serving_unit: string;
  };
  setcalorie_form: React.Dispatch<
    React.SetStateAction<{
      name: string;
      calorie: number;
      protein: number;
      carbs: number;
      fat: number;
      note: string;
      serving_size: number;
      serving_unit: any;
    }>
  >;
}

const CalorieForm: React.FC<CalorieFormProps> = ({
  calorie_form,
  setcalorie_form,
}) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const calorieFormStyles = CalorieFormWrapper(colors);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <View>
      <View style={{ marginVertical: 5 }}>
        <Text style={calorieFormStyles.input_title}>Calorie Name</Text>
        <TextInput
          keyboardType="default"
          placeholder="Enter calorie name"
          value={calorie_form.name}
          placeholderTextColor={colors.light_gray}
          style={calorieFormStyles.input}
          onChangeText={(text) =>
            setcalorie_form({ ...calorie_form, name: text })
          }
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={calorieFormStyles.input_title}>Serving Size</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Enter serving size"
          value={calorie_form.serving_size.toString()}
          placeholderTextColor={colors.light_gray}
          style={calorieFormStyles.input}
          onChangeText={(text) =>
            setcalorie_form({ ...calorie_form, serving_size: Number(text) })
          }
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={calorieFormStyles.input_title}>Serving Unit</Text>
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
          onPress={toggleDropdown}
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
            {calorie_form.serving_unit}
          </Text>
          <Image
            source={isDropdownOpen ? icons.arrow_up : icons.arrow_down}
            style={{ width: 16, height: 16, marginRight: 8 }}
            tintColor={colors.text}
          />
        </TouchableOpacity>
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              left: 0,
              zIndex: 99,
              right: 0,
              backgroundColor: colors.foreground,
              borderRadius: 10,
              marginTop: 80,
              elevation: 5,
            }}
          >
            {serving_units.map((unit) => (
              <TouchableOpacity
                key={unit}
                style={[
                  {
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderTopEndRadius: 10,
                    borderTopStartRadius: 10,
                    borderBottomEndRadius: 10,
                    borderBottomStartRadius: 10,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  },
                  calorie_form.serving_unit === unit && {
                    backgroundColor: colors.foreground,
                  },
                ]}
                onPress={() => {
                  setcalorie_form({
                    ...calorie_form,
                    serving_unit: unit,
                  });
                  setIsDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: 16,
                      color: colors.text,
                      fontFamily: font_family.font_semibold,
                    },
                    calorie_form.serving_unit === unit && {
                      color: "#2196F3",
                      fontWeight: "500",
                    },
                  ]}
                >
                  {unit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={calorieFormStyles.input_title}>Calorie (kcal)</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Enter calories"
          value={calorie_form.calorie.toString()}
          placeholderTextColor={colors.light_gray}
          style={calorieFormStyles.input}
          onChangeText={(text) =>
            setcalorie_form({ ...calorie_form, calorie: Number(text) })
          }
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={calorieFormStyles.input_title}>Protein (g)</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Enter protein"
          value={calorie_form.protein.toString()}
          placeholderTextColor={colors.light_gray}
          style={calorieFormStyles.input}
          onChangeText={(text) =>
            setcalorie_form({ ...calorie_form, protein: Number(text) })
          }
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={calorieFormStyles.input_title}>Carbs (g)</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Enter carbs"
          value={calorie_form.carbs.toString()}
          placeholderTextColor={colors.light_gray}
          style={calorieFormStyles.input}
          onChangeText={(text) =>
            setcalorie_form({ ...calorie_form, carbs: Number(text) })
          }
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={calorieFormStyles.input_title}>Fat (g)</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Enter fat"
          value={calorie_form.fat.toString()}
          placeholderTextColor={colors.light_gray}
          style={calorieFormStyles.input}
          onChangeText={(text) =>
            setcalorie_form({ ...calorie_form, fat: Number(text) })
          }
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={calorieFormStyles.input_title}>Note</Text>
        <TextInput
          keyboardType="default"
          numberOfLines={12}
          multiline={true}
          placeholder="Enter note"
          value={calorie_form.note}
          placeholderTextColor={colors.light_gray}
          style={calorieFormStyles.input}
          onChangeText={(text) =>
            setcalorie_form({ ...calorie_form, note: text })
          }
        />
      </View>
    </View>
  );
};

export default CalorieForm;

export const CalorieFormWrapper = (colors: Colors) =>
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
