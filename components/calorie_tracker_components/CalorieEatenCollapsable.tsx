import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { font_family } from "@/theme/font_family";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
interface CalorieEatenCollapsableProps {
  title: string;
  children: React.ReactNode;
  calorie_count: string;
}

const CalorieEatenCollapsable: React.FC<CalorieEatenCollapsableProps> = ({
  title,
  children,
  calorie_count,
}) => {
  const [expanded, setExpanded] = useState(true);
  const { colors } = useAppSelector((state: AppRootState) => state.theme);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };
  return (
    <View
      style={{
        marginVertical: 0,
        overflow: "hidden",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          paddingVertical: 0,
          marginBottom: 10,
        }}
        onPress={toggleExpand}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: font_family.font_semibold,
            color: colors.text,
          }}
        >
          {title}
          <Text style={{ fontSize: 12, color: colors.button }}>
            {"  "} {calorie_count}
          </Text>
        </Text>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color={colors.light_gray}
        />
      </TouchableOpacity>
      {expanded && (
        <View
          style={{
            padding: 16,
            paddingTop: 0,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
};

export default CalorieEatenCollapsable;
