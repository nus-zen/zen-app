import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { GlobalColors } from "../../themes/GlobalColors";

export default function JournalScreen() {
  const [entry, setEntry] = useState("");

  const handleSaveEntry = () => {
    // Save the journal entry
    console.log("Saved entry:", entry);
    // Reset the input field
    setEntry("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write Your Journal Entry</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Start typing here..."
        value={entry}
        onChangeText={setEntry}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSaveEntry}
      >
        <Text style={styles.buttonText}>Save Entry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: GlobalColors.primary500,
  },
  input: {
    height: 200,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 16,
    fontSize: 18,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    backgroundColor: GlobalColors.primary300,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
