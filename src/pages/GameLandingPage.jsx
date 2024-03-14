import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createClient } from 'contentful'; 
import SingleGame from '../ui/SingleGame';

export default function GameLandingPage() {

  const [game, setGame] = useState([]);
  const [isloading, setIsloading] = useState(true);

  const {gameId} = useParams();
  // console.log("gameId",gameId)

  const client = createClient({ 
    space: `${import.meta.env.VITE_REACT_APP_SPACE_ID}`, 
    accessToken: `${import.meta.env.VITE_REACT_APP_CDA_TOKEN}`
  });

  let myDate = new Date()

  useEffect(() => {
    if (gameId) {
      async function fetchGame() {
        setIsloading(true)
          try {
              await client.getEntry(gameId).then((data) => {
              console.log("data",data)
              setGame(data);
              // console.log("game", data.fields.game)
              // const {id, first_release_date, storyline, summary} = game.fields.game
              // console.log(id)
              // console.log("first_release_date",first_release_date)
            
              myDate = new Date(data.fields.game.first_release_date * 1000);
              // console.log(myDate.toISOString().substring(0,10))
            
              setIsloading(false)
                          });
      
          } catch (error) {
              console.error(error);
              setIsloading(false)
          }
      }
        
      fetchGame();
    }
      }, [gameId]);

  if (isloading) {
    return <p>is loading</p>
  }
else{
  return (

      <>
        <br/>
          <h1 key={game.fields.game.name}>{game.fields.game.name}</h1>
          <div key="mainImage" className="mainImage">
            <img key={game.fields.game.cover} src={game.fields.game.cover.replace('thumb', '1080p')} />
          </div>
          <div className="screenshots row">
              {game.fields.game.screenshots?.map((s)=> <div key={crypto.randomUUID()} className="col-lg-3 col-md-4"><img key={s.url} src={s.url.replace('thumb', '1080p')} /></div>)}
          </div>
          <p key={myDate.toISOString().substring(0,10)}>Release: {myDate.toISOString().substring(0,10)}</p>
          <br/>
          <ul key="wefohiowe">{game.fields.game.genres?.map((g,idx) => <li key={idx}>{g}</li>)}</ul>
          <br/>
          <p key={game.fields.game.storyline}>{game.fields.game.storyline}</p>
          <p key={game.fields.game.summary}>{game.fields.game.summary}</p>


       
      </>
  );
}
}
