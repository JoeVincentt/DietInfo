import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Col, Row, Grid } from "react-native-easy-grid";

export default class LandingScreen extends React.Component {
  static navigationOptions = {
    title: "Result Info",
    headerStyle: { backgroundColor: "black" },
    headerTitleStyle: { color: "orange" }
  };

  state = {
    dailyCalories: this.props.navigation.getParam("dailyCalories")
  };

  render() {
    return (
      <Grid style={{ backgroundColor: "lightgray" }}>
        <View style={{ margin: 20 }}>
          <Text style={styles.resultText}>Results:</Text>
          <Text style={{ fontFamily: "roboto-bold", fontSize: 30 }}>
            Calories = {this.state.dailyCalories} Kcal/day
          </Text>
        </View>

        <Row style={styles.cellContainer}>
          <GridCell
            text="To maintain your weight you need"
            calories={this.state.dailyCalories}
          />
        </Row>
        <Row style={styles.cellContainer}>
          <GridCell
            text="To lose 0.5 kg per week you need"
            calories={this.state.dailyCalories - 500}
          />
        </Row>
        <Row style={styles.cellContainer}>
          <GridCell
            text="To lose 1 kg per week you need"
            calories={this.state.dailyCalories - 1000}
          />
        </Row>
        <Row style={styles.cellContainer}>
          <GridCell
            text="To gain 0.5 kg per week you need"
            calories={Number(this.state.dailyCalories) + 500}
          />
        </Row>
        <Row style={styles.cellContainer}>
          <GridCell
            text="To gain 1 kg per week you need"
            calories={Number(this.state.dailyCalories) + 1000}
          />
        </Row>
      </Grid>
    );
  }
}

const GridCell = props => (
  <>
    <Col size={65} style={{ borderColor: "gray", borderWidth: 1 }}>
      <View style={{ margin: 5 }}>
        <Text style={{ fontFamily: "roboto-regular", fontSize: 20 }}>
          {props.text}
        </Text>
      </View>
    </Col>
    <Col size={35} style={{ borderColor: "gray", borderWidth: 1 }}>
      <View style={{ margin: 5 }}>
        <Text style={{ fontFamily: "roboto-bold", fontSize: 20 }}>
          {props.calories} Kcal/day
        </Text>
      </View>
    </Col>
  </>
);

const styles = StyleSheet.create({
  resultText: {
    fontFamily: "roboto-bold",
    fontSize: 40,
    color: "blue"
  },
  cellContainer: {
    flex: 0,
    marginHorizontal: 10
  }
});
