import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Button,
  Icon,
  Left,
  Right,
  Body,
  H1
} from "native-base";
import { Text, Linking } from "react-native";

export default class MealPlanScreen3 extends Component {
  static navigationOptions = {
    title: "Recipe"
  };
  state = {
    fullRecipe: this.props.navigation.getParam("fullRecipe"),
    mealImage: this.props.navigation.getParam("mealImage")
    // mealImage: "Ham-and-Red-Bean-Soup-646185.jpg",
    // fullRecipe: {
    //   id: 1017374,
    //   title: "Easy Weekday Breakfast Muffins",
    //   summary: `Easy Weekday Breakfast Muffins takes about <b>30 minutes</b> from beginning to end. This recipe makes 12 servings with <b>126 calories</b>, <b>9g of protein</b>, and <b>8g of fat</b> each. For <b>48 cents per serving</b>, this recipe <b>covers 8%</b> of your daily requirements of vitamins and minerals. Only a few people really liked this breakfast. It is brought to you by Pink When. 1 person were impressed by this recipe. It is a good option if you're following a <b>gluten free</b> diet. Head to the store and pick up bell pepper, turkey, shredded cheese, and a few other things to make it today. Taking all factors into account, this recipe <b>earns a spoonacular score of 21%</b>, which is rather bad. Similar recipes include <a href="https://spoonacular.com/recipes/easy-weekday-chicken-pot-pie-608322">Easy Weekday Chicken Pot Pie</a>, <a href="https://spoonacular.com/recipes/easy-breakfast-muffins-925366">Easy Breakfast Muffins</a>, and <a href="https://spoonacular.com/recipes/easy-breakfast-muffins-609679">Easy Breakfast Muffins</a>.`
    // }
  };

  _textEdit = text => {
    let tx = text;
    tx = tx
      .replace(/\<b\>/gi, "")
      .replace(/\<\/b\>/gi, "")
      .replace(/\<a href\=/gi, "")
      .replace(/\<\/a\>/gi, "")
      .replace(/\>/gi, "");
    return tx;
  };

  render() {
    return (
      <Container>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Body>
                  <H1>{this.state.fullRecipe.title}</H1>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  source={{
                    uri: `https://spoonacular.com/recipeImages/${
                      this.state.mealImage
                    }`
                  }}
                  style={{ height: 300, width: "100%", flex: 1 }}
                />
                <Text style={{ fontSize: 20, fontFamily: "roboto-regular" }}>
                  {this._textEdit(this.state.fullRecipe.summary)}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
