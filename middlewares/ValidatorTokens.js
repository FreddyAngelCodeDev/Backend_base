import jwt from 'jsonwebtoken';

export async function verifyValidationToken(req, res, next){

    const JwtToken = req.headers.authorization;

    if (!JwtToken) {
      return res
        .status(401)
        .send({ auth: false, message: "No Token aws Provided" });
    }

    
    let token = req.headers.authorization.replace(/['"]+/g, "");
    token = JwtToken.replace("Bearer ", "");
    // decode the token
    const decoded = await jwt.verify(token, process.env.Jwt_Secret);

    // save the token on request object to using on routes
    req.userId = decoded.id;

   
    // continue with the next function
    next();

}