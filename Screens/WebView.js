import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import {WebView} from "react-native-webview"
import {MainHeader} from "../Components/MainHeader"

const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" color="white" />
    </View>
);

const WebSite = ({navigation}) => {

    const [isLoadong, setLoading] = useState(false);
    const isApp = `window.isNativeApp =true`;

    return (
      <View style={styles.wrapper}>
        <MainHeader />
        <WebView style={{ backgroundColor:"#000",}}
            bounces={false}
            startInLoadingState={true}
            renderLoading={Spinner}
            pullToRefreshEnabled={true}
            showsHorizontalScrollIndicator={false}
            injectedJavaScriptBeforeContentLoaded={isApp}
            scalesPageToFit
            source={{ uri: 'https://koopoonline.com/about-us' }}

            onLoadStart={(syntheticEvent) => {
                setLoading(true);
            }}
            onLoadEnd={(syntheticEvent) => {
                setLoading(false);
            }}
        />
        </View>
    );
    if (setLoading){
        return(

            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ActivityIndicator
                color="#009688"
                size="large"
                />
            </View>

        )
    }

};

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: "black",
    height: '100%',
    width: '100%'
  },
  wrapper: {
    flex:1,
  }
});
export default WebSite;