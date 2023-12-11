import express from "express";
import cors from "cors";
import 'dotenv/config';
import verifyJWT from "./middleware/verifyJWT.js";
import getContact from "./api/getContact.js";
import getAbout from "./api/getAbout.js";
import getTokenRefresh from "./api/getTokenRefresh.js";
import cookieParser from "cookie-parser";
import getPublicKey from "./api/getPublicKey.js";
import getLogin from "./api/getLogin.js";


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



app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.post('/test', (req, res) => {
  res.json({'jack':'sparrow'});
});


app.post('/login',getLogin);
app.get('/getTokenRefresh',getTokenRefresh);

app.use(verifyJWT);

/****Authenticated Services */
app.post('/getPublicKey',getPublicKey);
app.post('/getAbout',getAbout);
app.post('/getContact',getContact);




app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
  })