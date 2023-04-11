import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MainTabNavigator } from '../main-tab-navigator/MainTabNavigator';
import { RunCreation } from '../run-creation';

const RootStack = createNativeStackNavigator();

export function RootStackNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name="MainTabNavigator"
          component={MainTabNavigator}
        />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{ presentation: 'modal', headerShown: true }}>
        <RootStack.Screen
          name="RunCreation"
          component={RunCreation}
          options={{ title: 'New run' }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
