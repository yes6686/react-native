// src/screens/TestScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WrongNote() {
  return (
    <View style={styles.container}>
      <Text>오답 노트 페이지</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
