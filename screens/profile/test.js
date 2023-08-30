// ... (other imports and code)

export default function DailyStreaksLoginScreen({ navigation }) {
  // ... (other code)

  return (
    <View style={styles.container}>
      {/* ... (other components) */}
      <Text style={styles.subtitle}>
        {streak === 1 ? "Wow, you are making great progress!" : "You can try harder next time."}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleNavigateToBottomTabs}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (other styles)

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  // ... (other styles)
});
