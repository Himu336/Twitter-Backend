import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./config/server-config.js";
import connectToDB from "./config/db-config.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.get('/ping', (req, res) => {
    return res.json({
        message: 'Twitter Backend is live'
    })
});

app.listen(PORT, async () => {
    console.log(`Server started at PORT: ${PORT}`);
    await connectToDB();
    console.log('Connected to the DB server');
});