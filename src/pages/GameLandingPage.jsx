import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { createClient } from 'contentful'; 
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useFetch } from "../hooks/useFetch.js";


export default function GameLandingPage() {

  // const [game, setGame] = useState([]);
  // const [isloading, setIsloading] = useState(true);
  
  const [open, setOpen] = useState(false);
  const {gameId} = useParams();
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // const client = createClient({ 
  //   space: `${import.meta.env.VITE_REACT_APP_SPACE_ID}`, 
  //   accessToken: `${import.meta.env.VITE_REACT_APP_CDA_TOKEN}`
  // });

  let myDate = new Date()
  const [error, game] = useFetch( `${import.meta.env.VITE_SERVER_URL}/games/${gameId}`);

 
  if (!game || game.length === 0 ) {
    return <p>is loading</p>
  }
else{
  const test = game[0].screenshots?.map((s)=> {return ({ "src": s?.replace('thumb', '1080p') }) } )
  myDate = new Date(game[0].first_release_date * 1000);

  console.log (test)
  // console.log (game[0].screenshots)
  return (

      <>
      <div className="gameDetail">
        <br/>


      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}

        slides={game[0].screenshots?.map((s)=> {return ({ "src": s?.replace('thumb', '1080p') }) } )}
      />
          <div className="headLine">
            <h1 key={game[0].name}>{game[0].name}</h1>
            <button className="back" onClick={()=>navigate(-1)}>Back</button>
          </div>
          <div className="topPart">
          <div key="mainImage" className="mainImage">
            <img key={game[0].cover} src={game[0].cover.replace('thumb', '1080p')} />
          </div>
          <div className="infos">
          <p key={myDate.toISOString().substring(0,10)}>Release: {myDate.toISOString().substring(0,10)}</p>
          <br/>
          <ul key="wefohiowe">{game[0].genres?.map((g,idx) => <li key={idx}>{g}</li>)}</ul>
          <br/>
          <p key={game[0].storyline}>{game[0].storyline}</p>
          <p key={game[0].summary}>{game[0].summary}</p>

          </div>
          </div>
          <div className="screenshots row">
              {game[0].screenshots?.map((s,index)=> <div key={crypto.randomUUID()} className="col-lg-3 col-md-4"><img key={s} src={s?.replace('thumb', '1080p')} onClick={() => {setIndex(index); setOpen(true)}} /></div>)}
          </div>


        </div>
       
      </>
  );
}
}



 // useEffect(() => {
  //   if (gameId) {

  //     // const [error, data] = useFetch( `${import.meta.env.VITE_SERVER_URL}/games/${gameId}`);
  //     if (data) setGame(data);

  //     // async function fetchGame() {
  //     //   setIsloading(true)
  //     //     try {
  //     //         await client.getEntry(gameId).then((data) => {
  //     //         console.log("data",data)
  //     //         setGame(data);
            
  //     //         myDate = new Date(data.fields.game.first_release_date * 1000);
  //     //         setIsloading(false)
  //     //                     });
      
  //     //     } catch (error) {
  //     //         console.error(error);
  //     //         setIsloading(false)
  //     //     }
  //     // }
        
  //     // fetchGame();
  //   }
  // }, [data]);
