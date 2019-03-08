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
  Spinner
} from "native-base";

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
      <ScrollView>
        <Container>
          {this.state.isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Spinner />
            </View>
          ) : (
            <Content>
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
              <View style={styles.container}>
                <Text style={{ padding: 10, fontSize: 18, color: "lightgray" }}>
                  {this.state.text && ".min 10 symbol."}
                </Text>
              </View>
              <View style={styles.container}>
                <Text style={{ padding: 10, fontSize: 42 }}>
                  {this.state.text && "❓"}
                </Text>
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
                  onPress={() => this._searchAnswer(this.state.text)}
                >
                  <Icon name="search" style={{ fontSize: 50, left: -20 }} />
                  <Text style={{ left: 10, fontSize: 40, color: "white" }}>
                    {" "}
                    Look up
                  </Text>
                </Button>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  marginTop: 50,
                  marginHorizontal: 50,
                  alignItems: "center",
                  height: "100%"
                }}
              >
                <Text
                  style={{
                    fontSize: 35,
                    fontWeight: "bold",
                    color: "black"
                  }}
                >
                  {" "}
                  Instructions
                </Text>
                <Text style={{ fontSize: 25 }}>
                  Ask a nutrition related natural language question.
                </Text>

                <Text style={{ fontSize: 25 }}>For example:</Text>
                <Text style={{ fontStyle: "italic", fontSize: 25 }}>
                  'How much vitamin c is in 2 apples?'
                </Text>
              </View>
            </Content>
          )}
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    top: 20,
    marginHorizontal: 20
  }
});
