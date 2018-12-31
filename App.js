import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import State from './src/libs/state';
import Home from './src/components/home';
import GameSummary from './src/components/gameSummary';
import PlayerSummary from './src/components/player-summary';
import NightRoutine from './src/components/night-routine';
import Firebase from './src/libs/firebase';


Firebase();
const AppNavigator = createStackNavigator(
  {
    Home,
    GameSummary,
    PlayerSummary,
    NightRoutine
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);