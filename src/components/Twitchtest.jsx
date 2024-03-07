import React from "react";
import { useState, useEffect, useRef } from "react";
import useContentful from "../hooks/useContentful";
import {useTwitchAPI,useTwitchEndpoint} from "../hooks/useTwitchAPI";

function Twitchtest() {
  const [genres, setGenres] = useState(false);
  const [error, loading, data] = useTwitchAPI();
  // console.log("dataX",data);

   useEffect(() => {
      // console.log("data1", data)
      const endpoint = "genres"
      const body = "fields *; limit 50;"
      const  dataGenresPromise  = useTwitchEndpoint(endpoint, body);
      dataGenresPromise.then((dataGenres)=>
      {

        const modifiedData = data?.map((d)=>{
        console.log("dataGenres", d.genres)
          
          const genres = d.genres?.map((g)=>{
            return dataGenres[dataGenres.findIndex(x => x.id === g)].name;
          })
          return({...d, genres})
        })
        console.log("dataGenres", modifiedData)
      }) 
    }, [data])

  if (error) {
    return <p>Something went wrong</p>;
  }

  if (loading) {
      return <p>Loading</p>;
  }

  return (
    <> ddd
    
    </>
  );
}

export default Twitchtest;
 