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
import { Col, Row, Grid } from "react-native-easy-grid";
import * as firebase from "firebase";

const _ = require("lodash");

export default class LandingScreen extends React.Component {
  static navigationOptions = {
    title: "Diet Info"
  };

  state = {};

  _logOut = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      // <Container>
      //   <Content>
      //     <View>
      // <Button
      //   iconLeft
      //   full
      //   success
      //   style={{ height: 80 }}
      //   onPress={() => console.log("hello")}
      // >
      //   <Icon name="search" style={{ fontSize: 50 }} />
      //   <Text style={{ left: 10, fontSize: 40, color: "white" }}>
      //     {" "}
      //     Look up
      //   </Text>
      // </Button>
      //     </View>
      //   </Content>
      // </Container>
      <Grid>
        <Col>
          <Row style={{ backgroundColor: "lightgray" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>2</Text>
            </View>
          </Row>
          <Row style={{ backgroundColor: "lightgray" }}>
            <View
              style={{
                flex: 1,

                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                iconLeft
                full
                style={{ height: 80, backgroundColor: "#BE0404" }}
                onPress={() => this._logOut()}
              >
                <Icon name="log-out" style={{ fontSize: 50 }} />
                <Text style={{ left: 10, fontSize: 40, color: "white" }}>
                  {" "}
                  Log Out
                </Text>
              </Button>
            </View>
          </Row>
        </Col>
      </Grid>
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
