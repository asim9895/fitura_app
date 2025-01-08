import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import { useRouter } from "expo-router";
import { icons } from "@/data/icons";
import EditProfileForm from "@/components/forms/EditProfileForm";
import { useDispatch } from "react-redux";
import { set_user_profile } from "@/redux/slices/user_slice";
import { add_or_update_weight_of_selected_data_api } from "@/api/weight_apis";

const EditProfile = () => {
  const {
    gender,
    activity_factor,
    height,
    weight,
    target_steps,
    target_water,
    target_weight,
    age,
    weight_loss_intensity,
    name,
    creation_date,
    selected_date,
  } = useAppSelector((state: AppRootState) => state.user);
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const globalStyles = globalStylesWrapper(colors);
  const router = useRouter();
  const dispatch = useDispatch();

  const initial_state = {
    gender,
    activity_factor,
    height,
    weight,
    target_steps,
    target_water,
    target_weight,
    birth_year: new Date().getFullYear() - age,
    weight_loss_intensity,
    name,
  };

  const [edit_profile_form, setedit_profile_form] = useState(initial_state);

  const edit_profile = async () => {
    dispatch(
      set_user_profile({
        name: edit_profile_form.name,
        age: new Date().getFullYear() - edit_profile_form.birth_year,
        height: edit_profile_form.height,
        weight: edit_profile_form.weight,
        gender: edit_profile_form.gender,
        profile_completed: true,
        creation_date,
        weight_loss_intensity: edit_profile_form.weight_loss_intensity,
        target_weight: edit_profile_form.target_weight,
        activity_factor: edit_profile_form.activity_factor,
      })
    );
    await add_or_update_weight_of_selected_data_api(
      selected_date,
      edit_profile_form.weight
    );
    router.push("/profile");
  };
  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.header_title}>Edit Profile</Text>
        <TouchableOpacity
          style={{
            padding: 8,
          }}
          onPress={() => router.back()}
        >
          <Image
            source={icons.cross}
            style={globalStyles.close_icon}
            tintColor={colors.text}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <EditProfileForm
          form={edit_profile_form}
          setForm={setedit_profile_form}
        />
        <TouchableOpacity
          style={globalStyles.submit_button}
          onPress={edit_profile}
        >
          <Text style={globalStyles.submit_button_text}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
