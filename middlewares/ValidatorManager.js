import { validatorResults } from "./ValidatorResults.js";
import { body } from "express-validator";


export const signUpValidation = [
  body("email_user","Email en formato incorrecto").trim().isEmail(),
  body("password_user","Contraseña con pocos caracteres").isLength({
    min: 15,
  }),
  validatorResults,
];


export const loginValidation = [
  body("email_user","Email en formato incorrecto").trim().isEmail(),
  body("password_user","Contraseña con pocos caracteres").isLength({
    min: 15,
  }),
  validatorResults,
];

