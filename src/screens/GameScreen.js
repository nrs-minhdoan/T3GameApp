import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  checkRowWin,
  checkColumnWin,
  checkRightDiagonalWin,
  checkLeftDiagonalWin
} from "../helpers/winner";
import { cpuMove } from "../helpers/cpu";

const arrayBoard = Array.apply(null, { length: 36 }).map((item, index) => ({
  id: index,
  check: ""
}));

class GameScreen extends React.PureComponent {
  state = {
    board: arrayBoard,
    history: [],
    turn: true,
    end: false,
    winner: ""
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
        this.setState(
          {
            board,
            turn: false,
            history: [...this.state.history, this.state.board]
          },
          () => {
            if (this.handleEventCheckWinner(id, "x")) {
              this.setState({ end: true });
            } else {
              const noneArray = this.state.board.filter(
                item => item.check === ""
              );
              if (noneArray.length > 0) {
                setTimeout(() => this.handleEventCPUTurn(id), 500);
              } else {
                Alert.alert("Draw");
                this.setState({ end: true });
              }
            }
          }
        );
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
    this.setState({ board, turn: true }, () => {
      if (this.handleEventCheckWinner(cpu.id, "o")) {
        this.setState({ end: true });
      } else {
        const noneArray = this.state.board.filter(item => item.check === "");
        if (noneArray.length === 0) {
          Alert.alert("Draw");
          this.setState({ end: true });
        }
      }
    });
  };

  handleEventCheckWinner = (id, player) => {
    if (
      checkRowWin(this.state.board, id).length === 5 ||
      checkColumnWin(this.state.board, id).length === 5 ||
      checkRightDiagonalWin(this.state.board, id).length === 5 ||
      checkLeftDiagonalWin(this.state.board, id).length === 5
    ) {
      Alert.alert(player === "x" ? "You Win" : "CPU Win");
      this.setState({ winner: player });
      return true;
    } else return false;
  };

  handleEventResetBoard = () => {
    this.setState({
      board: arrayBoard,
      turn: true,
      end: false,
      winner: ""
    });
  };

  handleEventPrevBoard = () => {
    const history = [...this.state.history];
    const prevBoard = history[history.length - 1];
    const newHistory = history.filter(
      (item, index) => index !== history.length - 1
    );
    if (history.length > 0) {
      this.setState({
        board: prevBoard,
        history: newHistory,
        turn: true,
        end: false,
        winner: ""
      });
    }
  };

  render() {
    const { board, turn, end, winner } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.notify}>
          {end
            ? winner === "x"
              ? "You Win"
              : winner === "o"
              ? "CPU Win"
              : "Draw"
            : turn
            ? "Your Turn"
            : "CPU Turn"}
        </Text>
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
        <View style={styles.wrapper}>
          <TouchableHighlight onPress={this.handleEventResetBoard}>
            <Icon name="undo" size={50} color="#ffffff" />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.handleEventPrevBoard}>
            <Icon name="angle-double-left" size={65} color="#ffffff" />
          </TouchableHighlight>
        </View>
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
  },
  wrapper: {
    width: Dimensions.get("screen").width,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 100
  }
});

export default GameScreen;
