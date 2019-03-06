import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./src/screens/HomeScreen";
import GameScreen from "./src/screens/GameScreen";

console.disableYellowBox = true;

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Game: {
      screen: GameScreen
    }
  },
  { headerMode: "none" }
);

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <RootStack />
      </View>
    );
  }
}
