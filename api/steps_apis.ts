import { SingleStepEntry } from "@/types";
import { steps_file_path } from "@/utils/file_paths";
import { todays_date } from "@/utils/variables";
import { isSameDay } from "date-fns";
import * as FileSystem from "expo-file-system";
import * as uuid from "uuid";

const CHUNK_SIZE = 1024 * 1024;

export const read_steps_data_api = async () => {
  try {
    const fileExists = await FileSystem.getInfoAsync(steps_file_path);
    if (fileExists.exists) {
      let completeData = "";
      let offset = 0;

      while (true) {
        const chunk = await FileSystem.readAsStringAsync(steps_file_path, {
          encoding: FileSystem.EncodingType.UTF8,
          position: offset,
          length: CHUNK_SIZE,
        });

        if (!chunk) break;

        completeData += chunk;
        offset += chunk.length;

        if (chunk.length < CHUNK_SIZE) break;
      }
      return JSON.parse(completeData);
    } else {
      return { records: [] }; // Default structure
    }
  } catch (error) {
    console.error("Error reading file:", error);
    return { records: [] };
  }
};

export const read_selected_date_steps_data_api = async (
  selected_date: Date
) => {
  const data = await read_steps_data_api();
  const steps_of_selected_date = data.records.filter((record: any) => {
    return isSameDay(new Date(record.date), selected_date);
  });
  return steps_of_selected_date[0]?.data === undefined ||
    steps_of_selected_date[0]?.data === null
    ? []
    : steps_of_selected_date[0]?.data;
};

export const update_steps_data_api = async (
  new_steps_data: SingleStepEntry,
  selected_date: Date
) => {
  try {
    const data = await read_steps_data_api();

    const today = todays_date;
    const recordIndex = data.records.findIndex((record: any) =>
      isSameDay(new Date(record.date), selected_date)
    );

    if (recordIndex >= 0) {
      // Update existing record
      data.records[recordIndex].data.push(new_steps_data);
    } else {
      // Add new record for today
      data.records.push({
        id: uuid.v4(),
        date: today,
        data: [new_steps_data],
      });
    }

    // Write updated data back to the file
    await FileSystem.writeAsStringAsync(
      steps_file_path,
      JSON.stringify(data, null, 2)
    );

    return { status: 200 };
  } catch (error) {
    console.error("Error updating steps:", error);
    return { status: 500 };
  }
};

export const remove_all_step_data = async () => {
  try {
    const data = { records: [] };
    await FileSystem.writeAsStringAsync(
      steps_file_path,
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error("Error removing all steps data:", error);
  }
};

export const remove_selected_date_step_data = async (
  selected_date: Date,
  step_entry_id: string
) => {
  try {
    const data = await read_steps_data_api();
    const recordIndex = data.records.findIndex((record: any) =>
      isSameDay(new Date(record.date), selected_date)
    );

    if (recordIndex >= 0) {
      // Find the specific step entry in the data array
      const stepEntryIndex = data.records[recordIndex].data.findIndex(
        (entry: SingleStepEntry) => entry.id === step_entry_id
      );

      if (stepEntryIndex >= 0) {
        // Remove the specific step entry
        data.records[recordIndex].data.splice(stepEntryIndex, 1);

        await FileSystem.writeAsStringAsync(
          steps_file_path,
          JSON.stringify(data, null, 2)
        );

        // Return the updated steps for the selected date
        return data.records[recordIndex]?.data || [];
      }
    }
    return [];
  } catch (error) {
    console.error("Error removing selected step entry:", error);
    return [];
  }
};
