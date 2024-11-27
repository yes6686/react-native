// MyPageScreen.js
import React, { useState } from "react"; // useState 추가
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export default function MyPageScreen() {
  const [isRankingInfoVisible, setRankingInfoVisible] = useState(false);

  const toggleRankingInfo = () => {
    setRankingInfoVisible(!isRankingInfoVisible);
  };
  const dummyChartData = [
    { name: "yes490411", days: 1800 },
    { name: "danbi", days: 1750 },
    { name: "junny71387", days: 1600 },
    { name: "miniG", days: 1500 },
    { name: "AyoungKim", days: 1400 },
    { name: "JohnDoe", days: 1300 },
    { name: "JaneDoe", days: 1200 },
    { name: "Tommy", days: 1100 },
    { name: "Lucy", days: 1000 },
  ];

  return (
    <View style={styles.container}>
      {/* 사용자 정보 */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfo}>
          <Image
            source={require("../../assets/bronze.png")}
            style={styles.rankIcon}
          />
          <Text style={styles.userName}>danbi 님</Text>
        </View>
        <TouchableOpacity style={styles.infoButton} onPress={toggleRankingInfo}>
          <Image
            source={require("../../assets/info.png")}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>등급 안내</Text>
        </TouchableOpacity>
      </View>

      {/* 등급 목표 및 진행 상태 */}
      <LinearGradient
        colors={["#FFFEE3", "#FFFD9E"]}
        style={styles.progressContainer}
      >
        <Text style={styles.rankProgressText}>Silver 등급까지</Text>
        <Text style={styles.daysLeftText}>누적 연속 학습일 79일 남음</Text>
      </LinearGradient>

      {/* 실시간 차트 */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>실시간 차트</Text>
        <ScrollView style={styles.chartList}>
          {dummyChartData.map((item, index) => (
            <View key={index} style={styles.chartItem}>
              <LinearGradient
                colors={
                  index === 0 ? ["#FFD700", "#FFA500"] : ["#F5F5F5", "#E0E0E0"]
                }
                style={styles.chartCard}
              >
                <Text style={styles.chartRank}>
                  {index === 0 ? "👑 1" : index + 1}
                </Text>
                <View style={styles.chartDetails}>
                  <Text style={styles.chartName}>{item.name}</Text>
                  <Text style={styles.chartDays}>{item.days} 일</Text>
                </View>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* 등급 안내 모달 */}
      <Modal
        visible={isRankingInfoVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={toggleRankingInfo}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>등급 안내</Text>
            <View style={styles.rankInfoContainer}>
              {[
                {
                  rank: "Bronze",
                  miles: "1,000 M",
                  icon: require("../../assets/bronze.png"),
                },
                {
                  rank: "Silver",
                  miles: "5,000 M",
                  icon: require("../../assets/sliver.png"),
                },
                {
                  rank: "Gold",
                  miles: "20,000 M",
                  icon: require("../../assets/gold.png"),
                },
                {
                  rank: "Platinum",
                  miles: "50,000 M",
                  icon: require("../../assets/platinum.png"),
                },
                {
                  rank: "Diamond",
                  miles: "50,000 M 이상",
                  icon: require("../../assets/diamond.png"),
                },
              ].map((item, index) => (
                <View key={index} style={styles.rankInfo}>
                  <Image source={item.icon} style={styles.rankIcon} />
                  <Text style={styles.rankName}>{item.rank}</Text>
                  <Text style={styles.rankMiles}>
                    {item.miles} 미만의 마일리지 적립 시 등급
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6A0DAD",
    paddingTop: 70,
    alignItems: "center",
  },
  userInfoContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  rankIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
  progressContainer: {
    width: "90%",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  rankProgressText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  daysLeftText: {
    fontSize: 14,
    color: "#666",
  },
  chartContainer: {
    width: "90%",
    height: "70%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginTop: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#6A0DAD",
  },
  chartList: {
    maxHeight: 500,
  },
  chartItem: {
    marginBottom: 12,
  },
  chartCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  chartRank: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
    color: "#6A0DAD",
  },
  chartDetails: {
    flex: 1,
    justifyContent: "center",
  },
  chartName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  chartDays: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  rankInfoContainer: {
    marginTop: 10,
    width: "100%",
  },
  rankInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f7f7f7",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  rankIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  rankName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  rankMiles: {
    fontSize: 14,
    color: "#666",
    flex: 2,
    textAlign: "center",
  },
});
