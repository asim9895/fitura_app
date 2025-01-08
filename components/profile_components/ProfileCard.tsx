import { View, Text, Image } from "react-native";
import React from "react";
import { profileStylesWrapper } from "@/styles/app/tabs/profile.style";
import { Colors } from "@/theme/colors";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import { icons } from "@/data/icons";

interface ProfileCardProps {
  show_icon: any;
  title: string;
  value: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  show_icon,
  title,
  value,
}) => {
  const { colors }: { colors: Colors } = useSelector(
    (state: AppRootState) => state.theme
  );
  const profileStyles = profileStylesWrapper(colors);
  const globalStyles = globalStylesWrapper(colors);
  return (
    <View style={[profileStyles.card_container]}>
      <View style={[profileStyles.icon_container]}>
        <Image source={show_icon} style={[profileStyles.show_icon]} />
      </View>
      <View style={[profileStyles.info_container, globalStyles.column_start]}>
        <Text style={[profileStyles.info_title]}>{title}</Text>
        <Text style={[profileStyles.info_value]}>{value}</Text>
      </View>
    </View>
  );
};

export default ProfileCard;
