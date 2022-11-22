import React from 'react'
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import {View} from 'react-native'

const SearchBar = ({type}) =>{

  const searchItems = (textToSearch) =>{
    //finish this
  }

return (
        <View style={{borderRadius:35,borderWidth:1,borderColor:'#ddd', marginBottom:20}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={text=>{searchItems}} />

            <Icon name="ios-people" />
          </Item>
        </View>
    );
}
export {SearchBar};