import React from "react";
import { StyleSheet, Text, View, TextInput, Platform } from "react-native";
import {
  Container,
  Content,
  Button,
  Icon,
  Spinner,
  Form,
  Picker,
  H2
} from "native-base";
import Slider from "react-native-slider";
import { _textReductor } from "../../utils/utils";
const _ = require("lodash");

export default class MealPlanScreen extends React.Component {
  static navigationOptions = {
    title: "Meal Plan",
    headerStyle: { backgroundColor: "black" },
    headerTitleStyle: { color: "orange" }
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

  _searchAnswer = async state => {
    try {
      this.setState({ isLoading: true });
      //API fetch logic
      let response = await fetch(_textReductor(state), {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "b99dd4b186msheefd2f2cd1467a3p10b334jsnd9346b61c2ed",
          "content-type": "application/json"
        }
      });

      response = await response.json();
      this.setState({ content: response, isLoading: false });
      this.props.navigation.navigate("MealPlan2", {
        content: this.state.content
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container style={{ backgroundColor: "lightgray" }}>
        {this.state.isLoading ? (
          <View style={styles.spinner}>
            <Spinner />
          </View>
        ) : (
          <Content>
            <View style={styles.wrapContainer}>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <H2 style={{ marginBottom: 10 }}>- ONE DAY MEAL PLAN -</H2>
                <Text style={{ color: "#4f5256" }}>
                  Breakfast, Lunch and Dinner
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.textstyle}>Choose Daily Target:</Text>
              </View>
              <View style={{ margin: 10 }}>
                <Slider
                  value={this.state.targetCalories}
                  onValueChange={targetCalories =>
                    this.setState({ targetCalories })
                  }
                  minimumValue={1000}
                  maximumValue={3000}
                  step={100}
                  trackStyle={{ height: 5 }}
                  thumbStyle={{ height: 30, width: 20 }}
                  thumbImage={{}}
                  // animateTransitions={true}
                  animationType="spring"
                  minimumTrackTintColor="orange"
                  maximumTrackTintColor="black"
                  thumbTintColor="orange"
                  thumbTouchSize={{ width: 100, height: 100 }}
                />
              </View>

              <Text>{this.state.targetCalories} Calories</Text>
            </View>
            <View style={{ margin: 10, alignItems: "center" }}>
              <Text style={styles.textstyle}>
                Choose Diet Type{" "}
                <Text style={{ color: "#4f5256" }}>(optional)</Text>:
              </Text>
              {/* Picker View */}
              <View style={styles.pickerView}>
                <Form>
                  <Picker
                    style={styles.picker}
                    mode="dropdown"
                    placeholder="Pick Diet"
                    placeholderStyle={{ color: "black" }}
                    note={false}
                    headerStyle={{ backgroundColor: "black" }}
                    headerBackButtonTextStyle={{ color: "orange" }}
                    // headerTitleStyle={{ color: "#fff" }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange}
                  >
                    <Picker.Item label="Vegetarian" value="vegetarian" />
                    <Picker.Item label="Vegan" value="vegan" />
                    <Picker.Item label="Paleo" value="paleo" />
                    <Picker.Item label="Ketogenic" value="ketogenic" />
                    <Picker.Item label="Primal" value="primal" />
                    <Picker.Item label="Whole 30" value="whole+30" />
                  </Picker>
                </Form>
              </View>
            </View>

            <View style={styles.container}>
              <View style={{ marginHorizontal: 20 }}>
                <Text style={styles.textstyle}>
                  A comma-separated list of allergens or ingredients that must
                  be excluded.
                </Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={{ height: 100, fontSize: 24, right: 10, left: 10 }}
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
            </View>

            <View
              style={{
                marginVertical: 30
              }}
            >
              <Button
                iconLeft
                full
                style={{ height: 80, backgroundColor: "green" }}
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
    marginTop: 20
  },
  textstyle: {
    fontSize: 20,
    fontFamily: "roboto-regular"
  },
  spinner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  wrapContainer: {
    margin: 20,
    alignItems: "stretch",
    justifyContent: "center"
  },
  pickerView: {
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: "white",
    height: 50,
    width: "50%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  picker: {
    width: Platform.OS === "ios" ? undefined : 200,
    height: Platform.OS === "ios" ? undefined : 100,
    flex: Platform.OS === "ios" ? undefined : 1
  },
  textInputContainer: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});
