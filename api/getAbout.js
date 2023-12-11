import CryptoJS from "crypto-js";
import nodeRSA  from "node-rsa";
import store from 'store';
import jwt from "jsonwebtoken";

const getAbout = (req, res) => {
    console.log(req.body);
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    let aesKey=req.body.key;
    store.each(function(value, key) {
        console.log(key, '==', value)
    })
   
    var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
    console.log('decoded.user',decoded.user);   
    let keyPair = store.get(decoded.user);
  
    console.log('keyPair',keyPair);
    const key = new nodeRSA(keyPair.privateKey);

    aesKey = key.decrypt(aesKey, 'utf8');
    console.log('aesKey',aesKey);


    let cipherText=req.body.encryption;
    var bytes  = CryptoJS.AES.decrypt(cipherText, aesKey);
    var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(originalText);
    
    let response ='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(response),aesKey).toString();
    res.status(200).json({data:encrypted});
}

export default getAbout;

