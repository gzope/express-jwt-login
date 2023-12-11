import nodeRSA  from "node-rsa";

const getKeys = () => {
     
    const key = new nodeRSA({b:512});
    let publicKey = key.exportKey('public');
    let privateKey = key.exportKey('private');

    return {publicKey:publicKey,privateKey: privateKey}
   
}
export default getKeys;