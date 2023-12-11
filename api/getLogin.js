import jwt from "jsonwebtoken";
const getLogin = (req, res) => {
    const user=req.body?.user;
    const pass=req.body?.pass;
    if (!user && !pass)
    {
        res.status(401).send('User name and password is mandatory');    
    }

    if (user==='AAA' && pass==='AAA')
    {  
        var accesstoken = jwt.sign( { 'user': user}, 
                                    process.env.ACCESS_TOKEN_SECRET,
                                    { expiresIn: '10s' });
        
        var refreshtoken = jwt.sign( { 'user': user}, 
                                     process.env.REFRESH_TOKEN_SECRET,
                                     { expiresIn: '300s' });                                   
        res.cookie('jwt', refreshtoken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });                                     
        res.status(200).json({accesstoken});                             
    }
    else{
        res.status(401).send('Invalid User or password');
    }
}

export default getLogin;

