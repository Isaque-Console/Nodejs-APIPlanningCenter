import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { getDescription } from "./controllers/base.api.planningCenter"
import { generateURL } from "./controllers/URLProvider";
const server: express.Application = express();

generateURL();
// getDescription();

server.listen(process.env.PORT, () => {
    console.log(`Aplication is running on port ${process.env.PORT}`);
});