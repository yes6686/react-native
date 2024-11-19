import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WordStudyScreen({ navigation }) {
  const data = [
    { id: '1', title: '초등 영단어', progress: 12, total: 200 },
    { id: '2', title: '수능 영단어', progress: 37, total: 200 },
    { id: '3', title: '토익 영단어', progress: 0, total: 200 },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('RealStudyScreen', {
          title: item.title,
          progress: item.progress,
          total: item.total,
        })
      }
    >
      <LinearGradient colors={['#FAA2FF', '#FDE3FF']} style={styles.gradientBackground}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>학습률 {item.progress}/{item.total}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>121일 연속 학습 중 입니다!</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#6A0DAD',
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  gradientBackground: {
    padding: 20,
    borderRadius: 15,
    height: 170,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 30,
    color: '#333',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
