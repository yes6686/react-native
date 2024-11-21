import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RealStudyScreen({ route, navigation }) {
  const { title } = route.params;

  // 더미
  // 나중에 백 구현하고 수정
  const data = [
    { id: '1', english: 'love', korean: '사랑' },
    { id: '2', english: 'ability', korean: '능력' },
    { id: '3', english: 'accept', korean: '수용하다' },
    { id: '4', english: 'ache', korean: '통증' },
    { id: '5', english: 'hesitate', korean: '주저하다' },
    { id: '6', english: 'happy', korean: '행복' },
    { id: '7', english: 'harmony', korean: '조화' },
  ];

  // 단어 숨김 상태관리 
  //true 면 숨김
  const [hiddenState, setHiddenState] = useState(
    data.reduce((acc, item) => {
      acc[item.id] = { english: false, korean: false }; // 처음엔 다 보임
      return acc;
    }, {})
  );

  // 영어/한글 보이기 전환
  const toggleVisibility = (id, type) => {
    setHiddenState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [type]: !prevState[id][type], // type은 'english' 또는 'korean'
      },
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.wordRow}>
      {/* 영어 */}
      <TouchableOpacity
        style={styles.wordBox}
        onPress={() => toggleVisibility(item.id, 'english')}
      >
        <Text style={styles.wordText}>
          {hiddenState[item.id].english ? '👆' : item.english}
        </Text>
      </TouchableOpacity>

      {/* 한글 */}
      <TouchableOpacity
        style={styles.wordBox}
        onPress={() => toggleVisibility(item.id, 'korean')}
      >
        <Text style={styles.wordText}>
          {hiddenState[item.id].korean ? '👆' : item.korean}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#6A0DAD', '#C299F6']}
      style={styles.container}
    >
      <Text style={styles.headerText}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>학습 종료</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  wordRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  wordBox: {
    flex: 1,
    backgroundColor: '#000',
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  wordText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
});
