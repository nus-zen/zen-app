import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

export default function JournalEntryForm({ onSaveEntry }) {
  const [entryTitle, setEntryTitle] = useState("");
  const [entryText, setEntryText] = useState("");

  const handleSave = () => {
    if (entryTitle.trim() !== "" && entryText.trim() !== "") {
      onSaveEntry(entryTitle, entryText);
      setEntryTitle("");
      setEntryText("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title..."
          value={entryTitle}
          onChangeText={setEntryTitle}
        />
        <TextInput
          style={[styles.textArea, { height: Dimensions.get("window").height - 300 }]}
          multiline
          placeholder="Start typing here..."
          value={entryText}
          onChangeText={setEntryText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Entry</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50", // Green color
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  textArea: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4CAF50", // Green color
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
