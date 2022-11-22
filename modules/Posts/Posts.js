import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity, Button, ActivityIndicator, FlatList, Share } from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import {decode} from "html-entities"
import {MainHeader} from "../../Components/MainHeader"
import HTML from 'react-native-render-html'
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

const Posts = ({category, view}) => {

  const defaultPic = 'https://koopoonline.com/wp-content/uploads/2020/08/Get-Things-Done-On-Koopoonline.com_.jpg';
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, refresh] = useState(false);
  const [page, setPage] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = 'https://koopoonline.com/wp-json/wp/v2/';
  const cat = category;
  const layout = view;

  const apiCall = cat ? apiUrl + 'posts?_embed&page=' + page + '&categories=' + cat:apiUrl + 'posts?_embed&page=' + page;

  const getPosts = async () => {

      const response = await axios.get( apiCall )
        .then( res => {

         if(res.data.length == 0){
            setIsListEnd(true);
          }
          setPosts([...posts,...res.data]);
          setLoading(true);
          refresh(false);
          setPage(page + 1);
        })
      .catch(err =>{
        setLoading(false);
        setIsListEnd(true);
        setError(err);
      });
  };

  const _handleRefresh = () => {
        setPage(1);
        refresh(true);
        getPosts();

  };
  const handleLoadMore = () => {

          if (!isListEnd){
          setLoading(false);
          getPosts();

          }
  };

  useEffect(() => {
      getPosts();
    }, []);


  const navigation = useNavigation();



  const Item = ({id,title,author, image, avatar, excerpt, date, filter, category, comments, uri, share, nav}) =>(

    <View style={styles.item} key={id} >
        <TouchableOpacity onPress={nav}>
        { image ? (<Image
              style={{height: 200, borderTopRightRadius:10, borderTopLeftRadius:10}} resizeMode='cover'
                source={{
                  uri: image,
              }}/>):(<View></View>)}

        <View style={{flexDirection: "row", padding:5, justifyContent:'flex-end' }}>
              <Text style={{textAlign:'right', marginRight:10}}>{comments}</Text>
              <Icon name="message-circle"  size={14} />
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>{decode(title)}</Text>
            </View>
        </TouchableOpacity>

        <View style={{paddingTop:10, paddingBottom:10, paddingRight:15, paddingLeft:15}}>
            <HTML source={{html:excerpt}} baseFontStyle={{fontSize:15}} containerStyle={{padding:5, margin:0}}
            renderers={{
                p: (_, children) => <Text numberOfLines={4}>{children}</Text>,
              }}
            ignoredTags={['div']}
            />
          <View style={{flexDirection: "row", padding:5,}}>
              <Image
              style={{height:30, width:30, borderRadius:25 }}
              source={{uri:avatar}}
              />
              <Text style={{fontWeight:"bold", padding:5, textTransform:"capitalize"}}>{author}</Text>

          </View>
                        <Text>{date}</Text>

        </View>
        <View style={{flexDirection: "row", padding:10, justifyContent:'space-between'}}>

            <TouchableOpacity onPress={filter}>
                <Text style={{padding:5, fontSize:15}} >{decode(category)}</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row', padding:8, alignSelf:'center', justifyContent:'space-between', borderRadius:10, backgroundColor:'#ffba12'}} onPress={share}>
              <Text style={{color:'#fff', marginRight:10}}>SHARE</Text>
              <Icon name="share-2"  size={16} color={'#fff'} />
            </TouchableOpacity>
        </View>
      </View>
    );

  const renderItem = ({item, props}) => {

      const imageUrl = item._embedded["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0].source_url:defaultPic;
      const avatar = item._embedded.author ? item._embedded.author[0].avatar_urls["48"]:'';

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

          const filterByCat =() =>{
            navigation.push('Blog', { categories:item.categories[0] })
          }

      const showSingle = () =>{

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
      });

    };

      return (
        <Item filter={filterByCat} id={item.id} title={item.title.rendered} author={item._embedded.author[0].name} image={imageUrl} avatar={avatar}  uri={item.link} excerpt={item.excerpt.rendered} nav={showSingle} date={moment(item.date).fromNow()} comments={item._embedded.replies ? item._embedded.replies[0].length:0}  share={ShareIt} category={item._embedded["wp:term"][0][0].name} />
      )
    };

    const postHeader = ()=>(
      <View style={{backgroundColor:"#fff"}}>
          <View>
          <Image
            style={{height: 250, width:'100%'}} resizeMode='cover'
              source={{
                uri: 'https://koopoonline.com/wp-content/uploads/2021/03/Koopoonline.com-Spring-2021.jpg',
            }}
          />
          <Text style={{textAlign:'center', fontWeight:"bold", fontSize:22, padding:10}}>The Square</Text>
          </View>
      </View>
    );

    const postFooter = () =>{

      if (isListEnd) {
        return(<Text style={{textAlign:'center'}}>The End...</Text>);
      } else if(error) {
        return(<Text style={{textAlign:'center'}}>Error fetching data...check your network connection!{error.message}</Text> );
      }
  else {
        return(
          <View style={{padding:20}}>
              { loading ? true: <ActivityIndicator size={55} color="#ffcc01" />}
          </View>
        );

      }
    }

     return (

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={postHeader}
        ListFooterComponent={postFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1}
          initialNumToRender={6}
          onRefresh={_handleRefresh}
          refreshing={refreshing}

      />
  );

    // return(
    //   <View style={styles.container}>

    //     { loading ? true: <ActivityIndicator size="large" color="red" />}
    //     {posts.map(post =>{


    //       const image = post.better_featured_image ? post.better_featured_image.source_url:"https://koopoonline.com/wp-content/uploads/2021/02/Koopoonline.com-Instagram-February-14-2021-Friends.png";

    //       return (
    //       <>
    //       <TouchableOpacity
    //       >
    //       <Image
    //         style={{height: 200}} resizeMode='cover'
    //           source={{
    //             uri: image,
    //         }}
    //       />
    //       <Text style={styles.title}>{post.title.rendered}</Text>
    //       <Image style={{height:30, width:30, }}
    //       source={{uri:post._embedded.author[0].avatar_urls["48"]}} />
    //       <Text >{post._embedded['author'][0].name}</Text>
    //       </TouchableOpacity>
    //       </>
    //     )})}
    //   </View>

    //   );


}
 export default Posts;
 //class Posts extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       posts: {},
//       isLoaded:false
//     }
//   }
// componentDidMount() {
//    let apiUrl = 'https://koopoonline.com/wp-json/wp/v2/posts';

//    axios.get(apiUrl)
//    .then(res=>this.setState({
//      posts:res.data,
//      isLoaded:true
//    }))
//    .catch(err =>console.log(err));

//   }
// render() {
//   const {posts, isLoaded} = this.state;
//   const Item = ({title,content}) =>(
//     <View>
//         <Text>{title}</Text>
//         <Text>{content}</Text>
//     </View>
//     );
//   const renderPost = ({item}) =>(
//         <Item title={item.title.rendered}/>
//   )

//   if(isLoaded){
//     return(
//       <Fragment>
//       {posts.map(post =>(
//         <Text style={styles.title}>{post.title.rendered}</Text>
//       ))}
//       </Fragment>

//       )
//     }
//     return(
//       <View style={{padding:25}}>
//               <ActivityIndicator size="large" color="red" />
//     </View>
//     )

//   };


// }
const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  item: {
    backgroundColor:'#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10,
  },
  content:{
    paddingRight:8,
    paddingLeft:8,
    marginTop:0,
  },
  title: {
    fontSize: 20,
    textAlign:"center",
    fontWeight:'bold',
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

