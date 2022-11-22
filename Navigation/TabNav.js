import React from "react";
import {View, ScrollView} from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Container, Header, Tab, Tabs, ScrollableTab, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import { StackNav, SquareNav } from "./StackNav";
import {SideNav} from "./SideNav";
import {SinglePost} from "../modules/Posts/Post";
import {SingleProduct} from '../modules/Products/Product'
import {SingleJob} from "../modules/Jobs/Job";
import {HomeScreen, BlogScreen, JobScreen, LoginScreen, ProfileScreen1, TheSquare, Videos, ShopScreen, WebSite} from "../Screens"


const Stack = createStackNavigator();
const BlogStack = ()=>{
    return (
      <Stack.Navigator initialRouterName="Blog" headerMode="none">
        <Stack.Screen name="Blog" component={BlogScreen} />
        <Stack.Screen name="Single" component={SinglePost} />
        <Stack.Screen name="Home" component={StackNav} />

      </Stack.Navigator>
  );
}

const JobStack = ()=>{
    return (
      <Stack.Navigator initialRouterName="Jobs" headerMode="none" >
        <Stack.Screen name="Jobs" component={JobScreen} />
        <Stack.Screen name="Job" component={SingleJob} />
        <Stack.Screen name="Home" component={StackNav} />
      </Stack.Navigator>
  );
}
const ShopStack = ()=>{
    return (
      <Stack.Navigator initialRouterName="Shop" headerMode="none" >
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="Product" component={SingleProduct} />
        <Stack.Screen name="Home" component={StackNav} />
      </Stack.Navigator>
  );
}
const Tabz = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tabz.Navigator tabBarOptions={{
        style: {
               padding:5,
              Height:'fit-content',
        },
    // //    tabBarPosition:'top',
    //     scrollEnabled:'true',
        inactiveTintColor: '#333',
        activeTintColor:"#ffba12",
        labelStyle: {
        fontSize: 14,
      },
    }}

     >
      <Tabz.Screen name="Home" component={StackNav} options={{
        tabBarIcon: ({color, size})=>(
          <Icon name="home" color={color} size={size} />
        ),
      //  swipeEnabled:true,
      }} />
      <Tabz.Screen name="Videos" component={Videos}  options={{
        tabBarIcon: ({color, size})=>(
          <Icon name="video" color={color} size={size} />
        ),
      }} />
      <Tabz.Screen name="Blog" component={BlogStack} options={{
        tabBarIcon: ({color, size})=>(
          <Icon name="book" color={color} size={size} />
        ),
      }}/>
      <Tabz.Screen name="Shop" component={ShopStack} options={{
        tabBarIcon: ({color, size})=>(
          <Icon name="shopping-cart" color={color} size={size} />
        ),
      }}/>

      <Tabz.Screen name="Music" component={WebSite} options={{
        tabBarIcon: ({color, size})=>(
          <Icon name="music" color={color} size={size} />
        ),
      }} />
      {/* <Tabz.Screen name="Profile" component={ProfileScreen1} options={{
        tabBarIcon: ({color, size})=>(
          <Icon name="user" color={color} size={size} />
        ),
      }} /> */}
      <Tabz.Screen name="Jobs" component={JobStack} options={{
        tabBarIcon: ({color, size})=>(
          <Icon name="map" color={color} size={size} />
        ),
      }} />
    </Tabz.Navigator>
  );
};

const NativeTabs =() =>{

  return (
      <Container style={{flex:1}}>
        <Tabs
        renderTabBar={()=> <ScrollableTab />}
        tabBarPosition='bottom'
        tabContainerStyle={{height:75, backgroundColor:'#fff',paddingTop:10}}
        tabBarUnderlineStyle = {{backgroundColor: '#ffba12'}}
        >
          <Tab tabStyle={{backgroundColor:'#fff', color:'#333'}} textStyle={{color: '#333'}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#ffba12', fontWeight: 'normal'}} heading={<View style={{ width:105,backgroundColor:'#fff',flexWrap:'wrap', padding:10}}><Icon name="home" style={{width:'100%', color:'#333',fontSize:22,textAlign:'center'}} /><Text style={{fontSize:18,textAlign:'center', color:'#333'}}>Home</Text></View>} >
            <HomeScreen />
          </Tab>
          <Tab tabStyle={{backgroundColor:'#fff', color:'#333'}} textStyle={{color: '#333', fontSize:20}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#ffba12', fontWeight: 'normal'}} heading={<View style={{ width:100,backgroundColor:'#fff',flexWrap:'wrap', height:85}}><Icon name="book" style={{width:'100%', color:'#333',fontSize:22,textAlign:'center'}} /><Text style={{fontSize:18,textAlign:'center', color:'#333'}}>Blog</Text></View>}>
            <BlogStack />
          </Tab>
          <Tab  tabStyle={{backgroundColor:'#fff', color:'#333'}} textStyle={{color: '#333', fontSize:20}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#ffba12', fontWeight: 'normal'}} heading={<View style={{ width:100,backgroundColor:'#fff',flexWrap:'wrap', height:85}}><Icon name="shopping-bag" style={{width:'100%', color:'#333',fontSize:22,textAlign:'center'}} /><Text style={{fontSize:18,textAlign:'center', color:'#333'}}>Shop</Text></View>}>
            <ShopScreen />
          </Tab>
          <Tab tabStyle={{backgroundColor:'#fff', color:'#333'}} textStyle={{color: '#333', fontSize:20}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#ffba12', fontWeight: 'normal'}} heading={<View style={{ width:100,backgroundColor:'#fff',flexWrap:'wrap', height:85}}><Icon name="briefcase" style={{width:'100%', color:'#333',fontSize:22,textAlign:'center'}} /><Text style={{fontSize:18,textAlign:'center', color:'#333'}}>Jobs</Text></View>}>
            <JobStack />
          </Tab>
          <Tab tabStyle={{backgroundColor:'#fff', color:'#333'}} textStyle={{color: '#333', fontSize:20}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#ffba12', fontWeight: 'normal'}}  heading={<View style={{ width:100,backgroundColor:'#fff',flexWrap:'wrap', height:85}}><Icon name="user" style={{width:'100%', color:'#333',fontSize:22,textAlign:'center'}} /><Text style={{fontSize:18,textAlign:'center', color:'#333'}}>Profile</Text></View>}>
            <ProfileScreen1 />
          </Tab>
          <Tab tabStyle={{backgroundColor:'#fff', color:'#333'}} textStyle={{color: '#333'}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#ffba12', fontWeight: 'normal'}} heading={<View style={{ width:100,backgroundColor:'#fff',flexWrap:'wrap', height:85}}><Icon name="video" style={{width:'100%', color:'#333',fontSize:22,textAlign:'center'}} /><Text style={{fontSize:18,textAlign:'center', color:'#333'}}>Videos</Text></View>}>
            <Videos />
          </Tab>
        </Tabs>
      </Container>
    );
}

export {TabNav, BlogStack, JobStack, ShopStack, NativeTabs};