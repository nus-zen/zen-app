import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JournalEntryForm from "../../components/JournalEntryForm";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import analytics from "@react-native-firebase/analytics";
import { PointsPopup } from "../../components/PointsPopup";
import Tooltip from "react-native-walkthrough-tooltip";

export default function JournalScreen() {
  const [entries, setEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isAddingEntry, setIsAddingEntry] = useState(false); // State to control the modal

  const [journalToolTipVisible, setJournalToolTipVisible] = useState(false);

  const checkFirstVisit = async () => {
    // check if user has visited this screen before
    try {
      const hasVisited = await AsyncStorage.getItem("hasVisitedJournal");
      if (!hasVisited) {
        console.log(
          "Tooltips for JournalScreen.js will be shown for first time user."
        );
        setJournalToolTipVisible(true);
        await AsyncStorage.setItem("hasVisitedJournal", "true");
      }
    } catch (error) {
      console.error("Error checking First Visit:", error);
    }
  };

  const AMOUNT_TO_ADD = 30;

  useEffect(() => {
    loadEntries();
    checkFirstVisit();
  }, []);

  const loadEntries = async () => {
    const storedEntries = await AsyncStorage.getItem("journalEntries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  };

  const saveEntriesToStorage = async (updatedEntries) => {
    await AsyncStorage.setItem(
      "journalEntries",
      JSON.stringify(updatedEntries)
    );
  };

  const handleSaveEntry = async (title, text) => {
    // Save a new entry
    const newEntry = {
      id: new Date().getTime(),
      title: title,
      text: text,
      date: new Date().toLocaleString(),
    };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);

    // Save entries to AsyncStorage
    await saveEntriesToStorage(updatedEntries);

    // add points to firestore document
    await addPointsToFirestore(AMOUNT_TO_ADD);

    setIsAddingEntry(false); // Close the modal

    // Show the popup
    setShowPopup(true);

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    // log analytics event
    await analytics().logEvent("journalEntry", {
      title: title,
      text: text,
    });

    console.log("analytics: journalEntry logged from JournalScreen.js");
  };

  const addPointsToFirestore = async (amount) => {
    // add points to firestore document
    const currUserDoc = firestore()
      .collection("users")
      .doc(auth().currentUser.email);

    await currUserDoc.update({
      points: firestore.FieldValue.increment(amount),
    });
    console.log(
      "Points Added to firestore:",
      amount,
      "for",
      auth().currentUser.email,
      "from journal entry"
    );

    // analytics log virtual currency earned
    await analytics().logEarnVirtualCurrency({
      virtual_currency_name: "points",
      value: amount,
    });
    console.log(
      "analytics: logEarnVirtualCurrency logged from JournalScreen.js"
    );
  };

  const handleEditEntry = (id) => {
    // ... (your code for editing an entry)
  };

  const handleDeleteEntry = async (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);

    // Save entries to AsyncStorage
    await saveEntriesToStorage(updatedEntries);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mood Journal</Text>
      </View>
      <Tooltip
        isVisible={journalToolTipVisible}
        content={
          <Text>
            Journal on your thoughts and feelings about certain events from the
            day. Earn 30 points for each journal entry.
          </Text>
        }
        allowChildInteraction={false}
        onClose={() => {
          setJournalToolTipVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddingEntry(true)}
        >
          <View style={styles.entry}>
            <Text style={styles.entryTitle}>New Entry</Text>
            <Text style={styles.entryText}>Click to add a new note</Text>
            <Text style={styles.entryDate}></Text>
          </View>
        </TouchableOpacity>
      </Tooltip>
      <ScrollView>
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
      {showPopup && (
        <View style={styles.popupContainer}>
          <PointsPopup
            pointsEarned={AMOUNT_TO_ADD}
            isVisible={showPopup}
            onClose={() => setShowPopup(false)}
          />
        </View>
      )}
      {/* Render the JournalEntryForm as a modal */}
      <Modal
        visible={isAddingEntry}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsAddingEntry(false)}
      >
        <JournalEntryForm onSaveEntry={handleSaveEntry} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  scoreContainer: {
    alignItems: "flex-end",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: 8,
    borderRadius: 10,
  },
  entry: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  entryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#4CAF50",
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
    color: "#4CAF50",
    fontSize: 16,
  },
  deleteButton: {
    paddingVertical: 5,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  popupContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Optional semi-transparent background
  },
});
