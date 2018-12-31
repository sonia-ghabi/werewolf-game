import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Input } from 'react-native-elements';
import GlobalState from '../libs/state';
import * as firebase from 'firebase';

export default class PlayerSummary extends React.Component {
  static navigationOptions = {
    title: 'Player summary',
    headerLeft: null
  };

  state = {
    me: {
      username:'',
      role: {
        type:''
      }
    }
  }

  constructor(props) {
    super(props);
    this.loadMe();
  }

  async loadMe() {
    var ref = firebase.database().ref('/games/' + GlobalState.gameId + '/players/' + GlobalState.userId);
    var snapshot = await ref.once('value');
    this.setState({ me: snapshot.val() });
    GlobalState.player = this.state.me;
  }
  continue(){
    this.props.navigation.navigate('NightRoutine');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>You are the:{this.state.me.role.type}</Text>
        <Button
          onPress={() => this.continue()}
          title="Continue"
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