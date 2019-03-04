import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import QuestionScreen from "../screens/MainScreens/QuestionScreen";
import MealPlanScreen from "../screens/MainScreens/MealPlanScreen";
import CaloriesByDishNameScreen from "../screens/MainScreens/CaloriesByDishNameScreen";

const QuestionStack = createStackNavigator({
  Question: QuestionScreen
});

QuestionStack.navigationOptions = {
  tabBarLabel: "Ask",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const MealPlanStack = createStackNavigator({
  MealPlan: MealPlanScreen
});

MealPlanStack.navigationOptions = {
  tabBarLabel: "Get Plan",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const CalorieByDishNameStack = createStackNavigator({
  CalByDish: CaloriesByDishNameScreen
});

CalorieByDishNameStack.navigationOptions = {
  tabBarLabel: "Eating Now",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  MealPlanStack,
  CalorieByDishNameStack,
  QuestionStack
});
