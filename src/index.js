import express from "express";
import { PORT } from "./config/server-config.js";
import connectToDB from "./config/db-config.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use('/api', apiRoutes);

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