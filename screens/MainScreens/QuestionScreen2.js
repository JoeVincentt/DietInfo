import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body
} from "native-base";

import { View, Text } from "react-native";

export default class QuestionScreen2 extends Component {
  static navigationOptions = {
    title: "Info",
    headerStyle: { backgroundColor: "black" },
    headerTitleStyle: { color: "orange" }
  };
  state = {
    content: this.props.navigation.getParam("content")
  };
  render() {
    return (
      <Container style={{ flexDirection: "row", alignItems: "center" }}>
        <Content>
          <View
            style={{ flex: 0, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={{ uri: this.state.content.image }}
              style={{ height: 300, width: 300, flex: 1 }}
            />
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 25 }}>{this.state.content.answer}</Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
