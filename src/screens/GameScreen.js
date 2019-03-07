import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  checkRowWin,
  checkColumnWin,
  checkRightDiagonalWin
} from "../helpers/winner";
import { cpuMove } from "../helpers/cpu";

const arrayBoard = Array.apply(null, { length: 36 }).map((item, index) => ({
  id: index,
  check: ""
}));

class GameScreen extends React.PureComponent {
  state = {
    board: arrayBoard,
    turn: true,
    end: false
  };

  handleEventYourTurn = id => {
    if (this.state.turn && !this.state.end) {
      const itemCheck = this.state.board.find(item => item.id === id);
      if (itemCheck.check === "") {
        const check = {
          ...itemCheck,
          check: "x"
        };
        const board = this.state.board.map(item => {
          if (item.id === id) {
            return check;
          } else return item;
        });
        this.setState({ board, turn: false }, () => {
          if (this.handleEventCheckWinner(id)) {
            this.setState({ end: true });
          } else {
            setTimeout(() => this.handleEventCPUTurn(id), 500);
          }
        });
      }
    }
  };

  handleEventCPUTurn = id => {
    let cpu = cpuMove(this.state.board, id);
    cpu = {
      ...cpu,
      check: "o"
    };
    const board = this.state.board.map(item => {
      if (item.id === cpu.id) {
        return cpu;
      } else return item;
    });
    this.setState({ board, turn: true }, () =>
      this.handleEventCheckWinner(cpu.id)
    );
  };

  handleEventCheckWinner = id => {
    if (
      checkRowWin(this.state.board, id) === 4 ||
      checkColumnWin(this.state.board, id) === 4 ||
      checkRightDiagonalWin(this.state.board, id) === 4
    ) {
      return true;
    } else return false;
  };

  render() {
    const { board, turn } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.notify}>{turn ? "Your Turn" : "CPU Turn"}</Text>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          data={board}
          renderItem={({ item }) => (
            <TouchableHighlight
              style={styles.item}
              onPress={() => this.handleEventYourTurn(item.id)}
            >
              <View style={styles.item}>
                {item.check === "x" ? (
                  <Icon name="close" size={50} color="#ED213A" />
                ) : item.check === "o" ? (
                  <Icon name="circle-o" size={45} color="#009FFF" />
                ) : null}
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={item => item.id}
          numColumns={6}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000"
  },
  item: {
    width: 55,
    height: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ffffff"
  },
  notifyContainer: {
    flex: 1
  },
  notify: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    paddingTop: 30
  }
});

export default GameScreen;
