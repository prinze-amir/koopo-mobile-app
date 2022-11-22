import { StatusBar } from 'expo-status-bar'
import React, {useState} from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {StackNav} from "./Navigation/StackNav"
import {SideNav} from "./Navigation/SideNav"
import {TabNav} from "./Navigation/TabNav"
import {UserContext} from './constants/userContext'
export default function App() {

const [user,setUser] = useState('Amir');

  return (
<UserContext.Provider value={{user, setUser}}>
  <NavigationContainer>
      <SideNav />
    </NavigationContainer>
</UserContext.Provider>

  );

};

