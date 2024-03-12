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


        const {VITE_TWITCH_API_ENDPOINT_AUTH, VITE_TWITCH_API_ENDPOINT, VITE_TWITCH_API_CLIENT_ID, VITE_TWITCH_API_CLIENT_SECRET} = import.meta.env;
          let url = `${VITE_TWITCH_API_ENDPOINT_AUTH}?client_id=${VITE_TWITCH_API_CLIENT_ID}&client_secret=${VITE_TWITCH_API_CLIENT_SECRET}&grant_type=client_credentials`;

        // https://id.twitch.tv/oauth2/authorize
        // ?response_type=token
        // &client_id=hof5gwx0su6owfnys0yan9c87zr6t
        // &redirect_uri=http://localhost:3000
        // &scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls
        // &state=c3ab8aa609ea11e793ae92361f002671

        const res = await fetch(url,{
          method: "POST",
          body: JSON.stringify({query})
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setToken(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    } else {


    try {

    const res = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games",
      { method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Accept': 'application/json',
          'Client-ID': '5azs5nrj0o6l1qwezsjj147q3g9h06',
          'Authorization': 'Bearer fhzb0aha100e1lylywywbe5585ehe1',
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
    
    try {

      const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/${endpoint}`,
      { method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Accept': 'application/json',
          'Client-ID': '5azs5nrj0o6l1qwezsjj147q3g9h06',
          'Authorization': 'Bearer fhzb0aha100e1lylywywbe5585ehe1',
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














// const url = "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/?fields=id,name,summary,cover.url,platforms,first_release_date,popularity&order=popularity:desc&limit=50";

// https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/' \
// -d 'fields *, url, cover;where rating > 75; limit 50;' \
// -H 'Client-ID: 5azs5nrj0o6l1qwezsjj147q3g9h06' \
// -H 'Authorization: Bearer fhzb0aha100e1lylywywbe5585ehe1' \
// -H 'Accept: application/json'rl


// https://id.twitch.tv/oauth2/authorize
  // ?response_type=token
  // &client_id=hof5gwx0su6owfnys0yan9c87zr6t
  // &redirect_uri=http://localhost:3000
  // &scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls
  // &state=c3ab8aa609ea11e793ae92361f002671



      // fetch(
      //   "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games",
      //   { method: 'POST',
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //       'Accept': 'application/json',
      //       'Client-ID': '5azs5nrj0o6l1qwezsjj147q3g9h06',
      //       'Authorization': 'Bearer fhzb0aha100e1lylywywbe5585ehe1',
      //     },
      //     body: "fields *, url, cover;where rating > 75; limit 50;"
      // })
      //   .then(response => {
      //       return response.json()
      //   })
      //    .catch(err => {
      //       console.error(err);
      //   });

