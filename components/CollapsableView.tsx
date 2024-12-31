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

interface CollapsibleViewProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleView: React.FC<CollapsibleViewProps> = ({
  title,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useAppSelector((state: AppRootState) => state.theme);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View
      style={{
        marginVertical: 8,
        borderWidth: 1,
        borderColor: colors.foreground,
        borderRadius: 8,
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
          paddingVertical: 10,
          backgroundColor: colors.background,
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
            backgroundColor: colors.background,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
};

export default CollapsibleView;
