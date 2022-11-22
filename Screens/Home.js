import React from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import {MainHeader} from "../Components/MainHeader"
import {TabNav, BlogStack, JobStack} from "../Navigation/TabNav"
import {BlogBlock, ProductBlock, ProductCats} from '../Components/Blocks'

const HomeScreen = ({navigation, route}) => {

    return (

    <View style={{flex:1}}>

      <MainHeader />

      <ScrollView>
            <Image style={{width:'100%',height:300}} source={{uri:'https://koopoonline.com/wp-content/uploads/2021/04/pink-and-white-flowers-during-daytime-stockpack-unsplash.jpg'}}/>

        <View style={styles.container}>
            <Text style={{fontSize:37, padding:20, textAlign:'center'}}>The Marketplace</Text>
            <Image style={{width:135,height:128, alignSelf:'center'}} source={{uri:'https://koopoonline.com/wp-content/uploads/2020/03/koopo-homepage-pop-up-koopo-circle-black.trans_.bitmap-on-koopoonline.com-e1585520826970.png'}}/>

            <Text style={{textAlign:'center', fontSize:18, padding:20}}>Fashion + Beauty + Technology + Home
            Decor + Health + Food + Visit!
            </Text>

          <Image style={{width:'100%',height:200}} source={{uri:'https://koopoonline.com/wp-content/uploads/2021/04/red-bridge-near-trees-stockpack-unsplash.jpg'}}/>

            <View style={{borderBottomWidth:1,margin:20,borderColor:'#ddd', backgoundColor:'#fff'}}><Text style={{textAlign:'right', fontSize:16, color:'#222'}}>See More Products-></Text>

            <ProductBlock layout='slider' category='531' />
            </View>
            <View style={{padding:15}}><Text style={{fontSize:16}}>Categories</Text>

              <ProductCats />

            </View>


              <BlogBlock layout='slider'/>

            {/* <TouchableOpacity
              onPress={() => navigation.navigate('Blog')}
              style={{backgroundColor:"red", padding:10, borderRadius:10, marginBottom:10}}
                >
                  <Text style={{textAlign:"center", fontSize:18, fontWeight:"bold", color:"#fff"}}>Blog</Text>
              </TouchableOpacity>

              <Button
                title="About"
                onPress={() => navigation.navigate('About')}
                color="red"
              />
              <View style={{marginTop:10}}><Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
                color="purple"
              />
              </View> */}
          </View>
          </ScrollView>
    </View>

  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default HomeScreen;