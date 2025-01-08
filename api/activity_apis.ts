import {
  SingleActivityEntry,
  SingleCalorieEatenEntry,
  SingleStepEntry,
} from "@/types";
import { activity_file_path } from "@/utils/file_paths";
import { todays_date } from "@/utils/variables";
import { isSameDay } from "date-fns";
import * as FileSystem from "expo-file-system";
import * as uuid from "uuid";

export const read_activities_data_api = async () => {
  try {
    const fileExists = await FileSystem.getInfoAsync(activity_file_path);
    if (fileExists.exists) {
      const chunk = await FileSystem.readAsStringAsync(activity_file_path);

      return JSON.parse(chunk);
    } else {
      return { records: [] }; // Default structure
    }
  } catch (error) {
    console.error("Error reading file:", error);
    return { records: [] };
  }
};

export const read_selected_date_activity_data_api = async (
  selected_date: Date
) => {
  const data = await read_activities_data_api();
  const calories_of_selected_date = data.records.filter((record: any) => {
    return isSameDay(new Date(record.date), selected_date);
  });
  return calories_of_selected_date[0]?.data === undefined ||
    calories_of_selected_date[0]?.data === null
    ? []
    : calories_of_selected_date[0]?.data;
};

export const add_activities_data_api = async (
  new_activity_data: SingleActivityEntry[],
  selected_date: Date
) => {
  try {
    const data = await read_activities_data_api();
    const recordIndex = data.records.findIndex((record: any) =>
      isSameDay(new Date(record.date), selected_date)
    );

    if (recordIndex >= 0) {
      // Update existing record with the whole array
      data.records[recordIndex].data = [
        ...data.records[recordIndex].data,
        ...new_activity_data,
      ];
    } else {
      // Add new record with the whole array
      data.records.push({
        id: uuid.v4(),
        date: selected_date,
        data: [...new_activity_data],
      });
    }

    // Write updated data back to the file
    await FileSystem.writeAsStringAsync(
      activity_file_path,
      JSON.stringify(data, null, 2)
    );

    return { status: 200 };
  } catch (error) {
    console.error("Error updating steps:", error);
    return { status: 500 };
  }
};

export const remove_all_activity_data = async () => {
  try {
    const data = { records: [] };
    await FileSystem.writeAsStringAsync(
      activity_file_path,
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error("Error removing all steps data:", error);
  }
};

export const remove_selected_date_activity_data = async (
  selected_date: Date,
  activity_entry_id: string
) => {
  try {
    const data = await read_activities_data_api();

    const recordIndex = data.records.findIndex((record: any) =>
      isSameDay(new Date(record.date), selected_date)
    );

    if (recordIndex >= 0) {
      // Find the specific step entry in the data array
      const activityEntryIndex = data.records[recordIndex].data.findIndex(
        (entry: SingleStepEntry) => entry.id === activity_entry_id
      );

      if (activityEntryIndex >= 0) {
        // Remove the specific step entry
        data.records[recordIndex].data.splice(activityEntryIndex, 1);

        await FileSystem.writeAsStringAsync(
          activity_file_path,
          JSON.stringify(data, null, 2)
        );

        // Return the updated steps for the selected date
        return {
          data: data.records[recordIndex]?.data || [],
          status: 200,
        };
      }
    }
    return {
      data: [],
      status: 500,
    };
  } catch (error) {
    console.error("Error removing selected step entry:", error);
    return {
      data: [],
      status: 500,
    };
  }
};

export const read_activity_by_id_and_selected_date_data = async (
  selected_date: Date,
  activity_entry_id: string
) => {
  try {
    const data = await read_activities_data_api();

    const recordIndex = data.records.findIndex((record: any) =>
      isSameDay(new Date(record.date), selected_date)
    );

    if (recordIndex >= 0) {
      return {
        data:
          data.records[recordIndex]?.data?.find(
            (item: SingleCalorieEatenEntry) => {
              return item.id === activity_entry_id;
            }
          ) || null,
        status: 200,
      };
    }

    return {
      data: [],
      status: 500,
    };
  } catch (error) {
    console.error("Error reading selected calorie entry:", error);
    return {
      data: [],
      status: 500,
    };
  }
};

export const udpate_activity_by_id_and_selected_date_data = async (
  selected_date: Date,
  updated_data: SingleActivityEntry
) => {
  try {
    const data = await read_activities_data_api();

    const recordIndex = data.records.findIndex((record: any) =>
      isSameDay(new Date(record.date), selected_date)
    );

    if (recordIndex >= 0) {
      const activityEntryIndex = data.records[recordIndex].data.findIndex(
        (entry: SingleCalorieEatenEntry) => entry.id === updated_data.id
      );

      if (activityEntryIndex >= 0) {
        // Update the specific calorie entry
        data.records[recordIndex].data[activityEntryIndex] = {
          ...data.records[recordIndex].data[activityEntryIndex],
          ...updated_data,
        };

        await FileSystem.writeAsStringAsync(
          activity_file_path,
          JSON.stringify(data, null, 2)
        );

        return {
          data: data.records[recordIndex].data[activityEntryIndex],
          status: 200,
        };
      }
    }
    return {
      data: null,
      status: 500,
    };
  } catch (error) {
    console.error("Error updating calorie entry:", error);
    return {
      data: null,
      status: 500,
    };
  }
};
