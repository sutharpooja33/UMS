import express, { Request, Response } from "express";
import * as database from './database';
import router from './routes/router';
import cors from 'cors';
import * as bodyParser from "body-parser";

const app = express();

// Parse JSON 
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Hello, this is Node.js app."
    })
})

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

database.getConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors()); 
app.use(router());
