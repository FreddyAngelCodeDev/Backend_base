import { PostUser } from "../models/Post.js";
import { Users } from '../models/Users.js';
import { VerifyTokenConvertId } from "../util/TokensManager.js";

export const createPost = async(req, res) => {
    const JwtToken = req.headers.authorization; //Constante donde se guarda el Jwt Que requerimos

    if (!JwtToken) {
      return res
        .status(401)
        .send({ auth: false, message: "No Token aws Provided" });
    } //Validacion de la existencia del token. Si es falso no dejara realizar los procesos
  
    let token = req.headers.authorization.replace(/['"]+/g, "");
    token = JwtToken.replace("Bearer ", "");
    const Id_User = VerifyTokenConvertId(token);

    const { descripcion } = req.body;//Peticion de los datos del usuario
    const post = new PostUser({autor_User:Id_User,descripcion});
    await post.save(); 

    const users = await Users.findOne({ _id: Object(Id_User) });
    users.post_User = users.post_User.concat(post)
    users.save()

    return res.status(200).json(post.descripcion);
};

export const getPost = async (req, res) => {
    //Constante donde se guarda el Jwt Que requerimos
    const JwtToken = req.headers.authorization;
    
   if (!JwtToken) {return res.status(401).send({ auth: false, message: "No Token aws Provided" });
   } //Validacion de la existencia del token. Si es falso no dejara realizar los procesos
 
   let token = req.headers.authorization.replace(/['"]+/g, "");
   token = JwtToken.replace("Bearer ", "");
   const Id_User = VerifyTokenConvertId(token);

    const posts = await Users.findOne({ _id: Object(Id_User) }).populate("post_User");
    return res.status(200).json(posts.post_User);
};
export const putPost = (req, res) => {};

export const deletePost = (req, res) => {};
