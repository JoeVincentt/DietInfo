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
  Picker,
  H2
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
    selected: "",
    targetCalories: 1000
  };

  onValueChange = targetCalories => {
    this.setState({
      selected: targetCalories
    });
  };

  _textTrim = text => {
    const trimmed = text.split(" ").join("+");
    return trimmed;
  };

  _textReductor = state => {
    const calories = state.targetCalories;
    const diet = state.selected;
    const exclude = state.text;

    if (diet.trim().length === 0 && exclude.trim().length === 0) {
      return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${calories}`;
    }

    if (diet.trim().length !== 0 && exclude.trim().length === 0) {
      return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${calories}&diet=${diet}`;
    }

    if (diet.trim().length === 0 && exclude.trim().length !== 0) {
      let ex = exclude
        .split(" ")
        .join("%2C+")
        .split(",")
        .join("");

      return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${calories}&exclude=${ex}`;
    }

    let ex = exclude
      .split(" ")
      .join("%2C+")
      .split(",")
      .join("");

    return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${calories}&diet=${diet}&exclude=${ex}`;
  };

  _searchAnswer = state => {
    this.setState({ isLoading: true });
    //API fetch logic
    fetch(this._textReductor(state), {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b99dd4b186msheefd2f2cd1467a3p10b334jsnd9346b61c2ed",
        "content-type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return JSON.stringify(data);
      })
      .then(data => {
        const dataObj = JSON.parse(data);
        this.setState({ content: dataObj, isLoading: false });
        this.props.navigation.navigate("MealPlan2", {
          content: this.state.content
        });
      })
      .catch(err => console.log(err));
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
            <View
              style={{
                margin: 20,
                alignItems: "stretch",
                justifyContent: "center"
              }}
            >
              <View style={{ alignItems: "center", margin: 20 }}>
                <H2 style={{ marginBottom: 10 }}>ONE DAY MEAL PLAN</H2>
                <Text style={{ color: "#4f5256" }}>
                  Breakfast, Lunch and Dinner
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.textstyle}>Choose Daily Target:</Text>
              </View>
              <Slider
                value={this.state.targetCalories}
                onValueChange={targetCalories =>
                  this.setState({ targetCalories })
                }
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
              <Text>{this.state.targetCalories} Calories</Text>
            </View>
            <View style={{ margin: 20, alignItems: "center" }}>
              <Text style={styles.textstyle}>
                Choose Diet Type{" "}
                <Text style={{ color: "#4f5256" }}>(optional)</Text>:
              </Text>

              <Form>
                <Picker
                  mode="dropdown"
                  placeholder="Pick One"
                  placeholderStyle={{ color: "#2874F0" }}
                  note={false}
                  headerStyle={{ backgroundColor: "#b95dd3" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange}
                >
                  <Picker.Item label="Vegetarian" value="vegetarian" />
                  <Picker.Item label="Vegan" value="vegan" />
                  <Picker.Item label="Paleo" value="paleo" />
                </Picker>
              </Form>
            </View>

            <View style={styles.container}>
              <View style={{ marginHorizontal: 20 }}>
                <Text style={styles.textstyle}>
                  A comma-separated list of allergens or ingredients that must
                  be excluded.
                </Text>

                <TextInput
                  style={{ height: 100, fontSize: 24 }}
                  multiline={true}
                  numberOfLines={4}
                  editable={true}
                  maxLength={20}
                  placeholder="Example: shellfish, olives"
                  onChangeText={text =>
                    this.setState({ text: text.toLowerCase() })
                  }
                />
              </View>
            </View>

            <View
              style={{
                top: 30
              }}
            >
              <Button
                iconLeft
                full
                success
                style={{ height: 80 }}
                onPress={() => this._searchAnswer(this.state)}
              >
                <Icon name="search" style={{ fontSize: 50 }} />
                <Text style={{ left: 10, fontSize: 40, color: "white" }}>
                  {" "}
                  Look up
                </Text>
              </Button>
            </View>
          </Content>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 20
  },
  textstyle: {
    fontSize: 20,
    fontFamily: "roboto-regular"
  }
});
