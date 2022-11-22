import React, {useState, UseEffect} from 'react'
import axios from 'axios'
import { site, apiUrl, postTypes } from "../../constants/config"

const ApiService = ({type})=> {

    const [items, setitems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, refresh] = useState(false);
    const [page, setPage] = useState(1);

    const getItems = async () =>{

    await axios.get( site + apiUrl + type + `?_embed&page=`+ page)
            .then( res => {
            setItems(res.data);
            setLoading(true);
            refresh(false);
            })
        .catch(err =>console.log(err));


    }
}

export {ApiService};