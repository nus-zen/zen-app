import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { GlobalColors } from "../../themes/GlobalColors";
import { FlatList } from "react-native"; // Import FlatList

export default function JournalScreen() {
  const [entryTitle, setEntryTitle] = useState("");
  const [entryText, setEntryText] = useState("");
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [score, setScore] = useState(0); // Add score state

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

        // Increment the score by 10 points
        setScore(score + 10);
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
      <View style={styles.header}>
        <Text style={styles.title}>Mood Journaling</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
      </View>
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
      <TouchableOpacity style={styles.addButton} onPress={handleSaveEntry}>
        <Text style={styles.buttonText}>
          {editingEntry !== null ? "Update Entry" : "Save Entry"}
        </Text>
      </TouchableOpacity>
      {/* Replace the outer ScrollView with a View */}
      <View style={styles.entriesContainer}>
        {/* Replace the inner ScrollView with a FlatList */}
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.entry}>
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
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
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
  scoreContainer: {
    alignItems: "flex-end",
    paddingRight: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: GlobalColors.primary300, // Background color for the score bar
    color: "#fff", // Text color for the score bar
    padding: 8, // Add padding to make it visually appealing
    borderRadius: 10, // Add border radius for a rounded look
  },
});
