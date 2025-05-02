
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function ChapterScreen({ route }) {
  const { chapter } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{chapter.title}</Text>
      <Text style={styles.content}>{chapter.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  content: { fontSize: 16, lineHeight: 24 }
});
