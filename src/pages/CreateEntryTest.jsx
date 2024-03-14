import { createClient } from 'contentful-management'


export default function CreateEntryTest() {

  const contentfulClient = createClient({
    accessToken: import.meta.env.VITE_REACT_APP_CMA_TOKEN || '',
  })

  async function POST() {
    try {

      const fullName = `test`
  
      const space = await contentfulClient.getSpace(import.meta.env.VITE_REACT_APP_SPACE_ID || '')
      const environment = await space.getEnvironment('master' || 'master')
      const entries = await environment.getEntries('genericCT');
      console.log("entries",entries)

      // environment.createEntryWithId('<content_type_id>', '<entry_id>',
      // const entry = await environment.createEntry('genericCT', {

      const entry = await environment.createEntryWithId('genericCT', 'jhfew6fr', {
        fields: {
          title: {
            "en-US": "testname"
          },
          game: {
            "en-US": {test: "company"}
          },
        }
      })
  
      // Send Email
  console.log('Hello World',entry)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }  
  

POST()
console.log("contentful.createEntry")

  return (

    <p>Hi there</p>

  )


}
