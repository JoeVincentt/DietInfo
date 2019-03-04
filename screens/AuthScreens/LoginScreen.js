import React, { Component } from "react";
import { fbkey } from "../../keys";
import * as firebase from "firebase";
import firebaseConfig from "../../firebase";
firebase.initializeApp(firebaseConfig);
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import { Container, Header, Content, Button, Icon } from "native-base";

class LoginScreen extends Component {
  static navigationOptions = {
    title: "Fun Test",
    headerStyle: {
      backgroundColor: "black"
    },
    headerTintColor: "#fff"
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
        this.props.navigation.navigate("App");
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

        this.props.navigation.navigate("App");
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
          backgroundColor: "black"
        }}
      >
        {this.state.isLoading ? (
          <>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Button iconLeft primary block onPress={() => this.FacebookLogIn()}>
              <Icon name="cog" style={{ right: 10 }} />
              <Text style={{ color: "#fff", fontSize: 22 }}>
                Login with Facebook
              </Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}

export default LoginScreen;
