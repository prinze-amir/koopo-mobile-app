import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator  } from 'react-native'
import {WebView} from 'react-native-webview'
import {MainHeader} from "../Components/MainHeader"


const Spinner = () => {

    <View style={styles.container}>
        <ActivityIndicator />
    </View>
}

const Videos = ({navigation}) => {

    return(

        <View style={{flex:1}}>

        <MainHeader />

        <WebView

                bounces={false}
                startInLoadingState={true}
                renderLoading={Spinner}
                showsHorizontalScrollIndicator={false}
                scalesPageToFit
                source={{ uri: 'https://koopoonline.com/videos' }}
        />
        </View>
    )
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
});

export default Videos;
