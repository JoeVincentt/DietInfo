import React, { Component } from "react";
import { fbkey } from "../../keys";
import * as firebase from "firebase";
import firebaseConfig from "../../firebase";
firebase.initializeApp(firebaseConfig);
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import { Button, Icon } from "native-base";

class LoginScreen extends Component {
  static navigationOptions = {
    title: "Diet Info",
    headerStyle: { backgroundColor: "black" },
    headerTitleStyle: { color: "orange" }
  };
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      isLoading: true
    };
  }

  _bootstrapAsync = async () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        // console.log(user);
        this.props.navigation.navigate("Landing");
      } else {
        this.FacebookLogIn();
      }
    });
  };

  FacebookLogIn = async () => {
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        fbkey,
        {
          permissions: ["email", "public_profile"]
        }
      );
      if (type === "success") {
        // Build Firebase credential with the Facebook access token.
        const credential = await firebase.auth.FacebookAuthProvider.credential(
          token
        );

        // Sign in with credential from the Facebook user.
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          //Log user data below
          // .then(data => console.log(data))
          .catch(error => {
            // Handle Errors here.
            Alert.alert("Try Again");
          });

        this.props.navigation.navigate("Landing");
      } else {
        // type === 'cancel'
        this.setState({ isLoading: false });
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "lightgray"
        }}
      >
        {this.state.isLoading ? (
          <>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </>
        ) : (
          <Button
            iconLeft
            primary
            full
            style={{ height: 80 }}
            onPress={() => this.FacebookLogIn()}
          >
            <Icon name="logo-facebook" style={{ right: 40, fontSize: 40 }} />
            <Text style={{ color: "#fff", fontSize: 30 }}>
              Login with Facebook
            </Text>
          </Button>
        )}
      </View>
    );
  }
}

export default LoginScreen;
