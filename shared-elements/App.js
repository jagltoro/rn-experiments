import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Detail from "./Screens/Detail";
import { SafeAreaProvider } from "react-native-safe-area-context";
import List from "./Screens/List";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <List />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
