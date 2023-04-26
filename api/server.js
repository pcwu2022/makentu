import express from 'express';
import cors from 'cors';

const app = express();

// constants
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Backend!");
});

// listen on port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});