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
    isLoading: false,
    // content: this.props.navigation.getParam("content"),
    // fullRecipe: ""
    content: {
      meals: [
        {
          id: 1,
          title: "Cream Cheese Banana Nut Bread",
          readyInMinutes: 90,
          servings: 2,
          image: "cream-cheese-banana-nut-bread-2-49993.jpg",
          imageUrls: [
            "cream-cheese-banana-nut-bread-2-49993.jpg",
            "cream_cheese_banana_nut_bread-49993.jpg"
          ]
        },
        {
          id: 2,
          title: "Cream Cheese Banana Nut Bread",
          readyInMinutes: 90,
          servings: 2,
          image: "cream-cheese-banana-nut-bread-2-49993.jpg",
          imageUrls: [
            "cream-cheese-banana-nut-bread-2-49993.jpg",
            "cream_cheese_banana_nut_bread-49993.jpg"
          ]
        },
        {
          id: 3,
          title: "Cream Cheese Banana Nut Bread",
          readyInMinutes: 90,
          servings: 2,
          image: "cream-cheese-banana-nut-bread-2-49993.jpg",
          imageUrls: [
            "cream-cheese-banana-nut-bread-2-49993.jpg",
            "cream_cheese_banana_nut_bread-49993.jpg"
          ]
        }
      ],
      nutrients: {
        calories: 1988,
        protein: 55.64,
        fat: 121.19,
        carbohydrates: 177.96
      }
    }
  };

  // _storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem(
  //       `1`,
  //       JSON.stringify(this.state.content),
  //       () => {
  //         AsyncStorage.mergeItem(
  //           "1",
  //           JSON.stringify(this.state.content),
  //           () => {
  //             AsyncStorage.getItem("1", (err, result) => {
  //               let x = JSON.parse(result);
  //               console.log("Parsed", x);
  //             });
  //           }
  //         );
  //       }
  //     );
  //   } catch (error) {
  //     // Error saving data
  //     console.log(error);
  //   }
  // };

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
      this.props.navigation.navigate("Favorite3", {
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
            <MealsList
              meals={this.state.content.meals}
              _loadRecipes={this._loadRecipes}
            />
            <NutritionList content={this.state.content} />
            {/* <Footer style={{ backgroundColor: "transparent" }}>
              <Button
                style={{
                  height: 100
                }}
                transparent
                textStyle={{ color: "#87838B" }}
                onPress={() => this._storeData()}
              >
                <Icon style={{ fontSize: 50 }} name="save" />
                <Text>Save</Text>
              </Button>
            </Footer> */}
          </Content>
        )}
      </Container>
    );
  }
}

const MealsList = ({ meals, _loadRecipes }) => {
  return (
    <>
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <H2>Meals</H2>
      </View>
      <View>
        <List>
          {meals.map(meal => (
            <ListItem
              thumbnail
              key={meal.id}
              style={styles.listItemBottomBorder}
            >
              <Left>
                <Thumbnail
                  square
                  source={{
                    uri: `https://spoonacular.com/recipeImages/${
                      meal.imageUrls[0]
                    }`
                  }}
                />
              </Left>
              <Body>
                <Text style={styles.textstyle}>{meal.title}</Text>
                <Text note numberOfLines={1}>
                  Ready in {meal.readyInMinutes} minutes
                </Text>
                <Text note numberOfLines={1}>
                  Servings {meal.servings}
                </Text>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => _loadRecipes(meal.id, meal.imageUrls[0])}
                >
                  <Text>View Recipe</Text>
                </Button>
              </Right>
            </ListItem>
          ))}
        </List>
      </View>
    </>
  );
};

const NutritionList = props => {
  return (
    <>
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <H2>Nutrition Facts</H2>
      </View>
      <List>
        <ListItem style={styles.listItemBottomBorder}>
          <Left>
            <Text style={styles.textstyle}>Calories:</Text>
          </Left>
          <Right>
            <Text style={styles.textstyle} note numberOfLines={2}>
              {props.content.nutrients.calories}
            </Text>
          </Right>
        </ListItem>
        <ListItem style={styles.listItemBottomBorder}>
          <Left>
            <Text style={styles.textstyle}>Protein:</Text>
          </Left>
          <Right>
            <Text style={styles.textstyle}>
              {props.content.nutrients.protein} g
            </Text>
          </Right>
        </ListItem>
        <ListItem style={styles.listItemBottomBorder}>
          <Left>
            <Text style={styles.textstyle}>Fat:</Text>
          </Left>
          <Right>
            <Text style={styles.textstyle}>
              {props.content.nutrients.fat} g
            </Text>
          </Right>
        </ListItem>
        <ListItem style={styles.listItemBottomBorder}>
          <Left>
            <Text style={styles.textstyle}>Carbohydrates:</Text>
          </Left>
          <Right>
            <Text style={styles.textstyle}>
              {props.content.nutrients.carbohydrates} g
            </Text>
          </Right>
        </ListItem>
      </List>
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
