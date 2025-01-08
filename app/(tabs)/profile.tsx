import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { Colors } from "@/theme/colors";
import { globalStylesWrapper } from "@/styles/global.style";
import { AppRootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { clear_user_profile } from "@/redux/slices/user_slice";
import { format_number } from "@/utils/variables";
import { remove_all_weight_data } from "@/api/weight_apis";
import { icons } from "@/data/icons";
import { profileStylesWrapper } from "@/styles/app/tabs/profile.style";
import ProfileCard from "@/components/profile_components/ProfileCard";
import { height_options } from "@/data/options";
import { remove_all_food_data } from "@/api/food_apis";
import { remove_all_calorie_data } from "@/api/calorie_apis";
import { remove_all_step_data } from "@/api/steps_apis";
import { font_family } from "@/theme/font_family";
import { remove_all_activity_data } from "@/api/activity_apis";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { colors }: { colors: Colors } = useSelector(
    (state: AppRootState) => state.theme
  );

  const router = useRouter();

  const profileStyles = profileStylesWrapper(colors);

  const clearProfile = async () => {
    await remove_all_food_data();
    await remove_all_calorie_data();
    await remove_all_step_data();
    await remove_all_weight_data();
    await remove_all_activity_data();
    dispatch(clear_user_profile());
    router.push("/setup-profile");
  };

  const globalStyles = globalStylesWrapper(colors);

  return (
    <SafeAreaView style={globalStyles.background}>
      <View
        style={[
          profileStyles.header_container,
          { justifyContent: "space-between", flexDirection: "row" },
        ]}
      >
        <Text style={profileStyles.header_text}>Profile</Text>
        <TouchableOpacity onPress={() => router.push("/edit-profile")}>
          <Image
            source={icons.edit}
            style={[profileStyles.edit_icon]}
            tintColor={colors.light_gray}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileCard show_icon={icons.name} title="Name" value={user.name} />
        <ProfileCard
          show_icon={icons.gender}
          title="Gender"
          value={user.gender}
        />
        <ProfileCard
          show_icon={icons.height}
          title="Height"
          value={`${
            height_options?.find((item) => item.cm === user.height)?.cm
          } cm or ${
            height_options?.find((item) => item.cm === user.height)?.display
          }`}
        />
        <ProfileCard
          show_icon={icons.weight}
          title="Weight"
          value={`${user.weight} kg`}
        />
        <ProfileCard
          show_icon={icons.target_weight}
          title="Target Weight"
          value={`${user.target_weight} kg`}
        />
        <ProfileCard
          show_icon={icons.age}
          title="Age"
          value={`${user.age} years`}
        />
        <ProfileCard
          show_icon={icons.water}
          title="Target Water Intake"
          value={`${format_number(user?.target_water)} ml`}
        />
        <ProfileCard
          show_icon={icons.shoe}
          title="Target Steps"
          value={user.target_steps?.toString()}
        />
        <ProfileCard
          show_icon={icons.intensity}
          title="Weight Loss Intensity"
          value={`${user.weight_loss_intensity?.toString()} kg / week`}
        />
        <ProfileCard
          show_icon={icons.activity_factor}
          title="Activity Factor"
          value={`${user.activity_factor?.toString()}`}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: colors.error,
            padding: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            marginVertical: 10,
            marginBottom: 100,
          }}
          onPress={clearProfile}
        >
          <Text
            style={{
              color: colors.text,
              fontFamily: font_family.font_medium,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Clear Profile And Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* <Button onPress={add_or_update_weight_data} title="Update Weight" />

     
      
     
      */}
    </SafeAreaView>
  );
};
export default ProfilePage;
