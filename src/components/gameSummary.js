import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Input } from 'react-native-elements';
import GlobalState from '../libs/state';
import Roles from '../libs/role';
import * as firebase from 'firebase';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Game summary',
    headerLeft: null
  };

  state = {
    players: []
  }

  constructor(props) {
    super(props);
    const that = this;

    var playersRef = firebase.database().ref('/games/' + GlobalState.gameId + '/players');
    playersRef.on('value', function (playersSnapshot) {
      that.setState({ players: playersSnapshot.val() });
    });

    var gameStartedRef = firebase.database().ref('/games/' + GlobalState.gameId + '/isGameStarted').on('value', function (gameStarted) {
      if (gameStarted.val() === true) {
        that.props.navigation.navigate('PlayerSummary');
      }
    })
  }

  async startGame() {
    var gameConfig = ['werewolf', 'werewolf', 'werewolf', 'seer', 'witch', 'hunter', 'villager', 'villager', 'villager'];
    gameConfig.sort(() => Math.random() - 0.5);
    var ref = await firebase.database().ref('/games/' + GlobalState.gameId);
    var snapshot = await ref.once('value');
    GlobalState.players = this.state.players;
    var updates = {};
    let idx = 0;
    Object.keys(this.state.players)
      .forEach((id) => {
        var role = gameConfig[idx++];
        this.state.players[id].role = Roles[role];
        updates['/games/' + GlobalState.gameId + '/players/' + id] = this.state.players[id];
      });
    updates['/games/' + GlobalState.gameId + '/isGameStarted'] = true;
    await firebase.database().ref().update(updates);
  }

  render() {
    const playerList = Object.values(this.state.players).map(p => <Text>{p.username}</Text>)
    return (
      <View style={styles.container}>
        <Text>Your username:{GlobalState.username}</Text>
        <Text>Your game ID:{GlobalState.gameId}</Text>
        <Text>Player list: </Text>
        {playerList}
        <Text>{playerList.length} players</Text>
        <Button
          onPress={() => this.startGame()}
          title="Start Game"
          color="#841584"
        />
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
