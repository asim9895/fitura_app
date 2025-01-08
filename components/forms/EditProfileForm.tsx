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
import {
  activity_factor_options,
  age_yrs,
  gender_list,
  height_options,
  hours,
  minutes,
  weight_loss_intensity_options,
  weight_options,
} from "@/data/options";
import { ActivityFactor, Gender, WeightLossIntensity } from "@/types";
import Modal from "react-native-modal";

interface EditProfileFormProps {
  form: {
    gender: Gender;
    activity_factor: ActivityFactor;
    height: number;
    weight: number;
    target_steps: number;
    target_water: number;
    target_weight: number;
    birth_year: number;
    weight_loss_intensity: WeightLossIntensity;
    name: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      gender: Gender;
      activity_factor: ActivityFactor;
      height: number;
      weight: number;
      target_steps: number;
      target_water: number;
      target_weight: number;
      birth_year: number;
      weight_loss_intensity: WeightLossIntensity;
      name: string;
    }>
  >;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ form, setForm }) => {
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const editActivityStyles = ActivityFormWrapper(colors);
  const [weight_dropdown, setweight_dropdown] = useState(false);
  const [target_weight_dropdown, settarget_weight_dropdown] = useState(false);
  const [height_dropdown, setheight_dropdown] = useState(false);
  const [gender_dropdown, setgender_dropdown] = useState(false);
  const [activity_factor_dropdown, setactivity_factor_dropdown] =
    useState(false);
  const [birth_year_dropdown, setbirth_year_dropdown] = useState(false);
  const [weight_loss_intensity_dropdown, setweight_loss_intensity_dropdown] =
    useState(false);
  const toggle_weight_dropdown = () => {
    settarget_weight_dropdown(false);
    setheight_dropdown(false);
    setactivity_factor_dropdown(false);
    setbirth_year_dropdown(false);
    setweight_loss_intensity_dropdown(false);
    setgender_dropdown(false);
    setweight_dropdown(!weight_dropdown);
  };

  const toggle_target_weight_dropdown = () => {
    setheight_dropdown(false);
    setactivity_factor_dropdown(false);
    setbirth_year_dropdown(false);
    setweight_loss_intensity_dropdown(false);
    setgender_dropdown(false);
    setweight_dropdown(false);
    settarget_weight_dropdown(!target_weight_dropdown);
  };
  const toggle_height_dropdown = () => {
    setheight_dropdown(!height_dropdown);
    setactivity_factor_dropdown(false);
    setbirth_year_dropdown(false);
    setweight_loss_intensity_dropdown(false);
    setgender_dropdown(false);
    setweight_dropdown(false);
    settarget_weight_dropdown(false);
  };
  const toggle_gender_dropdown = () => {
    setheight_dropdown(false);
    setactivity_factor_dropdown(false);
    setbirth_year_dropdown(false);
    setweight_loss_intensity_dropdown(false);
    setgender_dropdown(!gender_dropdown);
    setweight_dropdown(false);
    settarget_weight_dropdown(false);
  };
  const toggle_activity_factor_dropdown = () => {
    setheight_dropdown(false);
    setactivity_factor_dropdown(!activity_factor_dropdown);
    setbirth_year_dropdown(false);
    setweight_loss_intensity_dropdown(false);
    setgender_dropdown(false);
    setweight_dropdown(false);
    settarget_weight_dropdown(false);
  };
  const toggle_weight_loss_intensity_dropdown = () => {
    setheight_dropdown(false);
    setactivity_factor_dropdown(false);
    setbirth_year_dropdown(false);
    setweight_loss_intensity_dropdown(!weight_loss_intensity_dropdown);
    setgender_dropdown(false);
    setweight_dropdown(false);
    settarget_weight_dropdown(false);
  };
  const toggle_birth_year_dropdown = () => {
    setheight_dropdown(false);
    setactivity_factor_dropdown(false);
    setbirth_year_dropdown(!birth_year_dropdown);
    setweight_loss_intensity_dropdown(false);
    setgender_dropdown(false);
    setweight_dropdown(false);
    settarget_weight_dropdown(false);
  };
  return (
    <View>
      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>Name</Text>
        <TextInput
          keyboardType="default"
          placeholder="Enter name"
          value={form.name}
          placeholderTextColor={colors.light_gray}
          style={editActivityStyles.input}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
      </View>

      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>Target Steps</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Enter target steps"
          value={form.target_steps.toString()}
          placeholderTextColor={colors.light_gray}
          style={editActivityStyles.input}
          onChangeText={(text) =>
            setForm({ ...form, target_steps: Number(text) })
          }
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>Target Water Intake</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Enter target water intake"
          value={form.target_water.toString()}
          placeholderTextColor={colors.light_gray}
          style={editActivityStyles.input}
          onChangeText={(text) =>
            setForm({ ...form, target_water: Number(text) })
          }
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>Weight</Text>
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
          onPress={toggle_weight_dropdown}
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
            {form.weight}
          </Text>
          <Image
            source={weight_dropdown ? icons.arrow_up : icons.arrow_down}
            style={{ width: 16, height: 16, marginRight: 8 }}
            tintColor={colors.text}
          />
        </TouchableOpacity>
        {/* Dropdown Menu */}
        <Modal isVisible={weight_dropdown}>
          <View
            style={{
              width: "100%",
              zIndex: 99,
              marginTop: 10,
              padding: 10,
              backgroundColor: colors.foreground,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_semibold,
                fontSize: 15,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Select Weight
            </Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {weight_options.map((unit) => (
                <TouchableOpacity
                  key={unit.kg}
                  style={[
                    {
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    form.weight === unit.kg && {
                      backgroundColor: colors.background,
                    },
                  ]}
                  onPress={() => {
                    setForm({
                      ...form,
                      weight: Number(unit.kg),
                    });
                    setweight_dropdown(false);
                  }}
                >
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: colors.text,
                        fontFamily: font_family.font_semibold,
                      },
                      form.weight === unit.kg && {
                        color: "#2196F3",
                        fontWeight: "500",
                      },
                    ]}
                  >
                    {unit.kg} kg - {unit.lbs} lbs
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>Target Weight</Text>
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
          onPress={toggle_target_weight_dropdown}
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
            {form.target_weight}
          </Text>
          <Image
            source={target_weight_dropdown ? icons.arrow_up : icons.arrow_down}
            style={{ width: 16, height: 16, marginRight: 8 }}
            tintColor={colors.text}
          />
        </TouchableOpacity>
        {/* Dropdown Menu */}
        <Modal isVisible={target_weight_dropdown}>
          <View
            style={{
              width: "100%",
              zIndex: 99,
              marginTop: 10,
              padding: 10,
              backgroundColor: colors.foreground,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_semibold,
                fontSize: 15,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Select Target Weight
            </Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {weight_options.map((unit) => (
                <TouchableOpacity
                  key={unit.kg}
                  style={[
                    {
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    form.target_weight === unit.kg && {
                      backgroundColor: colors.background,
                    },
                  ]}
                  onPress={() => {
                    setForm({
                      ...form,
                      target_weight: Number(unit.kg),
                    });
                    settarget_weight_dropdown(false);
                  }}
                >
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: colors.text,
                        fontFamily: font_family.font_semibold,
                      },
                      form.target_weight === unit.kg && {
                        color: "#2196F3",
                        fontWeight: "500",
                      },
                    ]}
                  >
                    {unit.kg} kg - {unit.lbs} lbs
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>Height</Text>
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
          onPress={toggle_height_dropdown}
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
            {form.height}
          </Text>
          <Image
            source={height_dropdown ? icons.arrow_up : icons.arrow_down}
            style={{ width: 16, height: 16, marginRight: 8 }}
            tintColor={colors.text}
          />
        </TouchableOpacity>
        {/* Dropdown Menu */}
        <Modal isVisible={height_dropdown}>
          <View
            style={{
              width: "100%",

              zIndex: 99,

              marginTop: 10,
              backgroundColor: colors.foreground,
              padding: 10,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_semibold,
                fontSize: 15,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Select Height
            </Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {height_options.map((unit) => (
                <TouchableOpacity
                  key={unit.cm}
                  style={[
                    {
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    form.height === unit.cm && {
                      backgroundColor: colors.background,
                    },
                  ]}
                  onPress={() => {
                    setForm({
                      ...form,
                      height: Number(unit.cm),
                    });
                    setheight_dropdown(false);
                  }}
                >
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: colors.text,
                        fontFamily: font_family.font_semibold,
                      },
                      form.height === unit.cm && {
                        color: "#2196F3",
                        fontWeight: "500",
                      },
                    ]}
                  >
                    {unit.cm} cm - ({unit.feet} ft {unit.inches} in)
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>Birth Year</Text>
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
          onPress={toggle_birth_year_dropdown}
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
            {form.birth_year}
          </Text>
          <Image
            source={birth_year_dropdown ? icons.arrow_up : icons.arrow_down}
            style={{ width: 16, height: 16, marginRight: 8 }}
            tintColor={colors.text}
          />
        </TouchableOpacity>
        {/* Dropdown Menu */}
        <Modal isVisible={birth_year_dropdown}>
          <View
            style={{
              width: "100%",
              zIndex: 99,
              marginTop: 10,
              padding: 10,
              backgroundColor: colors.foreground,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_semibold,
                fontSize: 15,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Select Age
            </Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {age_yrs.map((unit) => (
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
                    form.birth_year === unit && {
                      backgroundColor: colors.background,
                    },
                  ]}
                  onPress={() => {
                    setForm({
                      ...form,
                      birth_year: Number(unit),
                    });
                    setbirth_year_dropdown(false);
                  }}
                >
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: colors.text,
                        fontFamily: font_family.font_semibold,
                      },
                      form.birth_year === unit && {
                        color: "#2196F3",
                        fontWeight: "500",
                      },
                    ]}
                  >
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>Gender</Text>
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
          onPress={toggle_gender_dropdown}
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
            {form.gender}
          </Text>
          <Image
            source={gender_dropdown ? icons.arrow_up : icons.arrow_down}
            style={{ width: 16, height: 16, marginRight: 8 }}
            tintColor={colors.text}
          />
        </TouchableOpacity>
        {/* Dropdown Menu */}
        <Modal isVisible={gender_dropdown}>
          <View
            style={{
              width: "100%",
              zIndex: 99,
              marginTop: 10,
              padding: 10,
              backgroundColor: colors.foreground,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_semibold,
                fontSize: 15,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Select Gender
            </Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {gender_list.map((unit) => (
                <TouchableOpacity
                  key={unit.title}
                  style={[
                    {
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    form.gender === unit.title && {
                      backgroundColor: colors.background,
                    },
                  ]}
                  onPress={() => {
                    setForm({
                      ...form,
                      gender: unit.title,
                    });
                    setgender_dropdown(false);
                  }}
                >
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: colors.text,
                        fontFamily: font_family.font_semibold,
                      },
                      form.gender === unit.title && {
                        color: "#2196F3",
                        fontWeight: "500",
                      },
                    ]}
                  >
                    {unit.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>
          Weight Loss Intensity
        </Text>
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
          onPress={toggle_weight_loss_intensity_dropdown}
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
            {form.weight_loss_intensity}
          </Text>
          <Image
            source={
              weight_loss_intensity_dropdown ? icons.arrow_up : icons.arrow_down
            }
            style={{ width: 16, height: 16, marginRight: 8 }}
            tintColor={colors.text}
          />
        </TouchableOpacity>
        {/* Dropdown Menu */}
        <Modal isVisible={weight_loss_intensity_dropdown}>
          <View
            style={{
              width: "100%",
              zIndex: 99,
              marginTop: 10,
              padding: 10,
              backgroundColor: colors.foreground,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_semibold,
                fontSize: 15,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Select Weight Loss Intensity (kg /week)
            </Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {weight_loss_intensity_options.map((unit) => (
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
                    form.weight_loss_intensity === unit && {
                      backgroundColor: colors.background,
                    },
                  ]}
                  onPress={() => {
                    setForm({
                      ...form,
                      weight_loss_intensity: Number(
                        unit
                      ) as WeightLossIntensity,
                    });
                    setweight_loss_intensity_dropdown(false);
                  }}
                >
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: colors.text,
                        fontFamily: font_family.font_semibold,
                      },
                      form.weight_loss_intensity === unit && {
                        color: "#2196F3",
                        fontWeight: "500",
                      },
                    ]}
                  >
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={editActivityStyles.input_title}>Activity Factor</Text>
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
          onPress={toggle_activity_factor_dropdown}
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
            {form.activity_factor}
          </Text>
          <Image
            source={
              activity_factor_dropdown ? icons.arrow_up : icons.arrow_down
            }
            style={{ width: 16, height: 16, marginRight: 8 }}
            tintColor={colors.text}
          />
        </TouchableOpacity>
        {/* Dropdown Menu */}
        <Modal isVisible={activity_factor_dropdown}>
          <View
            style={{
              width: "100%",
              zIndex: 99,
              marginTop: 10,
              padding: 10,
              backgroundColor: colors.foreground,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: font_family.font_semibold,
                fontSize: 15,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Select Activity Factor
            </Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {activity_factor_options.map((unit) => (
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
                    form.activity_factor === unit && {
                      backgroundColor: colors.background,
                    },
                  ]}
                  onPress={() => {
                    setForm({
                      ...form,
                      activity_factor: unit as ActivityFactor,
                    });
                    setactivity_factor_dropdown(false);
                  }}
                >
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        color: colors.text,
                        fontFamily: font_family.font_semibold,
                      },
                      form.activity_factor === unit && {
                        color: "#2196F3",
                        fontWeight: "500",
                      },
                    ]}
                  >
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default EditProfileForm;

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
