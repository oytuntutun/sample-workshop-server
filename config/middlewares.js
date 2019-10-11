import helmet from 'helmet'
import bodyParser from 'body-parser'
import jwt from 'express-jwt'
import config from './'

export default app => {
  // always does auth with JWT, except the paths you write below
  app.use(
    jwt({secret: config.JWT_SECRET})
      .unless({
        // we have no JWT in login/signup etc. routes
        // so we tell app not to try auth with JWT
        path: [
          '/users/login',
          '/users/signup'
        ]
      })
  )
  app.use(bodyParser.json())
  app.use(helmet()) // for some out of the box security
}
