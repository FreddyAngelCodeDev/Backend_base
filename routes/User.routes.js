import express from "express";
import { GetMeUser, LoginUser, SignUpUser, UpdateSignUpUser } from "../controllers/User.controller.js";
import { loginValidation, signUpValidation } from "../middlewares/ValidatorManager.js";
import { verifyValidationToken } from "../middlewares/ValidatorTokens.js";

const router = express.Router();

//Ruta es para iniciar seccion.
//Esta ruta tiene un middleware de validacion de campos(Hay que actualizarla)
router.post('/login', loginValidation ,LoginUser); 

//Ruta de registro de usuario
//Esta ruta tiene un middleware de validacion de campos(Hay que actualizarla)
router.post('/signup', signUpValidation , SignUpUser);

//Ruta es la finalizacion del registro.
router.put("/signupUpdate", UpdateSignUpUser);//Ruta

//Ruta para obtener los datos del usuario. 
//Esta ruta requiere el Jwt para su permiso utilizando el middleware "validatorTokens.js"
router.get("/me", verifyValidationToken, GetMeUser);



export default router;