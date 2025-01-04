import { useAppSelector } from "@/hooks/redux_hooks";
import { AppRootState } from "@/redux/store";
import { icons } from "@/data/icons";
import { font_family } from "@/theme/font_family";
import { format_number } from "@/utils/variables";
import { globalStylesWrapper } from "@/styles/global.style";
import { calorieTrackerStylesWrapper } from "@/styles/app/tabs/calorie-tracker.style";
import { Image, Text, View } from "react-native";

interface ActivityMacrosProps {
  calories_burned_by_steps: number;
  calories_burned_by_workout: number;
}

const ActivityMacros: React.FC<ActivityMacrosProps> = ({
  calories_burned_by_steps,
  calories_burned_by_workout,
}) => {
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const globalStyles = globalStylesWrapper(colors);
  const calorieTrackerStyles = calorieTrackerStylesWrapper(colors);
  return (
    <View style={calorieTrackerStyles.tabs_container}>
      <View
        style={[
          globalStyles.row_center_center,
          calorieTrackerStyles.single_tab,
        ]}
      >
        <Image
          source={icons.shoe}
          style={[
            calorieTrackerStyles.tab_icon,
            { width: 30, height: 30, marginRight: 15 },
          ]}
        />
        <View style={globalStyles.column_start}>
          <Text style={calorieTrackerStyles.tab_text}>Steps </Text>
          <Text
            style={[
              calorieTrackerStyles.tab_sub_text,
              { fontFamily: font_family.font_semibold, fontSize: 17 },
            ]}
          >
            {format_number(calories_burned_by_steps)} kcal
          </Text>
        </View>
      </View>
      <View
        style={[
          globalStyles.row_center_center,
          calorieTrackerStyles.single_tab,
        ]}
      >
        <Image
          source={icons.workout}
          style={[
            calorieTrackerStyles.tab_icon,
            { width: 30, height: 30, marginRight: 15 },
          ]}
        />
        <View style={globalStyles.column_start}>
          <Text style={calorieTrackerStyles.tab_text}>Workout </Text>
          <Text
            style={[
              calorieTrackerStyles.tab_sub_text,
              { fontFamily: font_family.font_semibold, fontSize: 17 },
            ]}
          >
            {format_number(calories_burned_by_workout)} kcal
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActivityMacros;
