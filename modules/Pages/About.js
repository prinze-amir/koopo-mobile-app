import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import {WebView} from "react-native-webview"
import { site, apiUrl, postTypes } from "../../constants/config"
import HTML from "react-native-render-html"
import {MainHeader} from "../../Components/MainHeader"
import axios from "axios"

const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" color="white" />
    </View>
);
const AboutPage = ({navigation}) => {

    const [page, setPage] = useState([]);
    const [isLoadong, setLoading] = useState(false);
    const isApp = `window.isNativeApp =true`;


//  const getPage = async () => {

//      await axios.get( site + apiUrl + 'pages/1093')
//         .then( res => {
//           setPage(res.data);
//         })
//       .catch(err =>console.log(err));
//   };

//   useEffect(() => {
//       getPage();
//     }, []);



    return (
         <View style={{flex:1}}>
             <MainHeader />

        {/* //     <ScrollView>
        //         <HTML source={{html:page.content.rendered}} imagesMaxWidth={Dimensions.get('window').width} baseFontStyle={{fontSize:17}} />
        //     </ScrollView>
        // </View> */}
        <WebView style={{backgroundColor:"#000",}}
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

            <View style={{flex: 10, backgroundColor: 'white'}}>
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
});
export default AboutPage;