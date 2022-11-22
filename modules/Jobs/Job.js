import React, {Component, useState} from 'react'
import { StyleSheet, StatusBar, Text, Image, View, ScrollView, Dimensions, Pressable, Linking, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import {Avatar, Overlay, Input} from "react-native-elements"
import {WebView} from "react-native-webview"
import HTML from "react-native-render-html"
import Icon from 'react-native-vector-icons/FontAwesome';
import {MainHeader} from "../../Components/MainHeader"
import {decode} from "html-entities"


const Job = ({title, content, image, apply, company, location, date, category })=>{

  const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
      setVisible(!visible);
    };

return(
    <ScrollView style={{padding:15}}>
      <View style={{height:"auto",padding:20, borderRadius:10, borderWidth:1, borderColor:'#fafafa', backgroundColor:"#fff", marginBottom:20}}>
        <Text style={styles.title}>{decode(title)}</Text>
        <Text style={{textAlign:'center',fontSize:18}}>{category}</Text>

          <View style={{flexDirection: "row", paddingBottom:15, alignSelf:'center'}}>
            <Icon style={{padding:5}} name="map-marker" size={18}/>
            <Text style={{textTransform:"capitalize", padding:5}}>by: {location}</Text>
            <Text style={{padding:5}}>{date}</Text>
          </View>

      </View>


        <View style={{height:"auto",padding:20, borderRadius:10, borderWidth:1, borderColor:'#fafafa', backgroundColor:"#fff", marginBottom:20}}>

        <Image
            style={{height:100, width:'100%', alignSelf:'center', }}
            resizeMode={'contain'}
            source={{uri:image}}
        />

            <Text style={{textTransform:"capitalize", padding:5, textAlign:'center'}}>by: {company}</Text>

          <Pressable onPress={toggleOverlay} style={{alignSelf:"center",backgroundColor:"#000", borderRadius:25, padding:10, marginTop:10}}>
              <Text style={{color:'#fff', fontSize:18}}>Apply For Job</Text>
          </Pressable>

          <Overlay overlayStyle={{width:'80%'}} fullScreen={false} isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text style={{padding:10, fontWeight:'bold'}}>Click the link to apply</Text>
                  <Text style={{color:'green',padding:10}} onPress={()=>Linking.openURL(apply)}>{apply}</Text>

              </Overlay>

          </View>

          <View style={{height:"auto",padding:20, borderRadius:10, borderWidth:1, borderColor:'#fafafa', backgroundColor:"#fff"}}>


            <HTML source={{html:content}} imagesMaxWidth={Dimensions.get('window').width} baseFontStyle={{fontSize:17, lineHeight:25}} />

          <Pressable onPress={toggleOverlay} style={{alignSelf:"center",marginBottom:20, backgroundColor:"#000", borderRadius:25, padding:10, marginTop:10}}>
          <Text style={{color:'#fff', fontSize:18}}>Apply For Job</Text>
          </Pressable>
        </View>
    </ScrollView>
)

}


const SingleJob = ({navigation, route}) => {

const type = route.params?.type;

if(type ==='job_listing'){
    return (
      <View style={styles.wrapper}>
        <MainHeader stack={true} />
        <Job title={route.params?.title}  image={route.params?.image} apply={route.params?.apply} date={route.params?.date} category={route.params?.category} content={route.params?.content} company={route.params?.company} location={route.params?.location}/>
      </View>
  );
}

return (
        <Job title={route.params?.title}  image={route.params?.image} date={route.params?.date} content={route.params?.content} company={route.params?.company} location={route.params?.location}/>

  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:20,
  },
  title:{
    fontWeight:'bold',
    fontSize:25,
    padding:10,
    textAlign:'center'
  },

  wrapper :{
    flex:1,
  }
});
export {SingleJob}