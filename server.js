import express from "express";
import cors from "cors";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import verifyJWT from "./middleware/verifyJWT.js";
import getContact from "./api/getContact.js";
import getAbout from "./api/getAbout.js";
import getTokenRefresh from "./api/getTokenRefresh.js";
import cookieParser from "cookie-parser";

const port = 4000;
const app = express();
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('hello world');
});
 
//app.use(cors());
console.log(process.env.UI_ORIGIN);
//app.use(cors({credentials: true, origin: process.env.UI_ORIGIN}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});


// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// });

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.post('/login',(req, res)=>{
    const user=req.body?.user;
    const pass=req.body?.pass;
    if (!user && !pass)
    {
        res.status(401).send('User name and password is mandatory');    
    }

    if (user==='AAA' && pass==='AAA')
    {  
        var accesstoken = jwt.sign( { user: 'user'}, 
                                    process.env.ACCESS_TOKEN_SECRET,
                                    { expiresIn: '10s' });
        
        var refreshtoken = jwt.sign( { user: 'user'}, 
                                     process.env.REFRESH_TOKEN_SECRET,
                                     { expiresIn: '300s' });
        res.cookie('jwt', refreshtoken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });                                     
        res.status(200).json({accesstoken});                             
    }
    else{
        res.status(401).send('Invalid User or password');
    }
 
});

app.get('/getTokenRefresh',getTokenRefresh);
app.use(verifyJWT);
app.post('/getAbout',getAbout);
app.get('/test', (req, res) => {
    res.send('hello world');
  });

app.post('/getContact',getContact);




app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
  })