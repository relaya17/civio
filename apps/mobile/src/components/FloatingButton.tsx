import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

export function FloatingButton({ onPress }: { onPress: () => void }) {
  return (
    <FAB
      style={styles.fab}
      icon="chat"
      onPress={onPress}
      accessibilityLabel="פתיחת תפריט מהיר"
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});


