import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import GlobalState from '../libs/state';
import * as firebase from 'firebase';

export default class Home extends React.Component {
  /**
   * Navigation options.
   */
  static navigationOptions = {
    title: 'Home',
    headerLeft: null
  };

  /**
   * Constructor.
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      gameId: "",
      errorGameId: ""
    };
  }

  /**
   * Join an existing game by providing its 4 digits ID.
   * @param {string} username 
   * @param {string} gameId 
   */
  async joinGame(username, gameId) {
    var ref = await firebase.database().ref('/games/' + gameId);
    var snapshot = await ref.once('value');
    if (null == snapshot.val()) {
      this.setState({ errorGameId: "Unknown game ID" });
      return;
    }
    if (snapshot.val().isGameStarted) {
      Alert.alert("Game already started");
      return;
    }
    ref = await firebase.database().ref('/games/' + gameId + '/players');
    var newPlayer = ref.push();
    newPlayer.set({ username });
    GlobalState.gameId = gameId;
    GlobalState.username = username;
    GlobalState.userId = newPlayer.key;
    this.props.navigation.navigate('GameSummary');
  }

  /**
   * Start a new game with the new user as the first player.
   * @param {string} username 
   */
  async startNewGame(username) {
    var gameId = Math.floor(1000 + Math.random() * 9000);
    await firebase.database().ref('games/' + gameId).set({
      id: gameId,
      players: [{ username }],
      isGameOver: false,
      isDayTime: false,
      isGameStarted: false
    });
    GlobalState.gameId = gameId;
    GlobalState.username = username;
    GlobalState.userId = 0; // 1st player Id is 0 in firebase
    this.props.navigation.navigate('GameSummary');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the Werewolf game</Text>
        <Text>Enter your name then start or join a new game</Text>
        <Input
          placeholder='User Name'
          value={this.state.username}
          onChangeText={(username) => { this.setState({ username }) }}
        />
        <Button
          onPress={() => this.startNewGame(this.state.username)}
          title="New Game"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Input
          placeholder='Game Id'
          value={this.state.gameId}
          onChangeText={(gameId) => { this.setState({ gameId }) }}
          errorMessage={this.state.errorGameId}
        />
        <Button
          onPress={() => this.joinGame(this.state.username, this.state.gameId)}
          title="Join Game"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
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