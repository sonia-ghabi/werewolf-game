import React, { Component } from 'React';

export const GameContext = React.createContext();

export default class GameProvider extends Component {
  state = {
    name: '',
    gameId: '',
    player: null
  }

  render() {
    return (<GameContext.Provider value={{
      state: this.state,
      setName: (name) => this.setState({ name })
    }}>{this.props.children}</GameContext.Provider>)
  }
}