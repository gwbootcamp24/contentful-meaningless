import { createClient } from 'contentful-management'

// const contentful = require('contentful-management')

export default function CreateEntryTest() {

  const contentfulClient = createClient({
    accessToken: import.meta.env.VITE_REACT_APP_CMA_TOKEN || '',
  })
  async function POST() {
    try {

      const fullName = `test`
  
      const space = await contentfulClient.getSpace(import.meta.env.VITE_REACT_APP_SPACE_ID || '')
      const environment = await space.getEnvironment('master' || 'master')
      const entries = await environment.getEntries();
      console.log("entries",entries)
      const entry = await environment.createEntry('genericCT', {
        fields: {
          game: {
            "en-US": {"test": "company"}
          },
        }
      })
  
      // Send Email
  console.log('Hello World',entry)
      return 1
    } catch (error) {
      console.log(error)
      return false
    }
  }  
  

 
console.log("hi");
POST()
console.log("contentful.createEntry")

  // const retVal = createPost(person);
// console.log(retVal)
  return (

    <p>Hi there</p>

  )

 
  

}
