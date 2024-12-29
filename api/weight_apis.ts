import { SingleStepEntry } from "@/types";
import { steps_file_path, water_file_path } from "@/utils/file_paths";
import { todays_date } from "@/utils/variables";
import { isSameDay } from "date-fns";
import * as FileSystem from "expo-file-system";
import * as uuid from "uuid";

export const read_weight_data_api = async () => {
  try {
    const fileExists = await FileSystem.getInfoAsync(water_file_path);
    if (fileExists.exists) {
      const fileData = await FileSystem.readAsStringAsync(water_file_path);
      const data = JSON.parse(fileData);
      console.log(data);
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
  console.log(weight_of_selected_date);
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
    water_file_path,
    JSON.stringify(data, null, 2)
  );
  console.log("Weight updated successfully");
  return { status: 200 };
};
