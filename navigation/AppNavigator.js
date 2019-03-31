import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainStack from "./MainStackNavigation";

export default createAppContainer(
  createSwitchNavigator({
    App: MainStack
  })
);
