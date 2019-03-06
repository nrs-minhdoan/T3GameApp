import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const arrayBoard = Array.apply(null, { length: 36 }).map((item, index) => ({
  id: index,
  check: ""
}));

class GameScreen extends React.PureComponent {
  state = {
    board: arrayBoard
  };

  handleEventClick = id => {
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
      this.setState({ board });
    }
  };

  render() {
    const { board } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          data={board}
          renderItem={({ item }) => (
            <TouchableHighlight
              style={styles.item}
              onPress={() => this.handleEventClick(item.id)}
            >
              <View style={styles.item}>
                {item.check === "x" ? (
                  <Icon name="close" size={50} color="#ff0000" />
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
  }
});

export default GameScreen;
