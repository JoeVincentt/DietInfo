import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainStack from "./MainStackNavigation";
import AuthStack from "./AuthStackNavigation";

export default createAppContainer(
  createSwitchNavigator(
    {
      App: MainStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);
