import jwt from "jsonwebtoken";
import 'dotenv/config';

const getTokenRefresh = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(405);

    let refreshToken=cookies?.jwt;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {console.log(err); return res.status(401).send('Invalid refresh token');} //invalid token
            req.user = decoded.username;
            console.log('token verified');
            
            var accesstoken = jwt.sign( { user: req.user}, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' });
            res.status(200).json({accesstoken});  
        }
    );
    
}

export default getTokenRefresh;

