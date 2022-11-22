import React, {Component} from 'react'
import { StyleSheet, StatusBar, Text, Image, View, ScrollView, Dimensions, Pressable, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import {Avatar} from "react-native-elements"
import {WebView} from "react-native-webview"
import {decode} from 'html-entities';
import { useNavigation } from '@react-navigation/native';
import {MainHeader} from '../../Components/MainHeader'
import HTML from 'react-native-render-html'
import Icon from 'react-native-vector-icons/Feather';
import {BlogBlock} from '../../Components/Blocks'

const PostSingle = ({title, content, image, comments, allCategories, tags, avatar, category_ids, author, category, id, url, date, share  })=>{

   const navigation = useNavigation();

  // const filter =(id) =>{
  //           navigation.push('Blog', { categories:id })
  //   }

  return(
      <ScrollView style={{backgroundColor:'#fafafa'}}>
          <Text style={styles.title}>{decode(title)}</Text>
          <View style={{flexDirection: "row", paddingLeft:10, justifyContent:'center'}}>
            <Avatar rounded title="AA" titleStyle={{color:"#000"}} containerStyle={{backgroundColor:"#ffcc01"}} source={{uri:avatar}}/>

            <Text style={{textTransform:"capitalize", padding:5}}>by: {author}</Text>
            <Text style={{padding:5}}>| {date}</Text>

          </View>
           <View style={{flexDirection: "row", justifyContent:'center', padding:10}}>
            <Pressable  style={{flexDirection:'row', padding:8, alignSelf:'center', justifyContent:'space-between', borderRadius:8, backgroundColor:'#000'}}
            RippleConfig={{color:'#ffcc01'}}
            onPress={share}>
                <Text style={{color:'#fff', marginRight:10}}>SHARE</Text>
                <Icon name="share-2"  size={16} color={'#fff'} />
            </Pressable>
          </View>
          { image ? (

            <Image
              style={{height:200}}
              source={{uri:image}}
          />

          ) : (<View></View>

          )}

          <View style={{height:"auto",paddingRight:20,paddingLeft:20, backgroundColor:"#fff"}}>

              <HTML source={{html:content}} imagesMaxWidth={Dimensions.get('window').width} baseFontStyle={{fontSize:17, lineHeight:25}} />

          </View>

          <ScrollView style={{padding:10}} horizontal>
            {allCategories ? (<Icon name="tag" size={20} color={'#333'} />):(<View></View>)}
            {allCategories ? allCategories.map( cat =>(
              <TouchableOpacity onPress={()=>{navigation.push('Blog', { categories:cat.id })}} style={{margin:5, padding:7, borderRadius:8, backgroundColor:'#eee'}}><Text style={{fontSize:16}} key={cat.id}>{decode(cat.name)}</Text></TouchableOpacity>
            )):(<View></View>)
            }
          </ScrollView>

          <ScrollView style={{ margin:10}} horizontal>
            {tags ? (<Icon name="tag" size={20} color={'#333'} />):(<View></View>)}
            {tags ? tags.map( tag =>(
              <TouchableOpacity  style={{margin:5, padding:7, borderRadius:8, backgroundColor:'#eee'}}><Text style={{fontSize:16, textTransform:'capitalize'}} key={tag.id}>{decode(tag.name)}</Text></TouchableOpacity>
            )):(<View></View>)}
          </ScrollView>

          <View style={{backgroundColor:'#fafafa',padding:10}}>
            <Text style={{fontSize:20}}>More Posts</Text>

            <BlogBlock layout='slider' categories={category_ids}/>
          </View>


          <View style={{backgroundColor:'#fafafa',padding:20}}>{comments.map( comment => (
                <View key={comment.id}>
                    <View style={{flexDirection: "row"}}>
                    <Avatar rounded title="AA" titleStyle={{color:"#000"}} containerStyle={{backgroundColor:"#ffcc01"}} source={{uri:comment.author_avatar_urls.['48']}}/>

                    <Text style={{textTransform:"capitalize", padding:5}}>by: {comment.author_name}</Text>
                    </View>
                    <HTML source={{html:comment.content.rendered}} baseFontStyle={{fontSize:15}} containerStyle={{padding:20, margin:0}}
                renderers={{
                    p: (_, children) => <Text numberOfLines={4}>{children}</Text>,
                  }}
                // ignoredTags={['p']}
                />
                  </View>
                  )
              )}
          </View>
      </ScrollView>
  )

}

const SinglePost = ({navigation, route}) => {

const type = route.params?.type;

if(type ==='post'){
    return (
      <View style={styles.wrapper}>
        <MainHeader stack={true} />
        <PostSingle title={route.params?.title} tags={route.params?.tags} allCategories={route.params?.allCategories} image={route.params?.image} content={route.params?.content} avatar={route.params?.avatar} author={route.params?.author} date={route.params?.date} id={route.params?.id} category={route.params?.category} category_ids={route.params?.category_ids} url={route.params?.url} share={route.params?.share} comments={route.params?.replies} />
      </View>
  );
}

return (
      <View style={styles.wrapper}>
        <MainHeader />
        <PostSingle title={route.params?.title}  image={route.params?.image} content={route.params?.content} avatar={route.params?.avatar} author={route.params?.author} comments={route.params?.replies}/>
      </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:20,
  },
  wrapper:{
    flex:1,
  },
  title: {
    fontWeight:'bold',
    fontSize:25,
    padding:10,
    textAlign:'center',
  },
});

export {PostSingle, SinglePost}