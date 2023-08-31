import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { GlobalColors } from "../../themes/GlobalColors";

export default function JournalScreen() {
  const [entryTitle, setEntryTitle] = useState("");
  const [entryText, setEntryText] = useState("");
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  const handleSaveEntry = () => {
    if (entryTitle.trim() !== "" && entryText.trim() !== "") {
      if (editingEntry !== null) {
        // Update the edited entry
        const updatedEntries = entries.map((item) => {
          if (item.id === editingEntry) {
            return { ...item, title: entryTitle, text: entryText };
          }
          return item;
        });
        setEntries(updatedEntries);
        setEditingEntry(null);
      } else {
        // Save a new entry
        const newEntry = {
          id: new Date().getTime(),
          title: entryTitle,
          text: entryText,
          date: new Date().toLocaleString(),
        };
        setEntries([...entries, newEntry]);
      }

      // Clear input fields
      setEntryTitle("");
      setEntryText("");
    }
  };

  const handleEditEntry = (id) => {
    const entryToEdit = entries.find((item) => item.id === id);
    if (entryToEdit) {
      setEntryTitle(entryToEdit.title);
      setEntryText(entryToEdit.text);
      setEditingEntry(id);
    }
  };

  const handleDeleteEntry = (id) => {
    const updatedEntries = entries.filter((item) => item.id !== id);
    setEntries(updatedEntries);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sticky Notes Journal</Text>
      <TextInput
        style={styles.input}
        placeholder="Title..."
        value={entryTitle}
        onChangeText={setEntryTitle}
      />
      <TextInput
        style={styles.input}
        multiline
        placeholder="Start typing here..."
        value={entryText}
        onChangeText={setEntryText}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleSaveEntry}
      >
        <Text style={styles.buttonText}>{editingEntry !== null ? "Update Entry" : "Save Entry"}</Text>
      </TouchableOpacity>
      <ScrollView style={styles.entriesContainer}>
        {entries.map((item) => (
          <View key={item.id} style={styles.entry}>
            <Text style={styles.entryTitle}>{item.title}</Text>
            <Text style={styles.entryText}>{item.text}</Text>
            <Text style={styles.entryDate}>{item.date}</Text>
            <View style={styles.entryActions}>
              <TouchableOpacity
                onPress={() => handleEditEntry(item.id)}
                style={styles.editButton}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteEntry(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  addButton: {
    backgroundColor: GlobalColors.primary300,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  entriesContainer: {
    flex: 1,
  },
  entry: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  entryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: GlobalColors.primary500,
  },
  entryText: {
    fontSize: 16,
    color: "#333",
  },
  entryDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  entryActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editButton: {
    marginRight: 10,
    paddingVertical: 5,
  },
  editButtonText: {
    color: GlobalColors.primary300,
    fontSize: 16,
  },
  deleteButton: {
    paddingVertical: 5,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 16,
  },
});
