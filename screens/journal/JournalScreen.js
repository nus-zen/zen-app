import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
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
      <Text style={styles.title}>DRAFT JOURNAL SCREEN</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your journal entry... (logs to console)  "
        value={entry}
        onChangeText={setEntry}
      />
      <Button
        title="Save Entry"
        onPress={handleSaveEntry}
        color={GlobalColors.primary300}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
});
