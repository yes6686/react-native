import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WordStudyScreen() {
  // 더미 데이터 하드코딩
  const data = [
    { id: '1', title: '초등 영단어', progress: 12, total: 200 },
    { id: '2', title: '수능 영단어', progress: 37, total: 200 },
    { id: '3', title: '토익 영단어', progress: 0, total: 200 },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
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
        keyExtractor={item => item.id}
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
    elevation: 4, // Android 그림자 효과
    shadowColor: '#000', // iOS 그림자 효과
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  gradientBackground: {
    padding: 20,
    borderRadius: 15,
    height: 170, // 카드의 높이를 늘려서 더 길게 설정
    justifyContent: 'center', // 텍스트를 세로 중앙에 배치
  },
  cardTitle: {
    fontSize: 30,
    color: '#333',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    position: 'absolute', // 우측 하단에 위치하도록 설정
    bottom: 10,
    right: 10,
  },
});
