import React, {Component} from 'react'
import { StyleSheet, StatusBar, Text, Image, View, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { Container, Header } from 'native-base';
import {Avatar} from "react-native-elements"
import {WebView} from "react-native-webview"
import HTML from "react-native-render-html"
import {decode} from "html-entities"
import {MainHeader} from '../../Components/MainHeader'
import { useNavigation } from '@react-navigation/native'
import {ProductBlock} from  '../../Components/Blocks'


const Product = ({title, description, image, gallery, seller, sellerId, logo, categories, related, price})=>{

  const navigation = useNavigation();

  const showSeller =()=>{
    navigation.navigate('Seller', {
          id:sellerId,
          name:seller,
          price:item.price,
          logo:logo,
      });

  }


  return(
    <Container>
      <ScrollView style={{backgroundColor:'#fff'}}>
          <Image
              style={{height:400}}
              source={{uri:image}}
          />
          <View style={{height:"auto",paddingRight:15,paddingLeft:15, backgroundColor:"#fff"}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>${price}</Text>
          <HTML source={{html:description}} imagesMaxWidth={Dimensions.get('window').width}
            baseFontStyle={{fontSize:14}} />
                <View>
                    {categories.map(cat=>{
                        <Text key={cat.id}>{cat.name}</Text>
                    })}
                </View>


                <View style={{flexDirection: "row"}}>
                <Avatar rounded title="AA" titleStyle={{color:"#000"}} containerStyle={{backgroundColor:"#ffcc01"}} source={{uri:logo}}/>

                <Text style={{textTransform:"capitalize", padding:5}}>by: {seller}</Text>

              </View>

              {/* <HTML source={{html:content}} imagesMaxWidth={Dimensions.get('window').width} baseFontStyle={{fontSize:17}} /> */}
          </View>
          <View style={{backgroundColor:'#fafafa'}}>
          <Text style={{fontSize:18, fontWeight:'bold',padding:10}}>RELATED PRODUCTS</Text>
            <ProductBlock layout='slider'  related={related}/>
          </View>
      </ScrollView>
    </Container>
  )

}
const SingleProduct = ({navigation, route}) => {

const type = route.params?.type;

if(type ==='external'){
    return (
      <Container  style={styles.wrapper}>
        <MainHeader stack={true} />
        <Product  title={route.params?.title} price={route.params?.price} image={route.params?.image} categories={route.params?.categories} description={route.params?.description} logo={route.params?.sellerLogo} sellerId={route.params?.sellerId} related={route.params?.related} seller={route.params?.seller}/>
      </Container>
  );
}

return (
      <View style={styles.wrapper}>
        <MainHeader stack={true} />
        <Product title={route.params?.title} price={route.params?.price} image={route.params?.image} categories={route.params?.categories} description={route.params?.description} logo={route.params?.sellerLogo} seller={route.params?.seller}/>
      </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:20,
  },
  title:{
    fontSize:18,
  padding:10,
  textAlign:'center',
  },
  wrapper:{
    flex:1,
  }
});

export {Product, SingleProduct}