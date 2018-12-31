import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Input } from 'react-native-elements';
import GlobalState from '../libs/state';
import * as firebase from 'firebase';

export default class NightRoutine extends React.Component {
  static navigationOptions = {
    title: 'Night Routine',
    headerLeft: null
  };

  state = {
    players: []
  }

  constructor(props) {
    super(props);
    this.playSound();
  }
    
  async playSound(){
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('../../sounds/WerewolvesNight.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  kill(){

  }
  
  render() {
    const playerList = Object.values(GlobalState.players).map(p => <Button title={p.username} onPress={() => this.kill()}/>)
    return (
      <View style={styles.container}>
        <Text>Choose the person you want to kill</Text>
       {playerList}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});