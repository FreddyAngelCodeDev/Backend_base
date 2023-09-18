import {Users} from '../models/Users.js'; //Esquema Modelo del usuario de MongoDB
import bcryptjs from 'bcryptjs'; //Dependecia De encriptacion "Bcryptjs"
import {generateTokens} from '../util/TokensManager.js';
import { VerifyTokenConvertId } from "../util/TokensManager.js";


//Funcion de Inicio de sesion
export const LoginUser = async (req, res)=>{
    const {email_user,  password_user} = req.body; //Peticion de los datos del usuario

  try {
    const users = await Users.findOne({email_user}); //Validacion de la existencia del correo
    if(!users) return res.status(403).json({error: "Este Usuario no existe"}); //Retorno del fllo de la peticion si no existe el correo
    
    const Validationpass = await bcryptjs.compare(password_user, users.password_user); //Comparacion de Contraseña

    if(!Validationpass)  //Validacion de la comparacion de contraseñas
    return res.status(403).json({error: "Contraseña incorrecta"}); //Retorno del fllo de la peticion 

    const jwt = generateTokens(users.id);//Generadndo el Jwt
      res.json(jwt);
  } catch (error) {
    
  }
}

//Funcion de Regstro
export const SignUpUser = async (req, res)=>{
  const { name_user, lastname_user,email_user, password_user} = req.body;
        try {
          //Peticion de los datos del usuario
          const users = new Users({name_user, lastname_user,email_user, password_user});
          await users.save(); //Guarda en la base de datos el ususario

          const jwt = generateTokens(users.id); //Utilizando el Util TokensManager Genera el token con el id
          res.json(jwt); // Responde el JWT al FrontEnd
        } catch (error) {
          return res.status(500).json({error: "Error en el sistema"});
        }
}

// Funcion de obtencion de datos del Usuario
export const GetMeUser = async (req, res )=>{
    const JwtToken = req.headers.authorization; //Constante donde se guarda el Jwt Que requerimos

    if (!JwtToken) {
      return res
        .status(401)
        .send({ auth: false, message: "No Token aws Provided" });
    } //Validacion de la existencia del token. Si es falso no dejara realizar los procesos

    let token = req.headers.authorization.replace(/['"]+/g, "");
    token = JwtToken.replace("Bearer ", "");
    const Id_User = VerifyTokenConvertId(token);//Esta constante guarda el Id extraida del la funcionde TokensManager

    const users = await Users.findOne({ _id: Object(Id_User) }); //Buscar el Usuario por el id filtrada del TokenManger

    return res.status(200).json(users);// Retorno del Un Status:200 "ok", y envio json de los datos del ususario.
}


export const UpdateSignUpUser = async (req, res )=>{
  const JwtToken = req.headers.authorization; //Constante donde se guarda el Jwt Que requerimos

  if (!JwtToken) {
    return res
      .status(401)
      .send({ auth: false, message: "No Token aws Provided" });
  } //Validacion de la existencia del token. Si es falso no dejara realizar los procesos

  let token = req.headers.authorization.replace(/['"]+/g, "");
  token = JwtToken.replace("Bearer ", "");
  const Id_User = VerifyTokenConvertId(token); //Esta constante guarda el Id extraida del la funcionde TokensManager

  const { name_id_user } = req.body; //Constantes que se requieron para la actualizacion

  //Esta es la actualizacion del usuario utilizando la libreria de Moongose, como primer parametrose ása el id del usuario utilizando el Util TokensManager y como segundo parametro se pasa los campos a actualizar.
  await Users.findOneAndUpdate({ _id: Object(Id_User) }, { name_id_user });

  // Retorno del Un Status:200 "ok" y validacion de que todo salio bien.
  return res.sendStatus(200);
}


