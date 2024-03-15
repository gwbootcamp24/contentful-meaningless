import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createClient } from 'contentful'; 
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


export default function GameLandingPage() {

  const [game, setGame] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [open, setOpen] = useState(false);
  const {gameId} = useParams();
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
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
            
              myDate = new Date(data.fields.game.first_release_date * 1000);
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
      <div className="gameDetail">
        <br/>


      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}

        slides={game.fields.game.screenshots?.map((s)=> {return ({ "src": s.url?.replace('thumb', '1080p') }) } )}
      />
          <div className="headLine">
            <h1 key={game.fields.game.name}>{game.fields.game.name}</h1>
            <button className="back" onClick={()=>navigate(-1)}>Back</button>
          </div>
          <div className="topPart">
          <div key="mainImage" className="mainImage">
            <img key={game.fields.game.cover} src={game.fields.game.cover.replace('thumb', '1080p')} />
          </div>
          <div className="infos">
          <p key={myDate.toISOString().substring(0,10)}>Release: {myDate.toISOString().substring(0,10)}</p>
          <br/>
          <ul key="wefohiowe">{game.fields.game.genres?.map((g,idx) => <li key={idx}>{g}</li>)}</ul>
          <br/>
          <p key={game.fields.game.storyline}>{game.fields.game.storyline}</p>
          <p key={game.fields.game.summary}>{game.fields.game.summary}</p>

          </div>
          </div>
          <div className="screenshots row">
              {game.fields.game.screenshots?.map((s,index)=> <div key={crypto.randomUUID()} className="col-lg-3 col-md-4"><img key={s.url} src={s.url?.replace('thumb', '1080p')} onClick={() => {setIndex(index); setOpen(true)}} /></div>)}
          </div>


        </div>
       
      </>
  );
}
}
