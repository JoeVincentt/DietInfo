import React from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Toast,
  Spinner,
  Form,
  Picker
} from "native-base";
import Slider from "react-native-slider";

const _ = require("lodash");

export default class MealPlanScreen extends React.Component {
  static navigationOptions = {
    title: "Meal Plan"
  };

  state = {
    text: "",
    isLoading: false,
    content: null,
    selected: undefined,
    value: 1000
  };

  onValueChange = value => {
    this.setState({
      selected: value
    });
  };

  _textTrim = text => {
    const trimmed = text.split(" ").join("+");
    return trimmed;
  };

  _searchAnswer = question => {
    if (this._isEmpty(question)) {
      alert("It's Empty!");
    } else if (question.length < 10) {
      alert("Question too short");
    } else {
      this.setState({ isLoading: true });
      //API fetch logic
      fetch(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer?q=${this._textTrim(
          this.state.text
        )}%3F`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "b99dd4b186msheefd2f2cd1467a3p10b334jsnd9346b61c2ed",
            "content-type": "application/json"
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          return JSON.stringify(data);
        })
        .then(data => {
          const dataObj = JSON.parse(data);

          if (_.isEmpty(dataObj)) {
            this.setState({ isLoading: false });
            alert("Try Ask Something Different Please!");
            return;
          }
          this.setState({ content: dataObj, isLoading: false });
          this.props.navigation.navigate("Question2", {
            content: this.state.content
          });
        })
        .catch(err => console.log(err));
    }
  };

  _isEmpty = question => {
    return !question.replace(/\s+/, "").length;
  };

  render() {
    return (
      <Container>
        {this.state.isLoading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Spinner />
          </View>
        ) : (
          <Content>
            <View style={styles.container}>
              <View
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  alignItems: "stretch",
                  justifyContent: "center"
                }}
              >
                <Slider
                  value={this.state.value}
                  onValueChange={value => this.setState({ value })}
                  minimumValue={1000}
                  maximumValue={5000}
                  step={100}
                  animateTransitions={true}
                  animationType="spring"
                  minimumTrackTintColor="blue"
                  maximumTrackTintColor="green"
                  thumbTintColor="red"
                  thumbTouchSize={{ width: 60, height: 60 }}
                />
                <Text>Value: {this.state.value}</Text>
              </View>
              <Form>
                <Picker
                  mode="dropdown"
                  placeholder="Select One"
                  placeholderStyle={{ color: "#2874F0" }}
                  note={false}
                  headerStyle={{ backgroundColor: "#b95dd3" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange}
                >
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
                </Picker>
              </Form>
              <Form>
                <Picker
                  mode="dropdown"
                  placeholder="Select One"
                  placeholderStyle={{ color: "#2874F0" }}
                  note={false}
                  headerStyle={{ backgroundColor: "#b95dd3" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange}
                >
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
                </Picker>
              </Form>
              <View style={styles.container}>
                <TextInput
                  style={{ height: 100, fontSize: 30 }}
                  multiline={true}
                  numberOfLines={4}
                  editable={true}
                  maxLength={60}
                  placeholder="Ask me..."
                  onChangeText={text => this.setState({ text })}
                />
              </View>

              <View style={{ top: 30 }}>
                <Button
                  iconLeft
                  full
                  success
                  style={{ height: 80 }}
                  onPress={() => this._searchAnswer(this.state.text)}
                >
                  <Icon name="search" style={{ fontSize: 50 }} />
                  <Text style={{ left: 10, fontSize: 40, color: "white" }}>
                    {" "}
                    Look up
                  </Text>
                </Button>
              </View>
            </View>
          </Content>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    top: 20
  }
});
