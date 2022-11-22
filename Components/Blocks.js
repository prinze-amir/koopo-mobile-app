import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, Button, ActivityIndicator, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Fragment, Share } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {decode} from 'html-entities';
import { site, apiUrl, postTypes, woo } from "../constants/config"
import axios from "axios"
import moment from 'moment';

const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" color="white" />
    </View>
);

const BlogBlock = ({layout, categories}) => {

    const [items, setItems] = useState([]);
    const cat = categories;
    const apiCall = cat ? site + apiUrl + 'posts?_embed&per_page=4&orderby=rand&categories=' + cat: site + apiUrl + 'posts?_embed&per_page=4';

    const getItems = async () => {

        await axios.get( apiCall )
            .then( res => {
            setItems(res.data);
            })
        .catch(err =>console.log(err));
    };

    useEffect(() => {
      getItems();
    }, []);

    const defaultPic = 'https://koopoonline.com/wp-content/uploads/2020/08/Get-Things-Done-On-Koopoonline.com_.jpg';

    const navigation = useNavigation();

    if (layout == 'grid'){

        return (
            <View style={styles.flexBox}>
                {items.map(item => {

                //for Share Functionality
                const content = {
                  message:item.link,
                  title: decode(item.title.rendered),
                  url:item.link,//ios
                };

                const options = {
                  dialogTitle:'Share Blog Post',
                  subject:decode(item.title.rendered) + ' - on Koopo',
                  tintColor:'#ffcc01',
                };

                const ShareIt = async () => {
                  try {
                    const result = await Share.share(content,options);

                  } catch (error) {
                    alert(error.message);
                  }
                };

              const showPost = () =>{

              navigation.push('Single', {
                itemId:item.id,
                date:moment(item.date).fromNow(),
                title:item.title.rendered,
                image:item._embedded["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].source_url:defaultPic,
                author: item._embedded.author[0].name,
                avatar: item._embedded.author ? item._embedded.author[0].avatar_urls["48"]:'',
                content:item.content.rendered,
                type:item.type,
                url:item.link,
                replies:item._embedded.replies ? item._embedded.replies[0]:[],
                category:item._embedded["wp:term"][0][0].name,
                allCategories:item._embedded["wp:term"][0] ? item._embedded["wp:term"][0]:[],
                tags:item._embedded['wp:term'][1] ? item._embedded['wp:term'][1]:[],
                category_ids:item.categories,
                share:ShareIt,
                type:item.type,
              });

            };
                  return (
                    <TouchableOpacity style={styles.item} key={item.id}  onPress={showPost}>
                        <Image style={{width:160, height:200, alignSelf:'center', borderRadius:5}} source={{uri:item._embedded["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].source_url:defaultPic}}/>
                        <Text numberOfLines={2} style={styles.title}>{decode(item.title.rendered)}</Text>
                    </TouchableOpacity>
                    )})}
          </View>

        );
      }
    else if (layout == 'slider'){
        return (
            <ScrollView style={{marginBottom:20}}  horizontal  >
                {items.map(item => {

                  //for Share Functionality
                const content = {
                  message:item.link,
                  title: decode(item.title.rendered),
                  url:item.link,//ios
                };

                const options = {
                  dialogTitle:'Share Blog Post',
                  subject:decode(item.title.rendered) + ' - on Koopo',
                  tintColor:'#ffcc01',
                };

                const ShareIt = async () => {
                  try {
                    const result = await Share.share(content,options);

                  } catch (error) {
                    alert(error.message);
                  }
                };

              const showPost = () =>{

              navigation.push('Single', {
                itemId:item.id,
                date:moment(item.date).fromNow(),
                title:item.title.rendered,
                image:item._embedded["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].source_url:defaultPic,
                author: item._embedded.author[0].name,
                avatar: item._embedded.author ? item._embedded.author[0].avatar_urls["48"]:'',
                content:item.content.rendered,
                type:item.type,
                url:item.link,
                replies:item._embedded.replies ? item._embedded.replies[0]:[],
                category:item._embedded["wp:term"][0][0].name,
                allCategories:item._embedded["wp:term"][0] ? item._embedded["wp:term"][0]:[],
                tags:item._embedded['wp:term'][1] ? item._embedded['wp:term'][1]:[],
                category_ids:item.categories,
                share:ShareIt,
                type:item.type,
              });

            };
                  return (
                    <TouchableOpacity style={{width:160, margin:10}} key={item.id}  onPress={showPost}>
                        <Image style={{width:160, height:200,  borderRadius:5}} source={{uri:item._embedded["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].source_url:defaultPic}}/>
                        <Text numberOfLines={2} style={styles.title}>{decode(item.title.rendered)}</Text>
                    </TouchableOpacity>
                    )})}
          </ScrollView>

        );
      }
};
const ProductBlock = ({layout='grid', category='', related=[]}) => {

    const [items, setItems] = useState([]);
    const cat = category;
    const getItems = async () => {

    await axios.get( site + woo.api + '?consumer_key=' + woo.consumer + '&consumer_secret=' + woo.secret + '&per_page=4&category=' + cat + '&include=' + related)
            .then( res => {
            setItems(res.data);
            })
        .catch(err =>console.log(err));
    };

    useEffect(() => {
      getItems();
    }, []);

    const defaultPic = 'https://koopoonline.com/wp-content/uploads/2018/09/No_Image_Available.jpg';

    const navigation = useNavigation();

    if (layout == 'grid'){
      return (
        <View style={styles.flexBox}>
            {items.map(item => {

          const showItem = () =>{

          navigation.push('Product', {
            itemId:item.id,
            title:item.name,
            price:item.price,
            image:item.images ? item.images[0].src:defaultPic,
            gallery:item.images ? item.images:[],
            seller: item.store.name,
            sellerId:item.store.id,
            sellerLink:item.store.url,
            sellerLogo:item.store_logo,
            description:item.description,
            related:item.related_ids,
            type:item.type,//external, subscription, etc.
            categories:item.categories//array of objects with id, name, slug
          });

        };
              return (
                <TouchableOpacity style={styles.item} key={item.id}  onPress={showItem}>
                    <Image style={{width:160, height:200, alignSelf:'center', borderRadius:5}} source={{uri:item.images ? item.images[0].src:defaultPic}}/>
                    <Text numberOfLines={2} style={styles.title}>{decode(item.name)}</Text>
                    <Text numberOfLines={2} style={{fontSize:16, textAlign:'center'}}>${decode(item.price)}</Text>
                </TouchableOpacity>
                )})}
      </View>

      );
    } else if (layout == 'slider'){
      return (
        <ScrollView style={{marginBottom:20}}  horizontal  >
            {items.map(item => {

          const showItem = () =>{

          navigation.push('Product', {
            itemId:item.id,
            title:item.name,
            price:item.price,
            image:item.images ? item.images[0].src:defaultPic,
            gallery:item.images ? item.images:[],
            seller: item.store.name,
            sellerId:item.store.id,
            sellerLink:item.store.url,
            sellerLogo:item.store_logo,
            description:item.description,
            related:item.related_ids,
            type:item.type,//external, subscription, etc.
            categories:item.categories//array of objects with id, name, slug
          });

        };
              return (
                <TouchableOpacity style={styles.item, {width:160, margin:10}} key={item.id}  onPress={showItem}>
                    <Image style={{width:160, height:200, alignSelf:'center', borderRadius:5}} source={{uri:item.images[0] ? item.images[0].src:defaultPic}}/>
                    <Text numberOfLines={2} style={styles.title}>{decode(item.name)}</Text>
                    <Text numberOfLines={2} style={{fontSize:16, textAlign:'center'}}>${decode(item.price)}</Text>
                </TouchableOpacity>
                )})}
      </ScrollView>

      );

    }
};
const ProductCats = () => {

    const [items, setItems] = useState([]);

    const getItems = async () => {

    await axios.get( site + woo.api + '/categories?consumer_key=' + woo.consumer + '&consumer_secret=' + woo.secret + '&hide_empty=true&orderby=count&order=desc&per_page=8')
            .then( res => {
            setItems(res.data);
            })
        .catch(err =>console.log(err));
    };

    useEffect(() => {
      getItems();
    }, []);

    const defaultPic = 'https://koopoonline.com/wp-content/uploads/2018/09/No_Image_Available.jpg';

      const navigation = useNavigation();

      return (
        <ScrollView style={{marginBottom:20}}  horizontal  >
            {items.map(item => {

          const showItem = () =>{

          navigation.push('Shop', {
            itemId:item.id,
            title:decode(item.name),
            image:item.image ? item.image.src:defaultPic,
            count: item.count
          });

        };
              return (
                <TouchableOpacity style={styles.item, {width:100, margin:10}} key={item.id}  onPress={showItem}>
                    <Image style={{width:75, height:75, alignSelf:'center', borderRadius:50}} source={{uri:item.image ? item.image.src:defaultPic}}/>
                    <Text numberOfLines={2} style={styles.title}>{decode(item.name)}</Text>
                    <Text numberOfLines={2} style={{fontSize:12, textAlign:'center'}}>({decode(item.count)})</Text>
                </TouchableOpacity>
                )})}
      </ScrollView>

      );

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
  flexBox:{
      flex:1,
      flexDirection:'row',
      flexWrap:'wrap',
      alignItems:'flex-start',
  },
  item:{
      width:'50%',
      marginBottom:5,
      // backgroundColor: '#fff',
      height:275,

  },
   title: {
    fontSize: 16,
    textAlign:"center",
    marginTop:10,
    padding:5,
  },
});
export {BlogBlock, ProductBlock, ProductCats};