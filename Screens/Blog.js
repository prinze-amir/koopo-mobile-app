import React from 'react'
import { StyleSheet, Text, View, Image,  Button, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import Posts from "../modules/Posts/Posts"
import {MainHeader} from '../Components/MainHeader'
const BlogScreen = ({navigation, route}) => {

    return (
      <><MainHeader/>
        <Posts category={route.params?.categories} />
        </>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
  },
});

export default BlogScreen;