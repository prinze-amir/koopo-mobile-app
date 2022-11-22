import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, Image, View, Button, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { site, woo } from "../../constants/config"
import {decode} from "html-entities"

const Products = ({category, view}) => {

  const defaultPic = 'https://koopoonline.com/wp-content/uploads/2018/09/No_Image_Available.jpg';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, refresh] = useState(false);
  const [page, setPage] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);

  const cat = category;
  const layout = view;
  const apiCall = cat ? site + woo.api + '?consumer_key=' + woo.consumer + '&consumer_secret=' + woo.secret + '&page='+ page + '&category=' + cat: site + woo.api + '?consumer_key=' + woo.consumer + '&consumer_secret=' + woo.secret + '&page='+ page;
  const getItems = async () => {

      const response = await axios.get( apiCall )
        .then( res => {
           if (!res.data || res.data == 0){
            setIsListEnd(true);
          }
          setItems([...items, ...res.data]);
          setLoading(true);
          refresh(false);
          setPage(page + 1);
        })
      .catch(err =>console.log(err));
  };

  const _handleRefresh = () => {
        setPage(1);
        refresh(true);
        getItems();

  };
  const handleLoadMore = () => {

          if (!isListEnd){
            setLoading(false);
            getItems();
          }
  };

  useEffect(() => {
      getItems();
    }, []);


  const navigation = useNavigation();
  const Item = ({title, seller, logo, price, image, nav, AddToCart}) =>(
      <TouchableOpacity style={styles.product} onPress={nav}
        >
        <View style={{paddingBottom:20}}>
            <Image
              style={{height: 200}} resizeMode='cover'
                source={{
                  uri: image,
              }}/>
            <Text numberOfLines={2} style={styles.title}>{decode(title)}</Text>
            <Text  style={{fontSize:16, textAlign:'center'}}>${price}</Text>


              <View style={{flexDirection: "row", padding:5}}>
              <Image
              style={{height:30, width:30, borderRadius:25 }}
              source={{uri:logo}}
              />
              <Text style={{fontWeight:"bold", padding:5, textTransform:"capitalize"}}>{seller}</Text>
            </View>
            <Button
                title="Add To Cart"
                color="#ffcc01"
              />
              </View>
      </TouchableOpacity>
    );

  const renderItem = ({item, props}) => {

      const showItem = () =>{

      navigation.navigate('Product', {
          itemId:item.id,
          title:item.name,
          price:item.price,
          image:item.images ? item.images[0].src:defaultPic,
          gallery:item.images?item.images:[],
          seller: item.store.name,
          sellerId:item.store.id,
          sellerLink:item.store.url,
          sellerLogo:item.store_logo,
          description:decode(item.description),
          related:item.related_ids,
          type:item.type,//external, subscription, etc.
          categories:item.categories//array of objects with id, name, slug
      });

    };

      return (
        <Item title={item.name} seller={item.store.name} image={item.images[0] ? item.images[0].src:defaultPic} logo={item.store_logo}  price={item.price} nav={showItem}/>
      )
    };

    const postHeader = ()=>(
      <View style={{backgroundColor:"#fff"}}>
          <View>
          <Image
            style={{height: 250, width:'100%'}} resizeMode='cover'
              source={{
                uri: 'https://koopoonline.com/wp-content/uploads/2021/02/Koopoonline.com-Instagram-February-14-2021-Friends.png',
            }}
          />
          <Text style={{textAlign:'center', fontWeight:"bold", fontSize:35, padding:10}}>The Marketplace</Text>
          </View>
      </View>
    );

    const postFooter = () =>(
      <View style={{paddingVertical:20, marginBottom:100}}>
          { loading ? true: <ActivityIndicator size={55} color="#ffcc01" />}
      </View>
    );


     return (
    <View style={{backgroundColor:'#fafafa'}}>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={postHeader}
        ListFooterComponent={postFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={6}
          onRefresh={_handleRefresh}
          refreshing={refreshing}
          numColumns={2}

      />
    </View>
  );


}
 export default Products;

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  product:{
    flex:1,
    width:'48%',
    padding:10
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    textAlign:"center",
    padding:10,
  },
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

