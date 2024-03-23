import {useState, useEffect} from "react"
export function useTwitchAPI(query) {
  let [data, setData] = useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);

  async function fetchTwitchAPITest(query) {
    setLoading(true);
    if (0&&token === false){
      try {


        const {VITE_TWITCH_API_ENDPOINT_AUTH,  VITE_TWITCH_API_CLIENT_ID, VITE_TWITCH_API_CLIENT_SECRET} = import.meta.env;
          let url = `${VITE_TWITCH_API_ENDPOINT_AUTH}?client_id=${VITE_TWITCH_API_CLIENT_ID}&client_secret=${VITE_TWITCH_API_CLIENT_SECRET}&grant_type=client_credentials`;


        const res = await fetch(url,{
          method: "POST",
          body: JSON.stringify({query})
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setToken(data);
        setLoading(false);
        console.log("data",data);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    } else {

      const {  VITE_TWITCH_API_BASE_URL, VITE_TWITCH_API_CLIENT_ID, VITE_TWITCH_API_CLIENT_TOKEN} = import.meta.env;
      console.log("VITE_TWITCH_API_CLIENT_ID",VITE_TWITCH_API_CLIENT_ID);

    try {

    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/${VITE_TWITCH_API_BASE_URL}/games`,
      { method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Accept': 'application/json',
          'Client-ID': `${VITE_TWITCH_API_CLIENT_ID}`,
          'Authorization': `Bearer ${VITE_TWITCH_API_CLIENT_TOKEN}` ,
        },
        body: "fields id,name,total_rating,summary,cover,storyline,first_release_date,artworks,game_modes,genres,involved_companies,platforms,screenshots,slug,themes,url,videos,websites;where total_rating > 86 & platforms=(6) & genres=(2,4,5,10,11,12,13,14,16) & first_release_date < 1710184341 & first_release_date > 1268334741;offset 12; sort genres asc; limit 14;"
    })
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    setData(data);
    setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }

 


    }
  }

  useEffect(() => {
    fetchTwitchAPITest(query)
  }, [query])

  return [error, loading, data];
}


export async function useTwitchEndpoint(endpoint, body) {

  async function fetchTwitchEndpoint(endpoint, body) {

    // https://api.igdb.com/v4/release_dates genres
    const { VITE_TWITCH_API_BASE_URL, VITE_TWITCH_API_CLIENT_ID, VITE_TWITCH_API_CLIENT_TOKEN} = import.meta.env;
    
    try {

      const res = await fetch(
      `https://cors-anywhere.herokuapp.com/${VITE_TWITCH_API_BASE_URL}/${endpoint}`,
      { method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Accept': 'application/json',
          'Client-ID': `${VITE_TWITCH_API_CLIENT_ID}`,
          'Authorization': `Bearer ${VITE_TWITCH_API_CLIENT_TOKEN}`, 
        },
        body: body
      })
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      return(data);
    } catch (error) {
      console.log(error);
    }

  }
  const genres = await fetchTwitchEndpoint(endpoint, body)


  return  genres;

}









 