import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { auth } from "./firebaseConfig"; // Firebase auth 가져오기
import LoginScreen from "./src/components/LoginScreen";
import HomeScreen from "./src/components/HomeScreen";
import MyPageScreen from "./src/components/MyPageScreen";
import SettingsScreen from "./src/components/SettingsScreen";
import WordTestScreen from "./src/components/WordTestScreen";
import WrongNoteScreen from "./src/components/WrongNoteScreen";
import LoadingScreen from "./src/components/LoadingScreen";
import SignUpScreen from "./src/components/SignUpScreen"; // SignUpScreen 추가
import Study from "./src/screens/wordstudy/Study";
import RealStudyScreen from "./src/screens/wordstudy/RealStudyScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="WordTestScreen" component={WordTestScreen} />
    <Stack.Screen name="WrongNoteScreen" component={WrongNoteScreen} />
    <Stack.Screen name="WordStudyScreen" component={Study} />
    <Stack.Screen name="RealStudyScreen" component={RealStudyScreen} />
  </Stack.Navigator>
);

const MyPageStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyPage"
      component={MyPageScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // 로그인 상태 업데이트
    });
    return unsubscribe; // 언마운트 시 리스너 해제
  }, []);

  if (isLoggedIn === null) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Home") iconName = "home-outline";
              else if (route.name === "MyPage") iconName = "person-outline";
              else if (route.name === "Settings") iconName = "settings-outline";

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#6A0DAD",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: "#FFF",
              borderTopWidth: 0,
              elevation: 5,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ tabBarLabel: "홈" }}
          />
          <Tab.Screen
            name="MyPage"
            component={MyPageStack}
            options={{ tabBarLabel: "마이페이지" }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsStack}
            options={{ tabBarLabel: "설정" }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
