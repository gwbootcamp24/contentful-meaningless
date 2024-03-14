import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createClient } from 'contentful'; 
import SingleGame from '../ui/SingleGame';

function Home(props) {

    const [games, setGames] = useState([]);
    const [toggles, setToggles] = useState({name: false, date: false, rating: false});

    const client = createClient({ 
      space: `${import.meta.env.VITE_REACT_APP_SPACE_ID}`, 
      accessToken: `${import.meta.env.VITE_REACT_APP_CDA_TOKEN}`
    });

    const { cat } = props
    console.log("gamesCategory",games);

    // Funktion zum Fetchen der API von Contentful: environment.createEntryWithId('<content_type_id>', '<entry_id>',
    useEffect(() => {
      async function fetchData() {
        try {
          await client.getEntries({content_type: "genericCt"}).then((data) => {
            const filteredData = data.items.reduce((acc, cur)=>
            { 
              if (!cat){
                acc.push(cur)
              } else if (cur.fields.game.genres.find((g)=>g==cat)) {
                acc.push(cur)
              }
                return acc
              }, [])
            setGames({...data, items:filteredData});
          });

        } catch (error) {
          console.error(error);
        }
      }
  
      fetchData();
    }, [cat]);

    return (
        <div className="main">
          <br />
          &nbsp;&nbsp;<button onClick={
            (e)=>{
              setToggles({...toggles, name:!toggles.name})
              const items = games.items;
              console.log("items",items );
              const gamesItemsSorted = games.items.toSorted((a, b)=>{
                const nameA = a.fields.title.toUpperCase(); // ignore upper and lowercase
                const nameB = b.fields.title.toUpperCase(); // ignore upper and lowercase

                return toggles.name ? (nameA < nameB ? -1 : nameA > nameB ? 1 : 0): (nameB < nameA ? -1 : nameB > nameA ? 1 : 0) ;
                })
              setGames({...games, items: gamesItemsSorted})

            
            }
          }>Name</button>&nbsp;&nbsp;&nbsp;
          <button onClick={
            (e)=>{
              setToggles({...toggles, date:!toggles.date})
              const items = games.items;
              console.log("items",items );
              const gamesItemsSorted = games.items.toSorted((a, b)=>{
                const nameA = a.fields.game.first_release_date; // ignore upper and lowercase
                const nameB = b.fields.game.first_release_date; // ignore upper and lowercase

                return toggles.date ? (nameA < nameB ? -1 : nameA > nameB ? 1 : 0): (nameB < nameA ? -1 : nameB > nameA ? 1 : 0) ;
                })
              setGames({...games, items: gamesItemsSorted})
            }
          }>Date</button>&nbsp;&nbsp;&nbsp;<button onClick={
            (e)=>{
              setToggles({...toggles, rating:!toggles.rating})
              const items = games.items;
              console.log("items",items );
              const gamesItemsSorted = games.items.toSorted((a, b)=>{
                const nameA = a.fields.game.total_rating; // ignore upper and lowercase
                const nameB = b.fields.game.total_rating; // ignore upper and lowercase

                return toggles.rating ? (nameA < nameB ? -1 : nameA > nameB ? 1 : 0): (nameB < nameA ? -1 : nameB > nameA ? 1 : 0) ;
                })
              setGames({...games, items: gamesItemsSorted})
            }
          }>Rating</button>
          <br />
          <br />
          <div class="row">

            {games?.items?.map((game) => (
                <SingleGame game={game} />
        ))}
                </div>

        </div>
    );
}

export default Home;