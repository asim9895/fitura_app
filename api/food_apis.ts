import { SingleCalorieEatenEntry } from "@/types";
import { food_file_path } from "@/utils/file_paths";
import { isSameDay } from "date-fns";
import * as FileSystem from "expo-file-system";

export const read_foods_data_api = async () => {
  try {
    const fileExists = await FileSystem.getInfoAsync(food_file_path);
    if (fileExists.exists) {
      const chunk = await FileSystem.readAsStringAsync(food_file_path);

      return JSON.parse(chunk);
    } else {
      return { records: [] }; // Default structure
    }
  } catch (error) {
    console.error("Error reading file:", error);
    return { records: [] };
  }
};

export const read_food_by_id_api = async (id: string) => {
  const data = await read_foods_data_api();
  const food_of_selected_id = data.records.filter((record: any) => {
    return isSameDay(new Date(record.id), id);
  });
  return food_of_selected_id[0] === undefined || food_of_selected_id[0] === null
    ? []
    : food_of_selected_id[0];
};

export const add_food_data_api = async (
  new_food_data: SingleCalorieEatenEntry
) => {
  try {
    const data = await read_foods_data_api();

    // Add new record for today
    data.records.push(new_food_data);

    // Write updated data back to the file
    await FileSystem.writeAsStringAsync(
      food_file_path,
      JSON.stringify(data, null, 2)
    );

    return { status: 200 };
  } catch (error) {
    console.error("Error updating steps:", error);
    return { status: 500 };
  }
};

export const update_food_data_api = async (
  new_food_data: SingleCalorieEatenEntry,
  id: string
) => {
  try {
    const data = await read_foods_data_api();

    const recordIndex = data.records.findIndex((record: any) =>
      isSameDay(new Date(record.id), id)
    );

    if (recordIndex >= 0) {
      // Update existing record
      data.records[recordIndex].push(new_food_data);

      // Write updated data back to the file
      await FileSystem.writeAsStringAsync(
        food_file_path,
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

export const remove_food_by_id = async (id: string) => {
  try {
    const data = await read_foods_data_api();
    const recordIndex = data.records.findIndex(
      (record: any) => record.id === id
    );

    if (recordIndex >= 0) {
      // Update existing record
      data.records[recordIndex].splice(recordIndex, 1);

      await FileSystem.writeAsStringAsync(
        food_file_path,
        JSON.stringify(data, null, 2)
      );

      // Return the updated steps for the selected date
      return data.records[recordIndex] || [];
    } else {
      // Add new record for today
      return [];
    }
  } catch (error) {
    console.error("Error removing selected step entry:", error);
    return [];
  }
};

export const remove_all_food_data = async () => {
  try {
    const data = { records: [] };
    await FileSystem.writeAsStringAsync(
      food_file_path,
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error("Error removing all steps data:", error);
  }
};
