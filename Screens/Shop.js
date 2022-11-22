import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Products from "../modules/Products/Products"
import {MainHeader} from '../Components/MainHeader'

const ShopScreen = ({navigation, route}) => {

    return (
      <><MainHeader/>
        <Products category={route.params?.itemId}/>
        </>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
  },
});

export default ShopScreen;