import express from 'express'
import { APP_PORT,DB_URL} from './config'
import errorHandler from './middlewares/errorHandlers';
import routes from './routes'
import path from 'path';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
import databaseconnection from './db'
import graphqlconfig from './graphql/schema/configuration';





global.appRoot = path.resolve(__dirname)
const app = express()
app.use(express.urlencoded({extended:false})) // multipartform data
app.use(express.json()) //user for json response enabled
app.use('/api',routes);
app.use('/uploads',express.static('uploads'))
app.use(errorHandler)


app.use('/graphql',(req,res)=>{graphqlconfig(req,res)})
app.listen(APP_PORT,()=> console.log(`listening port ${APP_PORT}`))