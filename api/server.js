import express from 'express';
import cors from 'cors';

import apihandler from './scripts/apihandler.js';

const app = express();

// constants
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


app.get('/getdata/:action', apihandler.getData);

app.post('/postdata/:action', apihandler.postData);

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