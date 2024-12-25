import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { AppRootState } from "@/redux/store";
import { font_family } from "@/theme/font_family";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";

import { set_selected_date } from "@/redux/slices/user_slice";
import { formatDate, todays_date } from "@/utils/variables";
import DateHeader from "./DateHeader";
import { icons } from "@/data/icons";
import { Route } from "@/types";

const DatesList: React.FC<{ route: Route }> = ({ route }) => {
  const dispatch = useAppDispatch();
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const { selected_date } = useAppSelector((state) => state.user);

  const [dates, setDates] = useState<string[]>([]);

  const flatListRef = useRef<FlatList<string>>(null);
  useEffect(() => {
    const generateDates = () => {
      const startDate = new Date(2024, 11, 20); // Months are 0-indexed
      const tempDates: string[] = [];

      // Generate the next 1000 days as an example
      for (let i = 0; i < 1000; i++) {
        const nextDate = new Date(startDate);
        nextDate.setDate(startDate.getDate() + i);
        tempDates.push(nextDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
      }

      setDates(tempDates);
    };

    generateDates();
  }, []);

  // Check if the selected date is today
  const isToday = selected_date === todays_date;

  // Scroll to today's date
  const scrollToToday = () => {
    dispatch(set_selected_date({ selected_date: todays_date }));

    // Find the index of today's date and scroll to it
    const todayIndex = dates.indexOf(todays_date);
    if (flatListRef.current && todayIndex !== -1) {
      flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    const result = formatDate(item);
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor:
              selected_date === item ? colors.button : colors.foreground,
            padding: 10,
            paddingVertical: 5,
            marginHorizontal: 5,
            borderRadius: 10,
            alignItems: "center",
          },
        ]}
        onPress={() => {
          dispatch(set_selected_date({ selected_date: item }));
        }}
      >
        <Text
          style={{
            fontFamily: font_family.poppins_medium,
            fontSize: 10,
            color: selected_date === item ? colors.text_white : colors.text,
          }}
        >
          {result[1]}
        </Text>
        <Text
          style={{
            fontFamily: font_family.poppins_medium,
            fontSize: 15,
            color: selected_date === item ? colors.text_white : colors.text,
          }}
        >
          {result[0]}
        </Text>
        <Text
          style={{
            fontFamily: font_family.poppins_medium,
            fontSize: 8,
            color: selected_date === item ? colors.text_white : colors.text,
          }}
        >
          {result[2]} - {result[3]}
        </Text>
      </TouchableOpacity>
    );
  };

  const ITEM_WIDTH = 55; // Width of each item
  const DAYS_IN_A_WEEK = 6;

  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (ITEM_WIDTH * DAYS_IN_A_WEEK));
    const newScrollPosition = index * (ITEM_WIDTH * DAYS_IN_A_WEEK);

    flatListRef.current?.scrollToOffset({
      offset: newScrollPosition,
      animated: true,
    });
  };

  return (
    <View
      style={{
        marginTop: Platform.OS === "ios" ? 20 : 0,
        borderBottomColor: colors.foreground,
        borderBottomWidth: 0.5,
        padding: 10,
        paddingVertical: Platform.OS === "ios" ? 20 : 10,
      }}
    >
      <DateHeader route={route} />
      <FlatList
        ref={flatListRef}
        data={dates}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        initialScrollIndex={dates.indexOf(selected_date)} // Start from the selected date
        getItemLayout={(data, index) => ({
          length: 55, // Approximate width of each item
          offset: 55 * index,
          index,
        })}
        onMomentumScrollEnd={handleMomentumScrollEnd} // Handle week snapping
      />

      {!isToday && (
        <TouchableOpacity
          onPress={scrollToToday}
          activeOpacity={0.8}
          style={{
            alignItems: "center",
            marginTop: 20,
            position: "absolute",
            top: Platform?.OS === "ios" ? "130%" : "110%",
            right: "40%",
            zIndex: 10,
            backgroundColor: colors.text,
            flexWrap: "wrap",
            borderRadius: 30,
            paddingVertical: Platform.OS === "ios" ? 6 : 3,
            paddingHorizontal: 12,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Image
            source={icons.undo}
            style={{ width: 15, height: 15, marginRight: 5 }}
            tintColor={colors.background}
          />
          <Text
            style={{
              fontFamily: font_family.poppins_semiBold,
              color: colors.background,
              paddingTop: Platform.OS === "ios" ? 0 : 3,
            }}
          >
            Today
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 10,
  },
  dateContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 5,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  selectedDateContainer: {
    backgroundColor: "#007bff",
  },
  selectedDateText: {
    color: "#fff",
    fontWeight: "bold",
  },
  todayButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  todayButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DatesList;
