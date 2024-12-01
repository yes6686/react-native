// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Test from '../screens/Test';
import WrongNote from '../screens/WrongNote';
import Study from '../screens/wordstudy/Study'
import RealStudyScreen from '../screens/wordstudy/RealStudyScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (  
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TestScreen" component={Test} />
      <Stack.Screen name="WrongNoteScreen" component={WrongNote} />
      <Stack.Screen name="Study" component={Study} />
      <Stack.Screen name="RealStudyScreen" component={RealStudyScreen} />
      
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* <Tab.Screen name="홈" component={HomeStack} /> */}
        {/* <Tab.Screen name="마이"  component={null}/> */}
        {/* <Tab.Screen name="설정"  component={null}/> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
