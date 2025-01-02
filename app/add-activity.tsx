import { View, Text, Button } from "react-native";
import React, { useState } from "react";

const AddActivityPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />
    </View>
  );
};

export default AddActivityPage;
