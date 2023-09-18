//Paquetes 
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import "dotenv/config";
import './config/db.config.js';
import UserRoutes from './routes/User.routes.js';
import PostRoutes from "./routes/post.routes.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from 'cors';

//Inicializaciones
 const App = express();
    const DIRECTORIO_PERMITIDO_CORS = "http://localhost:4200";


//settigns
App.set('port', process.env.PORT || 2224);


//Middlewares
App.use(cors());
App.use(morgan('dev'));
App.use(helmet());
App.use(express.json());
App.use(express.urlencoded({extended: true}));
App.use(bodyParser.json());
App.use(cookieParser());



//ROUTES
App.use('/Api/User', UserRoutes);
App.use('/Api/Post', PostRoutes);
   
//Servidor
App.listen(App.get('port'), ()=>{
    console.log("Hola mundo", App.get('port'));
})

