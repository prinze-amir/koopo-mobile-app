import React from 'react'
import { StyleSheet, Text, View, Image,  Button, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import JobList from "../modules/Jobs/JobList"
import { Header } from 'react-native-elements'
import {MainHeader} from "../Components/MainHeader"

const JobScreen = ({navigation, route}) => {

    return (
      <View style={{backgroundColor:"#fff"}}>
        <MainHeader />
        <JobList />
      </View>

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

export default JobScreen;