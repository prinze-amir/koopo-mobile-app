import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Button} from "react-native"

import {SideNav} from "./SideNav";
import {SinglePost} from "../modules/Posts/Post";
import {SingleJob} from "../modules/Jobs/Job";
import {SingleProduct} from '../modules/Products/Product'
import {HomeScreen, BlogScreen, JobScreen, LoginScreen, ProfileScreen1, TheSquare, Videos, ShopScreen, WebSite} from "../Screens"
import {TabNav, BlogStack, JobStack, ShopStack} from '../Navigation/TabNav'

const Stack = createStackNavigator();

const StackNav = () => {
  return (
      <Stack.Navigator initialRouterName="Home" headerMode="none" >
        {/* <Stack.Screen name="Tabs" component={TabNav} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Side" component={SideNav} /> */}
        <Stack.Screen name="Single" component={SinglePost} />
        <Stack.Screen name="Shop" component={ShopStack} />
        <Stack.Screen name="Product" component={SingleProduct} />
        <Stack.Screen name="Blog" component={BlogStack} />
        <Stack.Screen name="About" component={WebSite} />
        <Stack.Screen name="Videos" component={Videos} />
        <Stack.Screen name="Jobs" component={JobStack} />

    </Stack.Navigator>
  );
}

const SquareNav = () => {
  return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Square" component={TheSquare} />
    </Stack.Navigator>
  );
}

export { StackNav,  SquareNav };