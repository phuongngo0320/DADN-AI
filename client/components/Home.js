import React, { useState } from "react";
import * as Headers from "../constants/header";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome
import { useNavigation } from "@react-navigation/core";

const GreenhouseController = () => {

  // TODO: onPress={() => navigation.navigate(Headers.IRRIGATION)}
  const navigation = useNavigation();

  const [irrigationMode, setIrrigationMode] = useState("AUTOMATIC");
  const [irrigationLevel, setIrrigationLevel] = useState(120);
  const [lightingMode, setLightingMode] = useState("AUTOMATIC");
  const [lightingPower, setLightingPower] = useState(4820);
  const [lightingIntensity, setLightingIntensity] = useState(617);
  const [temperature, setTemperature] = useState(362);
  const [temperatureMode, setTemperatureMode] = useState("MANUAL");

  const toggleIrrigationMode = () => {
    setIrrigationMode(irrigationMode === "AUTOMATIC" ? "MANUAL" : "AUTOMATIC");
  };

  const toggleTemperatureMode = () => {
    setTemperatureMode(temperatureMode === "MANUAL" ? "AUTOMATIC" : "MANUAL");
  };

  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 20; // Subtract padding

  const getUnit = (title) => {
    switch (title) {
      case "Irrigation":
        return "%";
      case "Lighting":
        return "W/m^2";
      case "Temperature":
        return "°C";
      default:
        return "";
    }
  };

  const data = [
    {
      title: "Irrigation",
      value: irrigationLevel,
      mode: irrigationMode,
      toggleMode: toggleIrrigationMode,
      color: "rgba(46, 138, 138, 1)",
      icon: "tint", // FontAwesome icon name for irrigation
    },
    {
      title: "Lighting",
      value: `${lightingPower}`,
      mode: lightingMode,
      color: "rgba(0, 231, 46, 0.8)",
      icon: "lightbulb-o", // FontAwesome icon name for lighting
    },
    {
      title: "Temperature",
      value: `${temperature}`,
      mode: temperatureMode,
      toggleMode: toggleTemperatureMode,
      color: "rgba(231, 156, 36, 0.8)",
      icon: "thermometer", // FontAwesome icon name for temperature
    },
  ];

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.container,
        { backgroundColor: item.color, width: containerWidth, padding: 10 },
      ]}
    >
      <View style={styles.leftContent}>
        <Text style={styles.sectionTitle}>
          <FontAwesome name={item.icon} size={18} color="white" /> {item.title}
        </Text>
        <View style={styles.dataContainer}>
          <Text style={styles.bigDataValue}>{item.value}</Text>
        </View>
        <Text style={styles.unitText}>{getUnit(item.title)}</Text>
      </View>
      {/* Add a separator line */}
      <View style={styles.separator} />
      <View style={styles.rightContent}>
        <View style={styles.iconContainer}>
          {/* Add FontAwesome icon */}
          <FontAwesome name="gear" size={24} color="white" />
        </View>
        {item.title === "Irrigation" && (
          <Text style={styles.statusText}>Keeping around 3%</Text>
        )}
        <Text
          style={[styles.modeText, item.mode === "MANUAL" && styles.manual]}
        >
          {item.mode}
        </Text>
        {item.toggleMode && (
          <Text onPress={item.toggleMode} style={styles.toggleButton}>
            TOGGLE MODE
          </Text>
        )}
        {item.title === "Temperature" && (
          <Text style={styles.warningText}>Warnings on</Text>
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10, // Add padding to the container
  },
  container: {
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 35,
    height: 250, // Increase the height of the container
  },
  leftContent: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 10, // Add padding to the right
    alignItems: "center",
  },
  separator: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  rightContent: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  dataContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  bigDataValue: {
    fontSize: 60,
    color: "rgba(255,255,255,0.5)", // Light white color
    fontWeight: "bold",
  },
  unitText: {
    fontSize: 12,
    color: "white", // Light white color
    marginBottom: 10, // Add margin for separation from the number
  },
  statusText: {
    fontSize: 14,
    color: "white",
  },
  modeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  toggleButton: {
    color: "white",
    marginTop: 5,
  },
  warningText: {
    color: "white",
    marginTop: 10,
  },
});

export default GreenhouseController;