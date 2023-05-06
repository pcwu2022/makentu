import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import apihandler from './scripts/apihandler.js';

const app = express();

// constants
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(fileUpload());


app.get('/getdata/:action', apihandler.getData);

app.get('/image/:action', apihandler.getImage);

app.post('/postdata/:action', apihandler.postData);

app.get('/feed', apihandler.feed);

app.get('*', (req, res) => {
    res.send({message: "Hello, welcome to the backend port."});
});
app.post('*', (req, res) => {
    res.send({message: "Hello, welcome to the backend port."});
});

// listen on port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// import activitiesRouter from "./routes/activity.js"//前端在call時所需要的前綴

// app.use("/activities", activitiesRouter);