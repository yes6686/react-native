// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./components/HomeScreen";
import MyPageScreen from "./components/MyPageScreen";
import SettingsScreen from "./components/SettingsScreen";
import WordTestScreen from "./components/WordTestScreen";
import WrongNoteScreen from "./components/WrongNoteScreen";
//예찬님이 만들어주신 스크린 대신 기존에 만들어둔 Study 스크린으로 대체
// import WordStudyScreen from "./components/WordStudyScreen";
import Study  from "./src/screens/wordstudy/Study";
import RealStudyScreen from "./src/screens/wordstudy/RealStudyScreen"
// Stack Navigator 정의
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// HomeScreen에서 다른 화면으로 이동하는 버튼을 추가할 때 사용
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTitle: () => (
          <Icon name="home-outline" size={30} color="#6A0DAD" />
        ), // 상단에 홈 아이콘 표시
      }}
    />
    <Stack.Screen name="WordTestScreen" component={WordTestScreen} />
    <Stack.Screen name="WrongNoteScreen" component={WrongNoteScreen} />
    <Stack.Screen name="WordStudyScreen" component={Study} />
    {/* 단어 공부 화면 내에서 이동을 위해 스택 추가 */}
    <Stack.Screen
      name="RealStudyScreen"
      component={RealStudyScreen}
      options={({ route }) => ({ title: route.params.title })}
    />

  </Stack.Navigator>
);

const MyPageStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyPage"
      component={MyPageScreen}
      options={{
        headerTitle: () => (
          <Icon name="person-outline" size={30} color="#6A0DAD" />
        ), // 상단에 마이페이지 아이콘 표시
      }}
    />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        headerTitle: () => (
          <Icon name="settings-outline" size={30} color="#6A0DAD" />
        ), // 상단에 설정 아이콘 표시
      }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "MyPage") {
              iconName = "person-outline";
            } else if (route.name === "Settings") {
              iconName = "settings-outline";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#6A0DAD",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="MyPage" component={MyPageStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
