import mongooseDB from "mongoose";
import 'dotenv/config';

mongooseDB.connect(process.env.Url_db,
    { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(()=> console.log('conectado a mongodb')) 
    .catch(e => console.log('error de conexión', e));
