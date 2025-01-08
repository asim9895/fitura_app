import { SingleStepEntry, SingleWaterEntry } from "@/types";
import { water_file_path } from "@/utils/file_paths";
import { todays_date } from "@/utils/variables";
import { isSameDay } from "date-fns";
import * as FileSystem from "expo-file-system";
import * as uuid from "uuid";

export const read_water_data_api = async () => {
  try {
    const fileExists = await FileSystem.getInfoAsync(water_file_path);
    if (fileExists.exists) {
      const chunk = await FileSystem.readAsStringAsync(water_file_path);

      return JSON.parse(chunk);
    } else {
      return { records: [] }; // Default structure
    }
  } catch (error) {
    console.error("Error reading file:", error);
    return { records: [] };
  }
};

export const read_selected_date_water_data_api = async (
  selected_date: Date
) => {
  const data = await read_water_data_api();
  const water_of_selected_date = data.records.filter((record: any) => {
    return isSameDay(new Date(record.date), selected_date);
  });
  return water_of_selected_date[0]?.data === undefined ||
    water_of_selected_date[0]?.data === null
    ? []
    : water_of_selected_date[0]?.data;
};

export const update_water_data_api = async (
  new_water_data: SingleWaterEntry,
  selected_date: Date
) => {
  try {
    const data = await read_water_data_api();

    const recordIndex = data.records.findIndex((record: any) =>
      isSameDay(new Date(record.date), selected_date)
    );

    if (recordIndex >= 0) {
      // Update existing record
      data.records[recordIndex].data.push(new_water_data);
    } else {
      // Add new record for today
      data.records.push({
        id: uuid.v4(),
        date: selected_date,
        data: [new_water_data],
      });
    }

    // Write updated data back to the file
    await FileSystem.writeAsStringAsync(
      water_file_path,
      JSON.stringify(data, null, 2)
    );

    return { status: 200 };
  } catch (error) {
    console.error("Error updating water:", error);
    return { status: 500 };
  }
};

export const remove_all_water_data = async () => {
  try {
    const data = { records: [] };
    await FileSystem.writeAsStringAsync(
      water_file_path,
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error("Error removing all water data:", error);
  }
};

export const remove_selected_date_water_data = async (
  selected_date: Date,
  water_entry_id: string
) => {
  try {
    const data = await read_water_data_api();
    const recordIndex = data.records.findIndex((record: any) =>
      isSameDay(new Date(record.date), selected_date)
    );

    if (recordIndex >= 0) {
      // Find the specific water entry in the data array
      const waterEntryIndex = data.records[recordIndex].data.findIndex(
        (entry: SingleStepEntry) => entry.id === water_entry_id
      );

      if (waterEntryIndex >= 0) {
        // Remove the specific water entry
        data.records[recordIndex].data.splice(waterEntryIndex, 1);

        await FileSystem.writeAsStringAsync(
          water_file_path,
          JSON.stringify(data, null, 2)
        );

        // Return the updated water for the selected date
        return data.records[recordIndex]?.data || [];
      }
    }
    return [];
  } catch (error) {
    console.error("Error removing selected water entry:", error);
    return [];
  }
};
