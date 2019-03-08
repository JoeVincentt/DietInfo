import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import QuestionScreen from "../screens/MainScreens/QuestionScreen";
import QuestionScreen2 from "../screens/MainScreens/QuestionScreen2";
import MealPlanScreen from "../screens/MainScreens/MealPlanScreen";
import MealPlanScreen2 from "../screens/MainScreens/MealPlanScreen2";
import MealPlanScreen3 from "../screens/MainScreens/MealPlanScreen3";
import LandingScreen from "../screens/MainScreens/LandingScreen";
import LandingScreen2 from "../screens/MainScreens/LandingScreen2";

const QuestionStack = createStackNavigator({
  Question: QuestionScreen,
  Question2: QuestionScreen2
});

QuestionStack.navigationOptions = {
  tabBarLabel: "Ask",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-help-buoy` : "md-help-buoy"}
    />
  )
};

const MealPlanStack = createStackNavigator({
  MealPlan: MealPlanScreen,
  MealPlan2: MealPlanScreen2,
  MealPlan3: MealPlanScreen3
});

MealPlanStack.navigationOptions = {
  tabBarLabel: "Get Meal Plan",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-paper" : "md-paper"}
    />
  )
};

const LandingStack = createStackNavigator({
  Landing: LandingScreen,
  Landing2: LandingScreen2
});

LandingStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

export default createBottomTabNavigator({
  MealPlanStack,
  LandingStack,
  QuestionStack
});
