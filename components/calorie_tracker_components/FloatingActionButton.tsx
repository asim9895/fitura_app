import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  const actionButtonStyle = (index: any) => ({
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60 * (index + 1)],
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  });

  const rotationStyle = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };
  const actions = [
    {
      icon: <MaterialCommunityIcons name="food" size={24} color="white" />,
      label: "Add Calories",
      onPress: () => router.push("/calorie-info/add-calorie"),
      backgroundColor: "#45B7D1",
    },
    {
      icon: <Ionicons name="add-circle" size={24} color="white" />,
      label: "Add Activities",
      onPress: () => router.push("/add-activity"),
      backgroundColor: "#96CEB4",
    },
  ];

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <Animated.View
          key={index}
          style={[styles.actionButtonContainer, actionButtonStyle(index)]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              action.onPress();
              toggleMenu();
            }}
            style={[
              styles.actionButton,
              { backgroundColor: action.backgroundColor },
            ]}
          >
            <View style={styles.actionContent}>
              {action.icon}
              <Text style={styles.actionButtonText}>{action.label}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleMenu}
        style={styles.fab}
      >
        <Animated.View style={[styles.fabIcon, rotationStyle]}>
          <AntDesign name="plus" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 24,
    alignItems: "center",
    zIndex: 2,
  },
  fab: {
    backgroundColor: "#2196F3",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabIcon: {
    width: 24,
    height: 24,
  },
  actionButtonContainer: {
    position: "absolute",
    bottom: 10,
    right: 0,
    zIndex: 0,
    width: 170,
  },
  actionButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    paddingHorizontal: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default FloatingActionButton;
