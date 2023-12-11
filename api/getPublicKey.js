import getKeys from "../service/getKeys.js";
import store from 'store';
import jwt from "jsonwebtoken";

const getPublicKey = (req, res) => {
 
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const keys = getKeys();
    store.set(decoded.user,keys);  
    //const keyPair=store.get(decoded.user);
    if (keys) {
        res.status(200).json({'publicKey':keys.publicKey})
    }
    else{
        res.status(500);
    }    
    
}
export default getPublicKey;