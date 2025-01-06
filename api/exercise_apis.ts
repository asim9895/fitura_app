import { SingleActivityEntry, SingleCalorieEatenEntry } from "@/types";
import { exercise_file_path } from "@/utils/file_paths";
import { isSameDay } from "date-fns";
import * as FileSystem from "expo-file-system";

export const read_exercises_data_api = async () => {
  try {
    const fileExists = await FileSystem.getInfoAsync(exercise_file_path);
    if (fileExists.exists) {
      const chunk = await FileSystem.readAsStringAsync(exercise_file_path);

      return JSON.parse(chunk);
    } else {
      return { records: [] }; // Default structure
    }
  } catch (error) {
    console.error("Error reading file:", error);
    return { records: [] };
  }
};

export const read_exercise_by_id_api = async (id: string) => {
  const data = await read_exercises_data_api();
  const exercise_of_selected_id = data.records.filter((record: any) => {
    return record.id === id;
  });
  return exercise_of_selected_id[0] === undefined ||
    exercise_of_selected_id[0] === null
    ? {
        data: [],
        status: 500,
      }
    : {
        data: exercise_of_selected_id[0],
        status: 200,
      };
};

export const add_exercise_data_api = async (
  new_exercise_data: SingleActivityEntry
) => {
  try {
    const data = await read_exercises_data_api();

    // Add new record for today
    data.records.push(new_exercise_data);

    // Write updated data back to the file
    await FileSystem.writeAsStringAsync(
      exercise_file_path,
      JSON.stringify(data, null, 2)
    );

    return { status: 200 };
  } catch (error) {
    console.error("Error updating steps:", error);
    return { status: 500 };
  }
};

export const update_exercise_data_api = async (
  new_exercise_data: SingleActivityEntry
) => {
  try {
    const data = await read_exercises_data_api();

    const recordIndex = data.records.findIndex(
      (record: any) => record.id === new_exercise_data.id
    );

    if (recordIndex >= 0) {
      // Update existing record
      data.records[recordIndex] = new_exercise_data;

      // Write updated data back to the file
      await FileSystem.writeAsStringAsync(
        exercise_file_path,
        JSON.stringify(data, null, 2)
      );

      return { status: 200 };
    }

    return { status: 500 };
  } catch (error) {
    console.error("Error updating steps:", error);
    return { status: 500 };
  }
};

export const remove_exercise_by_id = async (id: string) => {
  try {
    const data = await read_exercises_data_api();
    const recordIndex = data.records.findIndex(
      (record: any) => record.id === id
    );

    if (recordIndex >= 0) {
      // Update existing record
      data.records.splice(recordIndex, 1);

      await FileSystem.writeAsStringAsync(
        exercise_file_path,
        JSON.stringify(data, null, 2)
      );

      // Return the updated steps for the selected date
      return {
        data: data.records,
        status: 200,
      };
    } else {
      return {
        data: [],
        status: 500,
      };
    }
  } catch (error) {
    console.error("Error removing selected step entry:", error);
    return {
      data: [],
      status: 500,
    };
  }
};

export const remove_all_exercise_data = async () => {
  try {
    const data = { records: [] };
    await FileSystem.writeAsStringAsync(
      exercise_file_path,
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error("Error removing all steps data:", error);
  }
};
