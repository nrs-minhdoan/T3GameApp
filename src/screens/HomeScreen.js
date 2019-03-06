import React from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  View,
  Text,
  TouchableHighlight
} from "react-native";
import LottieView from "lottie-react-native";

class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fade = new Animated.Value(0.2);
  }

  componentDidMount() {
    this.fadeIn();
  }

  fadeIn = () => {
    Animated.timing(this.fade, {
      toValue: 0.8,
      duration: 1200,
      easing: Easing.ease
    }).start(() => this.fadeOut());
  };

  fadeOut = () => {
    Animated.timing(this.fade, {
      toValue: 0.2,
      duration: 1200,
      easing: Easing.ease
    }).start(() => this.fadeIn());
  };

  handleEventClick = () => {
    this.props.navigation.navigate("Game");
  };

  render() {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={this.handleEventClick}
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>cờ caro</Text>
            <LottieView
              source={require("../assets/lotties/lego-loader.json")}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
          <Animated.Text style={{ ...styles.text, opacity: this.fade }}>
            Press any key to Start
          </Animated.Text>
          <View />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#000"
  },
  title: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
    alignSelf: "center",
    position: "absolute",
    fontFamily: "Pacifico",
    letterSpacing: 2,
    marginTop: -20
  },
  text: {
    color: "#fff",
    fontSize: 15
  },
  lottie: {
    height: 200
  }
});

export default HomeScreen;
