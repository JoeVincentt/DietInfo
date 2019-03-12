import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform
} from "react-native";
import { Button, ListItem, CheckBox, Icon, Form, Picker } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as firebase from "firebase";
import { men_BMR, women_BMR, activityIndicator } from "../../utils/utils";
const _ = require("lodash");

const initialState = {
  gender: "male",
  weight: "",
  feet: "",
  inches: "",
  cm: "",
  age: "",
  activity: "bmr",
  units: "us"
};

export default class LandingScreen extends React.Component {
  static navigationOptions = {
    title: "Diet Info",
    headerStyle: { backgroundColor: "black" },
    headerTitleStyle: { color: "orange" }
  };

  state = {
    ...initialState
  };

  // _logOut = () => {
  //   firebase.auth().signOut();
  //   this.props.navigation.navigate("Auth");
  // };

  _calculateCalories = async () => {
    let weightKG;
    let heightCM;
    const age = this.state.age;
    if (this.state.units === "us") {
      weightKG = this.state.weight * 0.453592;
      heightCM = this.state.feet * 30.48 + this.state.inches * 2.54;
    }
    if (this.state.units === "metric") {
      weightKG = this.state.weight;
      heightCM = this.state.cm;
    }

    if (this.state.gender === "male") {
      let dailyCalories = men_BMR(weightKG, heightCM, age);
      dailyCalories = activityIndicator(dailyCalories, this.state.activity);
      await this.setState({ dailyCalories });
    }
    if (this.state.gender === "female") {
      let dailyCalories = women_BMR(weightKG, heightCM, age);
      dailyCalories = activityIndicator(dailyCalories, this.state.activity);
      await this.setState({ dailyCalories });
    }
    await this.setState({ ...initialState });
    this.props.navigation.navigate("Landing2", {
      dailyCalories: this.state.dailyCalories
    });

    console.log(this.state.dailyCalories);
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: "lightgray" }}>
        <Grid>
          {/* Top Container */}
          <Row
            style={{
              flex: 0,
              justifyContent: "center"
            }}
          >
            <Text style={{ fontFamily: "roboto-bold", fontSize: 35 }}>
              - Calories Calculator -
            </Text>
          </Row>
          {/* Metric Input */}
          <Row style={styles.mainRow}>
            <Row>
              <Col style={styles.rightCol}>
                <View style={styles.label}>
                  <Text style={styles.text}>Units:</Text>
                </View>
              </Col>
              <Col>
                <View style={styles.checkBoxContainer}>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <ListItem>
                      <CheckBox
                        checked={this.state.units === "us" ? true : false}
                        onPress={async () => {
                          await this.setState({ units: "us" });
                        }}
                      />
                      <Text> US Standart</Text>
                    </ListItem>
                    <ListItem>
                      <CheckBox
                        checked={this.state.units === "metric" ? true : false}
                        onPress={async () => {
                          await this.setState({ units: "metric" });
                        }}
                      />
                      <Text> Metric</Text>
                    </ListItem>
                  </View>
                </View>
              </Col>
            </Row>
          </Row>
          {/* Gender Input */}
          <Row style={styles.mainRow}>
            <Row>
              <Col style={styles.rightCol}>
                <View style={styles.label}>
                  <Text style={styles.text}>Gender:</Text>
                </View>
              </Col>
              <Col>
                <View style={styles.checkBoxContainer}>
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <ListItem>
                      <CheckBox
                        checked={this.state.gender === "male" ? true : false}
                        onPress={async () => {
                          await this.setState({ gender: "male" });
                        }}
                      />
                      <Text> Male</Text>
                    </ListItem>
                    <ListItem>
                      <CheckBox
                        checked={this.state.gender === "female" ? true : false}
                        onPress={async () => {
                          await this.setState({ gender: "female" });
                        }}
                      />
                      <Text> Female</Text>
                    </ListItem>
                  </View>
                </View>
              </Col>
            </Row>
          </Row>
          {/* Weight input */}
          <Row style={styles.mainRow}>
            <Row>
              <Col style={styles.rightCol}>
                <View style={styles.label}>
                  <Text style={styles.text}>Weight:</Text>
                </View>
              </Col>
              <Col>
                <View style={styles.formContainer}>
                  <View style={styles.textInputWeight}>
                    <TextInput
                      style={{ fontSize: 30, color: "gray" }}
                      keyboardType="numeric"
                      editable={true}
                      maxLength={12}
                      numberOfLines={1}
                      onChangeText={weight => this.setState({ weight })}
                      value={this.state.weight}
                      placeholder={this.state.units === "us" ? "pounds" : "kg"}
                    />
                  </View>
                </View>
              </Col>
            </Row>
          </Row>
          {/* Height Input */}
          <Row style={styles.mainRow}>
            <Row>
              <Col style={styles.rightCol}>
                <View style={styles.label}>
                  <Text style={styles.text}>Height:</Text>
                </View>
              </Col>
              <Col>
                <View style={styles.formContainer}>
                  <Row>
                    {this.state.units === "us" ? (
                      <>
                        <View style={styles.textInputHeight}>
                          <View style={{ flexDirection: "row" }}>
                            <TextInput
                              style={{
                                fontSize: 30,
                                color: "gray",
                                marginRight: 10
                              }}
                              keyboardType="numeric"
                              editable={true}
                              maxLength={12}
                              numberOfLines={1}
                              onChangeText={feet => this.setState({ feet })}
                              value={this.state.feet}
                              placeholder="feet"
                            />
                          </View>
                        </View>
                        <View style={styles.textInputHeight}>
                          <View style={{ flexDirection: "row" }}>
                            <TextInput
                              style={{
                                fontSize: 30,
                                color: "gray",
                                marginRight: 10
                              }}
                              keyboardType="numeric"
                              editable={true}
                              maxLength={12}
                              numberOfLines={1}
                              onChangeText={inches => this.setState({ inches })}
                              value={this.state.inches}
                              placeholder="inches"
                            />
                          </View>
                        </View>
                      </>
                    ) : (
                      <View style={styles.textInputHeightMetric}>
                        <View style={{ flexDirection: "row" }}>
                          <TextInput
                            style={{
                              fontSize: 30,
                              color: "gray",
                              marginRight: 10
                            }}
                            keyboardType="numeric"
                            editable={true}
                            maxLength={12}
                            numberOfLines={1}
                            onChangeText={cm => this.setState({ cm })}
                            value={this.state.cm}
                            placeholder="cm"
                          />
                        </View>
                      </View>
                    )}
                  </Row>
                </View>
              </Col>
            </Row>
          </Row>
          {/* Age Input */}
          <Row style={styles.mainRow}>
            <Row>
              <Col style={styles.rightCol}>
                <View style={styles.label}>
                  <Text style={styles.text}>Age:</Text>
                </View>
              </Col>
              <Col>
                <View style={styles.formContainer}>
                  <View style={styles.textInputWeight}>
                    <TextInput
                      style={{ fontSize: 30, color: "gray" }}
                      keyboardType="numeric"
                      editable={true}
                      maxLength={12}
                      numberOfLines={1}
                      onChangeText={age => this.setState({ age })}
                      value={this.state.age}
                      placeholder="age"
                    />
                  </View>
                </View>
              </Col>
            </Row>
          </Row>

          {/* Activity Input */}
          <Row style={styles.mainRow}>
            <Row>
              <Col style={styles.rightCol}>
                <View style={styles.label}>
                  <Text style={styles.text}>Activity:</Text>
                </View>
              </Col>
              <Col>
                <View style={styles.formContainer}>
                  <View style={styles.textInputWeight}>
                    <Form>
                      <Picker
                        style={{
                          width: Platform.OS === "ios" ? undefined : 200,
                          height: Platform.OS === "ios" ? undefined : 100,
                          flex: Platform.OS === "ios" ? undefined : 1
                        }}
                        mode="dropdown"
                        placeholder={this.state.activity}
                        placeholderStyle={{ color: "#2874F0" }}
                        note={false}
                        headerStyle={{ backgroundColor: "black" }}
                        headerBackButtonTextStyle={{ color: "orange" }}
                        // headerTitleStyle={{ color: "#fff" }}
                        selectedValue={this.state.activity}
                        onValueChange={activity => this.setState({ activity })}
                      >
                        <Picker.Item
                          label="Basal Metabolic Rate (BMR)"
                          value="bmr"
                        />
                        <Picker.Item
                          label="Sedentary - little or no exercise"
                          value="senedentary"
                        />
                        <Picker.Item
                          label="Light active - exercise/sports (1-3 times/week)"
                          value="light"
                        />
                        <Picker.Item
                          label="Moderately active - exercise/sports (3-5 times/week)"
                          value="moderately"
                        />
                        <Picker.Item
                          label="Very active - exercise/sports (6-7 times/week)"
                          value="very"
                        />
                        <Picker.Item
                          label="Extra active - very hard exercise/sports (twice/day)"
                          value="extra"
                        />
                      </Picker>
                    </Form>
                  </View>
                </View>
              </Col>
            </Row>
          </Row>

          {/* Calculate Button  */}

          <Row style={{ flex: 1, marginVertical: 20 }}>
            <View style={styles.calculateButtonContainer}>
              <Button
                iconLeft
                full
                style={styles.calculateButton}
                onPress={() => this._calculateCalories()}
              >
                <Icon name="calculator" style={{ fontSize: 50 }} />
                <Text style={styles.calculateButtonText}>
                  {" "}
                  Calculate Calories
                </Text>
              </Button>
            </View>
          </Row>

          {/* Logout Botom Container */}
          {/* <Row style={{ backgroundColor: "darkgray", marginTop: 10 }}>
            <View style={styles.logoutButtonContainer}>
              <Button
                iconLeft
                full
                style={styles.logoutButton}
                onPress={() => this._logOut()}
              >
                <Icon name="log-out" style={{ fontSize: 50 }} />
                <Text style={styles.logoutButtonText}> Log Out</Text>
              </Button>
            </View>
          </Row> */}
        </Grid>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "roboto-bold",
    fontSize: 25
  },
  formContainer: {
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-around",
    margin: 20
  },
  label: {
    flex: 1,
    justifyContent: "space-between",
    margin: 30
  },
  textInputWeight: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  textInputHeight: {
    height: 50,
    width: "50%",
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  textInputHeightMetric: {
    height: 50,
    width: "100%",
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  rightCol: {
    width: "40%",
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40
  },
  mainRow: {
    flex: 0
  },
  logoutButton: {
    height: 80,
    backgroundColor: "#BE0404"
  },

  logoutButtonText: {
    left: 10,
    fontSize: 40,
    color: "white"
  },
  logoutButtonContainer: {
    flex: 1,
    justifyContent: "center"
  },
  calculateButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  calculateButton: {
    height: 80,
    backgroundColor: "green"
  },
  calculateButtonText: {
    left: 10,
    fontSize: 28,
    color: "white"
  },

  checkBoxContainer: {
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-around",
    margin: 20
  }
});
