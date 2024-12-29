import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ListRenderItemInfo,
  Platform,
  Image,
} from "react-native";
import {
  format,
  addWeeks,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  differenceInWeeks,
  addDays,
  isBefore,
  startOfDay,
} from "date-fns";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { font_family } from "@/theme/font_family";
import { set_selected_date } from "@/redux/slices/user_slice";
import { icons } from "@/data/icons";
import { format_number } from "@/utils/variables";

interface DatesListProps {
  onDateSelect: (date: Date) => void;
  achievement_dates: {
    date: Date;
    count: number;
  }[];
  budget_data: number;
}

type Week = Date[];

const DatesList: React.FC<DatesListProps> = ({
  onDateSelect,
  achievement_dates,
  budget_data,
}) => {
  const { selected_date, creation_date } = useAppSelector(
    (state) => state.user
  );
  const { colors } = useAppSelector((state: AppRootState) => state.theme);
  const today = new Date(); // Hardcoded today's date as per requirement
  const installDateTime = creation_date ? new Date(creation_date) : new Date();

  const [weeks, setWeeks] = useState<Week[]>([]);
  const flatListRef = useRef<FlatList<Week> | null>(null);
  const initializedRef = useRef<boolean>(false);

  const dispatch = useAppDispatch();

  const generateInitialWeeks = (): Week[] => {
    const result: Week[] = [];
    const startDate = startOfWeek(installDateTime, { weekStartsOn: 0 });

    const totalWeeks = differenceInWeeks(today, startDate) + 1; // Add 1 future weeks
    console.log("totalWeeks", totalWeeks);

    for (let i = 0; i < totalWeeks; i++) {
      const weekStart = addWeeks(startDate, i);
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 0 });

      const days = eachDayOfInterval({
        start: weekStart,
        end: weekEnd,
      });

      result.push(days);
    }
    return result;
  };

  const loadMoreFutureWeeks = (): void => {
    const lastWeek = weeks[weeks.length - 1];
    const today = new Date();

    const isTodayInLastWeek = lastWeek.some((date) => isSameDay(date, today));

    if (isTodayInLastWeek) {
      const nextWeekStart = addDays(lastWeek[6], 1);
      const newWeeks: Week[] = [];

      const weekStart = nextWeekStart;
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 0 });

      const days = eachDayOfInterval({
        start: weekStart,
        end: weekEnd,
      });

      newWeeks.push(days);
      setWeeks((prevWeeks) => [...prevWeeks, ...newWeeks]);
    }
  };

  // Initialize weeks
  useEffect(() => {
    if (!initializedRef.current) {
      const initialWeeks = generateInitialWeeks();
      setWeeks(initialWeeks);
      initializedRef.current = true;

      // Scroll to today's week after a short delay
      setTimeout(() => {
        const todayWeekIndex = initialWeeks.findIndex((week) =>
          week.some((day) => isSameDay(day, today))
        );

        if (todayWeekIndex !== -1 && flatListRef.current) {
          flatListRef.current?.scrollToIndex({
            index: todayWeekIndex,
            animated: false,
          });
        }
      }, 100);

      onDateSelect(today);
    }
  }, []);

  const renderDay = (date: Date): React.ReactElement => {
    const isSelected = selected_date ? isSameDay(date, selected_date) : false;
    const isTodayDate = isSameDay(date, today);
    const isInstallDate = isSameDay(date, installDateTime);

    const isAchievementDate = achievement_dates.some((achievementDate) =>
      isSameDay(achievementDate?.date, date)
    );

    const count = achievement_dates.find((achievementDate) =>
      isSameDay(achievementDate?.date, date)
    )?.count;

    const condition_to_disable =
      isBefore(startOfDay(date), startOfDay(installDateTime)) || date > today;

    return (
      <View>
        <TouchableOpacity
          disabled={condition_to_disable}
          style={[
            styles.dayContainer,
            isSelected && {
              backgroundColor: colors.foreground,
              borderWidth: 0,
            },
            isTodayDate && { borderColor: colors.foreground, borderWidth: 1 },
            isInstallDate && {
              borderColor: colors.light_gray,
              borderWidth: 0.5,
            },
          ]}
          onPress={() => {
            // if (!isBeforeInstall) {
            dispatch(set_selected_date({ selected_date: date }));
            onDateSelect(date);
            // }
          }}
          // disabled={isBeforeInstall}
        >
          <Text
            style={[
              {
                fontSize: 9,
                fontFamily: font_family.font_regular,
                color: condition_to_disable ? colors.light_gray : colors.text,
              },
            ]}
          >
            {format(date, "EEE")}
          </Text>
          <Text
            style={[
              {
                fontSize: 16,
                fontFamily: font_family.font_semibold,
                color: condition_to_disable ? colors.light_gray : colors.text,
                marginBottom: -3,
                marginTop: -2,
              },
            ]}
          >
            {format(date, "d")}
          </Text>
          <Text
            style={[
              {
                fontSize: 8,
                fontFamily: font_family.font_regular,
                color: condition_to_disable ? colors.light_gray : colors.text,
              },
            ]}
          >
            {format(date, "MMM")}
          </Text>
          <Text
            style={[
              {
                fontSize: 8,
                fontFamily: font_family.font_regular,
                color: condition_to_disable ? colors.light_gray : colors.text,
              },
            ]}
          >
            {format(date, "yyyy")}
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center", marginTop: 3 }}>
          {isAchievementDate && count !== undefined && count >= budget_data && (
            <Image source={icons.crown} style={{ width: 10, height: 10 }} />
          )}
        </View>
        <Text
          style={{
            fontSize: 9,
            marginTop: 3,
            fontFamily: font_family.font_semibold,
            color: colors.light_gray,
            textAlign: "center",
          }}
        >
          {count === 0 ? "-" : count !== undefined ? format_number(count) : "-"}
        </Text>
      </View>
    );
  };

  const renderWeek = ({
    item: week,
  }: ListRenderItemInfo<Week>): React.ReactElement => (
    <View
      style={[
        styles.weekContainer,
        { borderBottomWidth: 1, borderBottomColor: colors.foreground },
      ]}
    >
      {week.map((day) => (
        <View key={day.toString()} style={styles.dayWrapper}>
          {renderDay(day)}
        </View>
      ))}
    </View>
  );

  const goToToday = (): void => {
    dispatch(set_selected_date({ selected_date: today }));
    onDateSelect(today);

    const todayWeekIndex = weeks.findIndex((week) =>
      week.some((day) => isSameDay(day, today))
    );

    if (todayWeekIndex !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: todayWeekIndex,
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (selected_date && flatListRef.current) {
      const selectedWeekIndex = weeks.findIndex((week) =>
        week.some((day) => isSameDay(day, selected_date))
      );

      if (selectedWeekIndex !== -1) {
        flatListRef.current.scrollToIndex({
          index: selectedWeekIndex,
          animated: true,
        });
      }
    }
  }, [selected_date, weeks]);

  return (
    <View>
      <FlatList<Week>
        ref={flatListRef}
        data={weeks}
        renderItem={renderWeek}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        // onEndReached={loadMoreFutureWeeks}
        onEndReachedThreshold={0.5}
        getItemLayout={(_, index) => ({
          length: Dimensions.get("window").width,
          offset: Dimensions.get("window").width * index,
          index,
        })}
        keyExtractor={(week) => week[0].toISOString()}
      />
      {selected_date && !isSameDay(selected_date, today) && (
        <TouchableOpacity
          onPress={goToToday}
          activeOpacity={0.8}
          style={{
            alignItems: "center",
            marginTop: 30,
            position: "absolute",
            top: Platform?.OS === "ios" ? "50%" : "80%",
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
              fontFamily: font_family.font_semibold,
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
  weekContainer: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    justifyContent: "space-around",
    paddingHorizontal: 10,
    height: 95,
  },
  dayWrapper: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  dayContainer: {
    alignItems: "center",
    padding: 10,
    paddingVertical: 2,
    borderRadius: 8,
    // height: 87,
  },
});

export default DatesList;
