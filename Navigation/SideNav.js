import React, { Component } from 'react'
import {NavigationContainer} from "@react-navigation/native"
import Icon from 'react-native-vector-icons/Feather';
import { createDrawerNavigator,DrawerItem,
  DrawerContentScrollView } from "@react-navigation/drawer"
  import {Text, Image} from 'react-native'
import AboutPage from "../modules/Pages/About"
import {HomeScreen, BlogScreen,JobScreen,LoginScreen, ProfileScreen1, TheSquare, Videos, ShopScreen, WebSite} from "../Screens"
import { StackNav, SquareNav } from "./StackNav";
import {TabNav, BlogStack, JobStack, NativeTabs, ShopStack} from "./TabNav";

const Drawer = createDrawerNavigator();
const SideNav = () =>{

    return(

        <Drawer.Navigator style={{backgroundColor:"red"}} initialRouteName="Home">
        {/* <Drawer.Screen name="User" component={()=>(
<Image style={{width:50,height:50}} source={{uri:'https://koopoonline.com/wp-content/uploads/2021/04/red-bridge-near-trees-stockpack-unsplash.jpg'}}/>       ) } /> */}

            <Drawer.Screen name="Home" component={TabNav} options={{
              drawerIcon:({color, size}) =>(
                <Icon color={color} size={size} name='home' />
              ),
            }}/>
            <Drawer.Screen name="Blog" component={BlogStack} />
            {/* <Drawer.Screen name="New Tabs" component={NativeTabs} /> */}
            <Drawer.Screen name="Jobs" component={JobStack} />
            <Drawer.Screen name="Square" component={TheSquare} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="About Us" component={AboutPage} />
            <Drawer.Screen name="Profile" component={ProfileScreen1} />
            <Drawer.Screen name="Shop" component={ShopStack} />
        </Drawer.Navigator>
        )

};
export {SideNav};