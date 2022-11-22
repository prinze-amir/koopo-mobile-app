import React, {Component, Fragment, useState, useEffect} from 'react'
import { StyleSheet, StatusBar, Text, Image, View, ScrollView, Pressable, TouchableOpacity, Button, SafeAreaView, ActivityIndicator, FlatList, TextInput, Animated } from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {SearchBar} from '../../Components/MainSearch'
import {decode} from "html-entities"
import { Overlay, Input } from 'react-native-elements';
import { site, apiUrl, postTypes } from "../../constants/config"

const JobList = () => {

  const defaultPic = site +'/wp-content/plugins/wp-job-manager/assets/images/company.png';
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, refresh] = useState(false);
  const [page, setPage] = useState(1);

   const [search, setSearch] = useState('');
  // const [filteredJobs, setFiltered] = useState([]);
  // const [allJobs, setAllJobs] = useState([]);

  const getJobs = async () => {

     await axios.get( site + apiUrl + postTypes.jobs + `?_embed&page=`+ page)
        .then( res => {
          setJobs([...jobs,...res.data]);
        //  setFiltered([...filteredJobs,...res.data]);
       //   setAllJobs([...allJobs,...res.data]);

          setLoading(true);
          refresh(false);
          setPage(page + 1);
        })
      .catch(err =>console.log(err));
  };

  const _handleRefresh = () => {
        setPage(1);
        refresh(true);
        getJobs();
  };
  const handleLoadMore = () => {
          setLoading(false);
          getJobs();
  };

  useEffect(() => {
      getJobs();
    }, []);


  // const searchFilterFunction = (text) => {
  //   // Check if searched text is not blank
  //   if (text) {
  //     // Inserted text is not blank
  //     // Filter the masterDataSource
  //     // Update FilteredDataSource
  //     const newData = allJobs.filter(function (item) {
  //       const itemData = item.title.rendered
  //         ? item.title.rendered.toUpperCase()
  //         : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFiltered(newData);
  //     setSearch(text);
  //   } else {
  //     // Inserted text is blank
  //     // Update FilteredDataSource with masterDataSource
  //     setFiltered(allJobs);
  //     setSearch(text);
  //   }
  // };

  const navigation = useNavigation();
  const Item = ({title, company,date, image, location, content, nav}) =>(
      <TouchableOpacity onPress={nav}
        >
        <View style={{padding:10,borderWidth:1,  borderColor:"#eee", borderRadius:2 }}>
            <Image
              style={{height: 65, borderRadius:100}} resizeMode='contain'
                source={{
                  uri: image,
              }}/>
            <Text style={styles.title}>{decode(title)}</Text>
            <Text style={{textAlign:"center", color:"#ffba12", fontWeight:"bold", fontSize:18,padding:7}}>{company}</Text>
            <View style={{flexDirection: "row", justifyContent:"center"}}>
              <Icon name="map-marker" size={18}/>
              <Text style={{textAlign:"center", marginLeft:10}}>{location}</Text>
          </View>
          <Text style={{fontSize:16,textAlign:"center", padding:8}}>{date}</Text>

        </View>
      </TouchableOpacity>
    );

  const renderItem = ({item, props}) => {

      const imageUrl = item._embedded["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].source_url:defaultPic;
      const avatar = item._embedded.author ? item._embedded.author[0].avatar_urls["48"]:'';

      let apply = '';
      if (item.meta._application.length != ''){
         apply = item.meta._application;
      } else {
         apply = 'use email link';
      }

      const showSingle = () =>{

      navigation.navigate('Job', {
        itemId:item.id,
        title:item.title.rendered,
        image:item._embedded["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].source_url:defaultPic,
        company: item.meta._company_name,
        apply:apply?apply:'Use Email',
        location: item.meta._job_location?item.meta._job_location:"Anywhere",
        date:moment(item.date).fromNow(),
        content:item.content.rendered,
        category:item._embedded['wp:term'][0][0].name,
        type:item.type
      });

    };

      return (
        <Item title={item.title.rendered} company={item.meta._company_name} location={item.meta._job_location?item.meta._job_location:"Anywhere"} image={imageUrl} content={item.content.rendered} date={moment(item.date).fromNow()} nav={showSingle}/>
      )
  };

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
      setVisible(!visible);
    };

    const jobHeader = ()=>(
      <View style={{backgroundColor:"#fff"}}>
          <View style={{padding:10}}>
          <Image
            style={{height: 250, width:'100%'}} resizeMode='cover'
              source={{
                uri: 'https://koopoonline.com/wp-content/uploads/2020/03/Remote-Work-On-Koopo-1.jpg',
            }}
          />
          </View>

            <Pressable onPress={toggleOverlay} style={{alignSelf:"center",backgroundColor:"#FF3E3E", borderRadius:25, padding:7, marginBottom:10}}>
              <Text style={{textAlign:'center', color:"#fff", fontWeight:"bold", fontSize:18, paddingRight:10, paddingLeft:10}}>Add Your Job</Text>
            </Pressable>
              <Overlay overlayStyle={{width:'80%'}} fullScreen={false} isVisible={visible} onBackdropPress={toggleOverlay}>
                  <Text>Add Your Job Man!</Text>
                  <Input
                    placeholder='BASIC INPUT'
                  />

                  <Input
                    placeholder='INPUT WITH ICON'
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                  />

                  <Input
                    placeholder='INPUT WITH CUSTOM ICON'
                    leftIcon={
                      <Icon
                        name='user'
                        size={24}
                        color='black'
                      />
                    }
                  />

                  <Input
                    placeholder='INPUT WITH ERROR MESSAGE'
                    errorStyle={{ color: 'red' }}
                    errorMessage='ENTER A VALID ERROR HERE'
                  />

                  <Input placeholder="Password" secureTextEntry={true} />
              </Overlay>

              {/* <SearchBar
                round
                searchIcon={{ size: 24 }}
                lightTheme={true}
                inputContainerStyle={{backgroundColor:'#fff', borderWidth:1}}
                containerStyle={{backgroundColor:'#fff'}}
               onChangeText={setSearch(search)}
              //  onClear={(text) => searchFilterFunction('')}
            //    placeholder="Type Here..."
                value={search}
              /> */}

                  <SearchBar />


      </View>
    );

    const jobFooter = () =>(
      <View>
          { loading ? true: <ActivityIndicator size="large" color="red" />}

      </View>
    );


     return (
    <View style={styles.container}>

      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={jobHeader}
        ListFooterComponent={jobFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={6}
          onRefresh={_handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );


}
 export default JobList;

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
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

