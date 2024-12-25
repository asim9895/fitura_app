import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const filePath = `${FileSystem.documentDirectory}waterRecord.json`;
console.log(FileSystem.documentDirectory);

const Sample = () => {
  const [todayData, setTodayData]: any = useState(null);
  const [allData, setAllData]: any = useState([]);
  const readFile = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      if (fileExists.exists) {
        const fileData = await FileSystem.readAsStringAsync(filePath);
        return JSON.parse(fileData);
      } else {
        return { records: [] }; // Default structure
      }
    } catch (error) {
      console.error("Error reading file:", error);
      return { records: [] };
    }
  };

  const fetchAllData = async () => {
    const data = await readFile();
    return data.records;
  };

  const fetchTodayData = async () => {
    const data = await readFile();
    const today = new Date().toISOString().split("T")[0];
    return (
      data.records.find((record: any) => record.date === today) || {
        date: today,
        waterIntake: 0,
        goal: 2000,
      }
    );
  };

  const writeFile = async (data: any) => {
    try {
      await FileSystem.writeAsStringAsync(
        filePath,
        JSON.stringify(data, null, 2)
      );
      console.log("File updated successfully");
    } catch (error) {
      console.error("Error writing file:", error);
    }
  };

  const updateWaterIntake = async (newIntake: any) => {
    try {
      const data = await readFile();

      const today = new Date().toISOString().split("T")[0]; // Get today's date
      const recordIndex = data.records.findIndex(
        (record: any) => record.date === today
      );

      if (recordIndex >= 0) {
        // Update existing record
        data.records[recordIndex].waterIntake += newIntake;
      } else {
        // Add new record for today
        data.records.push({
          date: today,
          waterIntake: newIntake,
          goal: 2000, // Default goal
        });
      }

      // Write updated data back to the file
      await writeFile(data);
      console.log("Water intake updated successfully");
    } catch (error) {
      console.error("Error updating water intake:", error);
    }
  };

  // Load data on component mount
  const loadData = async () => {
    const today = await fetchTodayData();
    setTodayData(today);

    const allRecords = await fetchAllData();
    setAllData(allRecords);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle water intake update
  const handleUpdate = async () => {
    await updateWaterIntake(250); // Add 250ml
    loadData(); // Refresh data
  };

  const shareFile = async () => {
    try {
      const filePath = `${FileSystem.documentDirectory}waterRecord.json`;
      const fileExists = await FileSystem.getInfoAsync(filePath);

      if (fileExists.exists) {
        await Sharing.shareAsync(filePath);
      } else {
        alert("File not found!");
      }
    } catch (error) {
      console.error("Error sharing file:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Record:</Text>
      <Text style={styles.text}>Date: {todayData?.date || "Loading..."}</Text>
      <Text style={styles.text}>
        Water Intake: {todayData?.waterIntake || 0} ml
      </Text>
      <Text style={styles.text}>Goal: {todayData?.goal || 0} ml</Text>
      <Button title="Add 250ml" onPress={handleUpdate} />
      <Button title="Share File" onPress={shareFile} />

      <Text style={styles.title}>All Records:</Text>
      <FlatList
        data={allData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Text style={styles.record}>
            {item.date}: {item.waterIntake} ml / {item.goal} ml
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  record: {
    fontSize: 14,
    marginBottom: 3,
  },
});

export default Sample;
