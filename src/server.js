import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
require('dotenv').config();
import cors from 'cors'

let app = express();
app.use(cors({ credentials: true, origin: true }));
//config app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

viewEngine(app)
initWebRoutes(app)

let port = process.env.PORT | 6969
app.listen(port, ()=>{
    //call back function
    console.log('backend nodejs is running in port ',port);
})
