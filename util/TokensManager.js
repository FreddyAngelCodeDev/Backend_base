import JWT from "jsonwebtoken";

//Funcion que genera el JwT
//Se rquiere pasar el Id del usuario (Uid). Para generar el Jwt
export const generateTokens = (Uid) => {
  const expiresIn = 60 * 15; //Token expira en 15 minutos
  try {
    const jwt = JWT.sign({ Uid }, process.env.Jwt_Secret); //Constante donde se guarda el Jwt ya generado por el metodo de la libreria "jsonwebtoken". Como primer parametro se establece el id ya requerido del registro o inicio de sesion, y como segundo parametro la llave secreta.
    return jwt; //Retorno del token
  } catch (error) {
    return res.status(500).json({ error: "Error en al generar Token" });
  }
};


//Funcion que convierte el Jwt a el id del Usuario. 
//Se requiere pasar el Jwt (JwtToken). Para su verificacion y decodificacion
export const VerifyTokenConvertId = (JwtToken) => {
  // Decodificacion del JWT
  const decoded = JWT.verify(JwtToken, process.env.Jwt_Secret);
  // Retorno del ID del Usuario
  return decoded.Uid;
};


