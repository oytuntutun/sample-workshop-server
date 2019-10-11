// this piece of code generates API endpoints dynamically
// each folder will become APP_URL/folderName
// and each file will become APP_URL/folderName/fileName

import express from 'express'
const router = express.Router()
import fs from 'fs'

function routeCreator() {
  // get all the folders from api folder
  const mainEndpoints = fs.readdirSync('api')

    // loop in all main API endpoints (like courts, games etc.)
  mainEndpoints.forEach(endpoint => {
    // get the list of file names in the folder
    const fileNames = fs.readdirSync(`api/${endpoint}`)

    // get the contents of the files
    // each file has a method (post, get etc.) and an action
    // and params if its GET request
    // map them to have name as well
    const files = fileNames.map(x => {
      return {
        // get rid of the file extension
        name: x.replace('.js', ''),
        // file
        file: require(`../api/${endpoint}/${x}`).default
      }
    })

    // loop in mapped files
    files
      .forEach(route => {
        const { method, action, params } = route.file

        // lets say folder name is todos and file name is add and method is post
        // results in a post endpoint at APP_URL/todos/add
        const endpointUrl = `/${endpoint}/${params ? '' : route.name}${params ? params : ''}`

        console.log(endpointUrl)
        // dynamically set the express router endpoint
        router[method](endpointUrl, action)
      })
  })

  // send to main index file which tells app (main express) to use routes
  return router
}

export default routeCreator
