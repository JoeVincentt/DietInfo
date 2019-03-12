import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  Icon,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  H2,
  Spinner,
  Footer,
  FooterTab
} from "native-base";
import { Constants } from "expo";
import { Text, View, StyleSheet } from "react-native";
import { AsyncStorage } from "react-native";

export default class MealPlanScreen2 extends Component {
  static navigationOptions = {
    title: "Favorites",
    headerStyle: { backgroundColor: "black" },
    headerTitleStyle: { color: "orange" }
  };

  state = {
    isLoading: true,
    // content: this.props.navigation.getParam("content"),
    fullRecipe: "",
    // res: {
    //   meals: [
    //     {
    //       id: 1,
    //       title: "Cream Cheese Banana Nut Bread",
    //       readyInMinutes: 90,
    //       servings: 2,
    //       image: "cream-cheese-banana-nut-bread-2-49993.jpg",
    //       imageUrls: [
    //         "cream-cheese-banana-nut-bread-2-49993.jpg",
    //         "cream_cheese_banana_nut_bread-49993.jpg"
    //       ]
    //     },
    //     {
    //       id: 2,
    //       title: "Cream Cheese Banana Nut Bread",
    //       readyInMinutes: 90,
    //       servings: 2,
    //       image: "cream-cheese-banana-nut-bread-2-49993.jpg",
    //       imageUrls: [
    //         "cream-cheese-banana-nut-bread-2-49993.jpg",
    //         "cream_cheese_banana_nut_bread-49993.jpg"
    //       ]
    //     },
    //     {
    //       id: 3,
    //       title: "Cream Cheese Banana Nut Bread",
    //       readyInMinutes: 90,
    //       servings: 2,
    //       image: "cream-cheese-banana-nut-bread-2-49993.jpg",
    //       imageUrls: [
    //         "cream-cheese-banana-nut-bread-2-49993.jpg",
    //         "cream_cheese_banana_nut_bread-49993.jpg"
    //       ]
    //     }
    //   ],
    //   nutrients: {
    //     calories: 1988,
    //     protein: 55.64,
    //     fat: 121.19,
    //     carbohydrates: 177.96
    //   }
    // }
    res: null
  };

  async componentWillMount() {
    await AsyncStorage.getItem("DietInfo", (err, result) => {
      let res = JSON.parse(result);
      this.setState({ res: res, isLoading: false });
      console.log(this.state.res);
    });
  }

  _storeData = async () => {
    try {
      AsyncStorage.getItem("DietInfo", (err, result) => {
        let res = JSON.parse(result);
        res.map(i => {
          i.content.meals.map(a => console.log(a.id, "and", i.date));
        });
      });
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  _loadRecipes = async (recipeId, mealImage) => {
    try {
      this.setState({ isLoading: true });

      let response = await fetch(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/summary`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": `${Constants.manifest.extra.foodapi}`,
            "content-type": "application/json"
          }
        }
      );

      response = await response.json();
      this.setState({ fullRecipe: response, isLoading: false });
      // console.log(this.state.fullRecipe);
      this.props.navigation.navigate("Favorite2", {
        fullRecipe: this.state.fullRecipe,
        mealImage: mealImage
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container style={{ backgroundColor: "lightgray" }}>
        {this.state.isLoading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Spinner />
          </View>
        ) : (
          <Content>
            {this.state.res !== null ? (
              <MealsList
                storage={this.state.res}
                _loadRecipes={this._loadRecipes}
                _storeData={this._storeData}
              />
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>You have no favorites yet!</Text>
              </View>
            )}
          </Content>
        )}
      </Container>
    );
  }
}

const MealsList = ({ storage, _loadRecipes, _storeData }) => {
  return (
    <>
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <H2>- Saved Meal Plans -</H2>
      </View>
      <View>
        <List>
          {storage.map(i =>
            i.content.meals.map(meal => (
              <>
                <ListItem
                  thumbnail
                  key={i.date}
                  style={styles.listItemBottomBorder}
                >
                  <Body>
                    <Text style={styles.textstyle}>{i.date}</Text>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={() => _loadRecipes(meal.id, meal.imageUrls[0])}
                      // onPress={() => _storeData()}
                    >
                      <Text>View Meal Plan</Text>
                    </Button>
                  </Right>
                </ListItem>
              </>
            ))
          )}
        </List>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textstyle: {
    fontSize: 20,
    fontFamily: "roboto-regular"
  },
  listItemBottomBorder: {
    borderBottomColor: "orange",
    borderBottomWidth: 0.5
  }
});
