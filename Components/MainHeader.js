import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Header } from 'react-native-elements'
import {logoHeader} from "../constants/config"
import Icon from "react-native-vector-icons/Feather"
import { useNavigation } from '@react-navigation/native';


const MainHeader = ({stack})=>{
    const navigation = useNavigation();
    const back = () =>{
        if (stack == true){
            return(

                <TouchableOpacity onPress={()=> navigation.goBack()}><Icon name="arrow-left" size={30} /></TouchableOpacity>
            )
        } else {

            return(
                <TouchableOpacity onPress={()=> navigation.toggleDrawer()}><Icon name="menu" size={35} /></TouchableOpacity>
            );
        }
    }
    return(
        <Header
            statusBarProps={{ backgroundColor:"#000" }}
            leftComponent={back}
            centerComponent={logoHeader}
            rightComponent={{ icon: 'search', size:35 }}//onPress:()=>navigation.navigate(''searchBox)
            containerStyle={{
                backgroundColor: '#fff',
                justifyContent: 'space-around',
                shadowColor: "#eee",
                height:77,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
              elevation: 2,
            }}
        />
    );

}
export {MainHeader};