import React from "react";
import { useState, useEffect, useRef } from "react";
import useContentful from "../hooks/useContentful";
import {useTwitchAPI,useTwitchEndpoint} from "../hooks/useTwitchAPI";

function Twitchtest() {
  const [allDone, setAllDone] = useState(false);
  const [games, setGames] = useState(false);
  const [error, loading, data] = useTwitchAPI();
  const allData = []

   useEffect(() => {
    let allDone = false

      // fields id,name,total_rating,summary,cover,storyline,first_release_date,artworks,game_modes,genres,involved_companies,platforms,screenshots,slug,themes,url,videos,websites
      
      if (data&&(allDone === false)){
        const endpoint = "genres"
        const body = "fields *; limit 51;"
          
        async function printFiles() {
          const sourceData = ["cover","url"];
          const source = ["covers","url"];
        
          const dataBig = await data.map(async (dataSet, index) => {
            // await Promise.all(data.map(async (dataSet, index) => {
            let modifiedData;
            if (dataSet.cover)
            {  
              const sourceData = ["cover","url"];
              const source = ["covers","url"];
              const endpoint = source[0]
              const body = `fields *; where id = ${dataSet.cover};limit 50;`

              const  dataPromise  = await useTwitchEndpoint(endpoint, body);
              if(dataPromise)
              {
                const myidx = dataPromise.findIndex(x => x.id === dataSet[sourceData[0]]);
                const changedField = dataPromise[dataPromise.findIndex(x => x.id === dataSet[sourceData[0]])][source[1]]
                modifiedData = {...dataSet,  [sourceData[0]]: changedField}
                // console.log("changedField",changedField)
                // console.log(myidx)
                // console.log("dataSet",dataSet)
                // console.log("modifiedData",modifiedData)

                // return modifiedData

                // setAllDone(true);
              }
            }

            if (dataSet.genres)
            {  


        // const  dataGenresPromise  = useTwitchEndpoint(endpoint, body);
        // dataGenresPromise.then((dataGenres)=>
        // {

        //   const modifiedData = data?.map((d)=>{
            
        //     const genres = d.genres?.map((g)=>{
        //       return dataGenres[dataGenres.findIndex(x => x.id === g)].name;
        //     })
        //     return({...d, genres})
        //   })
        // })
        // [ ["cover","url"], ["artworks", 'url'], ["game_modes", "name"], ["involved_companies", "company"],  ["platforms", "name"], ["screenshots", 'url'], ["websites", "url"] ].forEach(source => {

 
              const sourceData = ["genres","name"];
              const source = ["genres","name"];
              const endpoint = source[0]
              const body = "fields *; limit 51;"
      
              const  dataPromise  = await useTwitchEndpoint(endpoint, body);
              if(dataPromise)
              {
                const myidx = dataPromise.findIndex(x => x.id === dataSet[sourceData[0]]);
                // const changedField = dataPromise[dataPromise.findIndex(x => x.id === dataSet[sourceData[0]])][source[1]]


                const changedField = dataSet[sourceData[0]]?.map((g)=>{
                  return dataPromise[dataPromise.findIndex(x => x.id === g)][source[1]];
                })


                modifiedData = {...modifiedData,  [sourceData[0]]: changedField}

                // console.log("changedField",changedField)
                // console.log(myidx)
                // console.log("dataSet",dataSet)
                // console.log("modifiedData",modifiedData)

                return modifiedData

                // setAllDone(true);
              }
            }
            return dataSet

          });
           console.log("dataBig",dataBig)


        // }));
        }
        printFiles()



        }

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
 
 
 
                // const modifiedData = data?.map((d, index)=>{
                //   console.log("index", index)
                //   console.log("d", d)
                //   console.log("dataGenres", dataPromise)

                //   console.log("XXXXXXXXXXXXXXX", d[sourceData[0]] )
                //   const myidx = dataPromise.findIndex(x => x.id === d[sourceData[0]]);
                //   console.log(myidx)
                //   const changedField = dataPromise[dataPromise.findIndex(x => x.id === d[sourceData[0]])][source[1]]
                    
                //   // const changedField2 = d["genres"]?.map((g)=>{
                //   //   return dataPromise[dataPromise.findIndex(x => x.id === g)][source[1]];
                //   // })

                //   console.log("changedField",changedField)

                //   return({...d, [sourceData[0]]: changedField})
                // })



        // const temp =  [["cover","url"]].map(source => {

        //     const endpoint = source[0]
        //     const body = "fields *; limit 50;"
        //     const  dataPromise  = useTwitchEndpoint(endpoint, body);
        //     dataPromise.then((data)=>
        //     {
    
        //       const modifiedData = data?.map((d)=>{
                
        //         const changedField = d[source[0]]?.map((g)=>{
        //           return dataGenres[dataGenres.findIndex(x => x.id === g)][source[1]];
        //         })

        //         return({...d, [source[0]]: changedField})
        //       })
        //       allData = modifiedData;
        //     })
        //   });
