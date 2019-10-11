# Server Boilerplate
This repo is an opinionated approach for a scalable back-end API with auth (with JWT)
All the endpoints are generated automatically from API folders and files. You heard it right!

DISCLAIMER: This repository is just showing how to automate this process. Feel free to extend the routeCreator (read more below to see what it does currently) to support v1, v2 etc. based on your needs. The function is well documented.

WARNING: Don't forget to validate the data coming to your endpoints. I did not include anything for security except auth with JWT, which is NOT enough.

## Features

- [x] Cors
- [x] .env with dotenv
- [x] Working signup / login routes
- [x] Save/validate hashed password (bcrypt)
- [x] Socket.io
- [x] JWT auth to all endpoints (except excluded ones in config) and socket connection
- [x] Todos - sends todo to all connected clients

## Server usage

To create a new endpoint, all you have to do is create a folder, and put each endpoint as a js file. `lib/routeCreator` handles everything else. That's right!

That's all you have to do! How it works?

lib/routeCreator.js reads every folder in API, loops in them
then for each file dynamically generates endpoints

Lets say folder name is todos and file name is add and method is post. It results in a post endpoint at APP_URL/todos/add

Endpoint file example (todos/add.js):

```
  import { Todo } from '../../models'
  import { io } from '../../'

  async function action(req, res) {
    const { io } = req.app // io exists in every endpoint automatically
    const { text, _id } = req.body

    const todo = new Todo({
      _id,
      text,
      createdBy: req.user.id // for logged in users, req.user is always there.
    })

    await todo.save()

    // send todo to all connected users
    io.to('all-users').emit('newTodo', todo)

    // tell the current user it was successful (or send other the data if you want)
    res.send(true)
  }

  const add = {
    method: 'post', // change this to the correct router method (post, get etc...)
    action,
    // if its a get request and you want to have an endpoint like todos/getDetails/:id, use params. otherwise no need to have params
    params: '/:id' // use it with the slash
  }

  export default add
```

For GET request, alternatively you can name the file like :param, which will result in a get endpoint with URL params.

Example:

```
  fileName: :id.js // in todos folder
  result: API_URL/todos/:id // get endpoint
```

## Config

Clone and do npm i

Then, create a file named .env at the root of the project folder

The .env file should contain the following variables (for localhost)

```
DB_URL=mongodb://localhost:27017/
JWT_SECRET=YOURJWTSECRET
```

Other than this, you need to have mongo installed locally.
Follow [this](https://docs.mongodb.com/v3.2/administration/install-community/) if you haven't done so.

Alternatively, you can quickly create an account in [mongodb](http://mongodb.com/) and use the DB from there. There is a sandbox tier (free).

## Running

If you have the DB locally, do `mongod` in terminal, then run the project `npm start`, or just `npm start` if you used mongodb.com
