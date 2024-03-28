import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { createClient } from 'contentful'; 
import SingleGame from '../ui/SingleGame';
import { useFetch } from "../hooks/useFetch.js";

function Home(props) {

    const [games, setGames] = useState([]);
    const [toggles, setToggles] = useState({name: false, date: false, rating: false});

    // const client = createClient({ 
    //   space: `${import.meta.env.VITE_REACT_APP_SPACE_ID}`, 
    //   accessToken: `${import.meta.env.VITE_REACT_APP_CDA_TOKEN}`
    // });

    const { cat } = props
    console.log("gamesCategory",games);

    // Funktion zum Fetchen der API von Contentful: environment.createEntryWithId('<content_type_id>', '<entry_id>',



    useEffect(() => {

      const url = `${import.meta.env.VITE_SERVER_URL}/allgames`
      fetchGames(url);
      async function fetchGames(url) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Request failed");
          console.log("datares", res);

          const data = await res.json();
          console.log("datares", data);
          const filteredData = data.reduce((acc, cur)=>
          { 
            if (!cat){
              acc.push(cur)
            } else if (cur.genres.find((g)=>g==cat)) {
              acc.push(cur)
            }
              return acc
          }, [])

          const sortedFilteredData = filteredData.toSorted((a, b)=>{
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase

            return toggles.name ? (nameA < nameB ? 1 : nameA > nameB ? -1 : 0): (nameB < nameA ? 1 : nameB > nameA ? -1 : 0) ;
          })

          console.log("sortedFilteredData", sortedFilteredData);
          setGames(sortedFilteredData);




        } catch (error) {
          console.log(error);
        }
      }
  


      // async function fetchData() {
      //   try {
      //     await client.getEntries({content_type: "genericCt"}).then((data) => {
      //       const filteredData = data.items.reduce((acc, cur)=>
      //       { 
      //         if (!cat){
      //           acc.push(cur)
      //         } else if (cur.genres.find((g)=>g==cat)) {
      //           acc.push(cur)
      //         }
      //           return acc
      //         }, [])


      //         const sortedFilteredData = filteredData.toSorted((a, b)=>{
      //           const nameA = a.fields.title.toUpperCase(); // ignore upper and lowercase
      //           const nameB = b.fields.title.toUpperCase(); // ignore upper and lowercase

      //           return toggles.name ? (nameA < nameB ? 1 : nameA > nameB ? -1 : 0): (nameB < nameA ? 1 : nameB > nameA ? -1 : 0) ;
      //         })

      //       setGames({...data, items:sortedFilteredData});
      //     });

      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
  
      // fetchData();


    }, [cat]);

    return (
        <div className="main">
          <br />
          &nbsp;&nbsp;<button className={toggles.name?'sortDown':'sortUp'} onClick={
            (e)=>{
              setToggles({name: !toggles.name, date: false, rating: false})
              const items = games;
              const gamesItemsSorted = games.toSorted((a, b)=>{
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase

                return toggles.name ? (nameA < nameB ? 1 : nameA > nameB ? -1 : 0): (nameB < nameA ? 1 : nameB > nameA ? -1 : 0) ;
                })
              setGames(gamesItemsSorted)

            
            }
          }>Name</button>&nbsp;&nbsp;&nbsp;
          <button className={toggles.date?'sortDown':'sortUp'} onClick={
            (e)=>{
              setToggles({name: false, date:!toggles.date, rating: false})
              const items = games;
              const gamesItemsSorted = games.toSorted((a, b)=>{
                const nameA = a.first_release_date; // ignore upper and lowercase
                const nameB = b.first_release_date; // ignore upper and lowercase

                return toggles.date ? (nameA < nameB ? -1 : nameA > nameB ? 1 : 0): (nameB < nameA ? -1 : nameB > nameA ? 1 : 0) ;
                })
                setGames(gamesItemsSorted)
              }
          }>Date</button>&nbsp;&nbsp;&nbsp;<button className={toggles.rating?'sortDown':'sortUp'} onClick={
            (e)=>{
              setToggles({name: false, date:false, rating:!toggles.rating})
              const items = games;
              const gamesItemsSorted = games.toSorted((a, b)=>{
                const nameA = a.total_rating; // ignore upper and lowercase
                const nameB = b.total_rating; // ignore upper and lowercase

                return toggles.rating ? (nameA < nameB ? -1 : nameA > nameB ? 1 : 0): (nameB < nameA ? -1 : nameB > nameA ? 1 : 0) ;
                })
                setGames(gamesItemsSorted)
              }
          }>Rating</button>
          <br />
          <br />
          <div className="row">

            {games?.map((game) => (
                <SingleGame game={game} />
            ))}
                </div>

        </div>
    );
}

export default Home;