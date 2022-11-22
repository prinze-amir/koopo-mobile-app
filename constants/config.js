import React from 'react'
import {Image, View, TouchableOpacity} from "react-native"
import { useNavigation } from '@react-navigation/native';
const site = "https://koopoonline.com";
const bbApi = "/wp-json/buddyboss/v1/";
const apiUrl = "/wp-json/wp/v2/";
const woo = {
    api: '/wp-json/wc/v3/products',
    consumer:'ck_6188337ff26de51255348011d32ffeabe3be3318',
    secret:'cs_03e4db9cdcf1ed26bab4d4dfdd9a16e2390f53bb',
    type:{
        external:'external',
        simple:'simple',
        subscription:'subscription'
    }
}

const logoHeader = () =>{
    const navigation = useNavigation();
    return(
    <TouchableOpacity onPress={()=> navigation.push("Home")}>
    <Image style={{width:150, height:38}} source={{uri:"https://koopoonline.com/wp-content/uploads/2017/11/short-logo-transparent-e1513812274342.png"}} />
    </TouchableOpacity>
    );
};

const postTypes = {
    posts:"posts",
    events:"ajde_events",
    pages:"pages",
    business: "wyz_business",//add support
    offers: "wzy_offers", //add support
    places: "wyz_location",//add support
    music:"koopo_music", //add support
    videos: "kvidz",// add support
    jobs:"job-listings",
   // resumes:"resumes", //no support
   forums:"forum",
   groups:"group",
   users:"users",
   bbuser:""
}

const buddyBoss = {

    members:"members",
    messages:"messages",
    activity:"activity",
    friends: "friends",//requires authentication???
}

export {
    site,
    bbApi,
    apiUrl,
    logoHeader,
    woo,
    postTypes,
    buddyBoss
}