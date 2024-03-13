import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createClient } from 'contentful'; 
import SingleGame from '../ui/SingleGame';

function Home(props) {

    const [games, setGames] = useState([]);

    const client = createClient({ 
      space: `${import.meta.env.VITE_REACT_APP_SPACE_ID}`, 
      accessToken: `${import.meta.env.VITE_REACT_APP_CDA_TOKEN}`
    });

    const { gamesCategory } = props

    // Funktion zum Fetchen der API von Contentful:
    useEffect(() => {
      async function fetchData() {
        try {
          await client.getEntries({content_type: "genericCt"}).then((data) => {
            const filteredData = data.items.reduce((acc, cur)=>
            { 
              if (!gamesCategory){
                acc.push(cur)
              } else if (cur.fields.game.genres.find((g)=>g==gamesCategory)) {
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
    }, []);

    return (
        <div className="">
        {games?.items?.map((game) => (
            <Link key={game.sys.id} to={`/games/${game.sys.id}`}>
                <SingleGame game={game} />
            </Link>
        ))}
        </div>
    );
}

export default Home;