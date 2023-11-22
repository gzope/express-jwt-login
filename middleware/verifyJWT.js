import jwt from "jsonwebtoken";
import 'dotenv/config';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(403);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {console.log(err);
                 if(err.message==='jwt expired')
                 {
                    return res.status(403).send('Invalid token');
                 }
                 else{
                 return res.status(401).send('Invalid token');
                 }
                } //invalid token
            // req.user = decoded.username;
            console.log('token verified');
            next();
        }
    );
}

export default verifyJWT;

