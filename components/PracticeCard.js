import { Image, View, Text, StyleSheet, Pressable } from "react-native";

export default function PracticeCard({ uri, subtitle, title, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressedIndicator}
        onPress={onPress}
      >
        <Image
          source={{
            uri: uri,
          }}
          style={styles.imageStyle}
        />
        <Text style={styles.subtitleStyle}>{subtitle}</Text>
        <Text style={styles.titleStyle}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    padding: 8,
    width: 200,
    height: 150,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    maxWidth: 200,
    elevation: 5,
    backgroundColor: "white",
    shadowRadius: 10,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  pressedIndicator: {
    opacity: 0.75,
  },
  subtitleStyle: {
    marginTop: 10,
    marginBottom: 3,
    fontWeight: 300,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
});
