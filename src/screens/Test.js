// src/screens/TestScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Test() {
  return (
    <View style={styles.container}>
      <Text>단어 시험 페이지</Text>
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
