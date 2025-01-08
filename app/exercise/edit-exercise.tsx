import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";
import { globalStylesWrapper } from "@/styles/global.style";
import { font_family } from "@/theme/font_family";
import { useRouter } from "expo-router";
import { icons } from "@/data/icons";
import { SingleActivityEntry } from "@/types";
import { Colors } from "@/theme/colors";
import {
  read_exercise_by_id_api,
  update_exercise_data_api,
} from "@/api/exercise_apis";
import ActivityForm from "@/components/forms/ActivityForm";

const EditExercisePage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const exercise_id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { colors } = useSelector((state: AppRootState) => state.theme);
  const globalStyles = globalStylesWrapper(colors);
  const [exercise, setexercise] = useState<SingleActivityEntry | null>(null);
  const initial_state = {
    burned: exercise?.burned || 0,
    activity: exercise?.activity || "",
    hour: exercise?.hour || 0,
    minutes: exercise?.minutes || 0,
  };

  const [exercise_form, setexercise_form] = useState(initial_state);

  const find_exercise = async (exercise_id: string) => {
    const data = await read_exercise_by_id_api(exercise_id);

    if (data?.status === 200) {
      setexercise(data?.data);
      setexercise_form({
        burned: data?.data?.burned || 0,
        activity: data?.data?.activity || "",
        hour: data?.data?.hour || 0,
        minutes: data?.data?.minutes || 0,
      });
    } else {
      setexercise(null);
    }
  };
  useEffect(() => {
    find_exercise(exercise_id);
  }, [exercise_id]);

  const update_exercise = async () => {
    const data = await update_exercise_data_api({
      ...exercise_form,
      id: exercise_id,
    });

    if (data?.status === 200) {
      router.push("/activity-info/add-activity");
    } else {
    }
  };
  return (
    <SafeAreaView style={globalStyles.background}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.header_title}>Edit Exercise</Text>
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

      {exercise !== null && (
        <ScrollView
          style={{ marginHorizontal: 20, marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <ActivityForm form={exercise_form} setForm={setexercise_form} />

          <TouchableOpacity
            style={globalStyles.submit_button}
            onPress={() => {
              update_exercise();
            }}
          >
            <Text style={globalStyles.submit_button_text}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default EditExercisePage;
