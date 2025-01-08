import { SingleStepEntry } from "@/types";
import { weight_file_path } from "@/utils/file_paths";
import { todays_date } from "@/utils/variables";
import { isSameDay } from "date-fns";
import * as FileSystem from "expo-file-system";
import * as uuid from "uuid";
const CHUNK_SIZE = 1024 * 1024;

export const read_weight_data_api = async () => {
  try {
    const fileExists = await FileSystem.getInfoAsync(weight_file_path);
    if (fileExists.exists) {
      let completeData = "";
      let offset = 0;
      while (true) {
        const chunk = await FileSystem.readAsStringAsync(weight_file_path, {
          encoding: FileSystem.EncodingType.UTF8,
          position: offset,
          length: CHUNK_SIZE,
        });

        if (!chunk) break;

        completeData += chunk;
        offset += chunk.length;

        if (chunk.length < CHUNK_SIZE) break;
      }

      const data = await JSON.parse(completeData);

      data.records.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return data;
    } else {
      return { records: [] }; // Default structure
    }
  } catch (error) {
    console.error("Error reading file:", error);
    return { records: [] };
  }
};

export const read_selected_date_weight_data_api = async (
  selected_date: Date
) => {
  const data = await read_weight_data_api();
  const weight_of_selected_date = data.records.filter((record: any) => {
    return isSameDay(new Date(record.date), selected_date);
  });

  return weight_of_selected_date;
};

export const add_or_update_weight_of_selected_data_api = async (
  selected_date: Date,
  weight: number
) => {
  const data = await read_weight_data_api();

  const recordIndex = data.records.findIndex((record: any) =>
    isSameDay(new Date(record.date), selected_date)
  );
  if (recordIndex >= 0) {
    // Update existing record
    data.records[recordIndex].weight = weight;
  } else {
    // Add new record
    data.records.push({
      id: uuid.v4(),
      date: selected_date,
      weight: weight,
    });
  }
  await FileSystem.writeAsStringAsync(
    weight_file_path,
    JSON.stringify(data, null, 2)
  );

  return { status: 200 };
};

export const remove_all_weight_data = async () => {
  try {
    const data = { records: [] };
    await FileSystem.writeAsStringAsync(
      weight_file_path,
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error("Error removing all steps data:", error);
  }
};
