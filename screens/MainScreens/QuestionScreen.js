import React from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import { Container, Content, Button, Icon, Spinner } from "native-base";
import { Constants } from "expo";
import { _textTrim, _isEmpty } from "../../utils/utils";
const _ = require("lodash");

export default class QuestionScreen extends React.Component {
  static navigationOptions = {
    title: "Question",
    headerStyle: { backgroundColor: "black" },
    headerTitleStyle: { color: "orange" }
  };

  state = {
    text: "",
    isLoading: false,
    content: null
  };

  _searchAnswer = async question => {
    if (_isEmpty(question)) {
      alert("It's Empty!");
    } else if (question.length < 10) {
      alert("Question is too short.");
    } else {
      try {
        this.setState({ isLoading: true });
        //API fetch logic
        let response = await fetch(
          `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer?q=${_textTrim(
            this.state.text
          )}%3F`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": `${Constants.manifest.extra.foodapi}`,
              "content-type": "application/json"
            }
          }
        );
        response = await response.json();
        if (_.isEmpty(response)) {
          this.setState({ isLoading: false });
          alert("Try Ask Something Different Please!");
          return;
        }
        await this.setState({ content: response, isLoading: false });
        this.props.navigation.navigate("Question2", {
          content: this.state.content
        });
      } catch (error) {
        alert("Network Error");
        await this.setState({ isLoading: false });
      }
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
            <View style={styles.textInputContainer}>
              <TextInput
                style={{ height: 150, fontSize: 30, marginHorizontal: 10 }}
                multiline={true}
                numberOfLines={4}
                editable={true}
                maxLength={60}
                placeholder="Ask me..."
                onChangeText={text => this.setState({ text })}
              />
            </View>

            <View
              style={{
                alignItems: "center"
              }}
            >
              <Text style={{ marginTop: 20, fontSize: 42 }}>
                {this.state.text && "❓"}
              </Text>
            </View>

            <View style={styles.instructionContainer}>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: "bold",
                  color: "black"
                }}
              >
                Instructions
              </Text>
              <View style={styles.instructionTextContainer}>
                <Text style={{ fontSize: 25, marginHorizontal: 5 }}>
                  Ask a nutrition related natural language question.
                </Text>
              </View>

              {/* Example */}
              <View style={{ margin: 5 }}>
                <Text style={{ fontSize: 25 }}>Example:</Text>
              </View>
              <View style={styles.exampleContainer}>
                <Text
                  style={{
                    fontStyle: "italic",
                    fontSize: 25,
                    marginHorizontal: 5
                  }}
                >
                  'How much vitamin c is in 2 apples?'
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginVertical: 20
              }}
            >
              <Button
                iconLeft
                full
                style={{ height: 80, backgroundColor: "green" }}
                onPress={() => this._searchAnswer(this.state.text)}
              >
                <Icon name="search" style={{ fontSize: 50 }} />
                <Text style={{ left: 10, fontSize: 40, color: "white" }}>
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
  spinner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    top: 20,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    height: 150
  },
  instructionContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
    marginHorizontal: 50,
    alignItems: "center",
    height: "100%"
  },
  instructionTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%"
  },
  exampleContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%"
  }
});
