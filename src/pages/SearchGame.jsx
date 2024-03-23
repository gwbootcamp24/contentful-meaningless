import {usestate, useEffect, useState} from "react"
import {useTwitchAPI,useTwitchEndpoint} from "../hooks/useTwitchAPI";


function SearchGame () {
  const [formData, setFormData] = useState([])
  const [postsData,  setPostsData] = useState(false)

    const triggerSearch = async (event) => {
      event.preventDefault()
      try{

        const source = ["games","name"];
        const endpoint = source[0]
        const body = `fields id,name,total_rating,summary,cover,storyline,first_release_date,artworks,game_modes,genres,involved_companies,platforms,screenshots,slug,themes,url,videos,websites;where platforms=(6); search "${formData.name}";   limit 3;`

        const  data  = await useTwitchEndpoint(endpoint, body);
        
        // const res = await fetch("https://jsonplaceholder.typicode.com/posts")

        console.log(data)
        
        setPostsData(data) 
      }
      catch(err) {
        console.log(err)
      }

    }

  // useEffect(()=>{}, [formData]);


  return(
    <div>
    <form onSubmit={triggerSearch}>
    <input
        type='text'
        name='name'
        id='name'
        value={formData.name}
        onChange={(e)=>setFormData({...formData, "name":e.target.value})}
    />
    <button type='submit'>Submit</button>

    </form>
    {
      Array.isArray(postsData)&&postsData.map((post, index)=>{
        return(
          <div key={index} style={{"color": "#ffffff", lineHeight: 1.5}}>{JSON.stringify(post)}</div>
        )
      })

    }
    </div>
  )
}
export default SearchGame;


