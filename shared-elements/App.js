import React from "react";
import { StyleSheet, Easing } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {NavigationContainer} from '@react-navigation/native';

import List from './Screens/List';
import Detail from './Screens/Detail';

if (!__DEV__) {
  enableScreens();
}

const Stack = createSharedElementStackNavigator();

export default function App() {

  const options = {
    gestureEnabled: false,
    transitionSpec: {
      open: { animation: 'timing', config: { duration: 1000, easing: Easing.inOut(Easing.ease)}},
      close: { animation: 'timing', config: { duration: 1000, easing: Easing.inOut(Easing.ease)}}
    },
    cardStyleInterpolator: ({ current: { progress } }) => {
      return {
        cardStyle: {
          opacity: progress
        }
      };
    }
  };

  return (
  <NavigationContainer>
    <SafeAreaProvider>
      <Stack.Navigator headerMode="none ">
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Detail" component={Detail} options={() => options}/>
      </Stack.Navigator>
    </SafeAreaProvider>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
