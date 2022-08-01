import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { getDescription } from "./services/base.api.planningCenter"
import { generateURL } from "./services/URLProvider";
const server: express.Application = express();

(async () => {
    const url: string = await generateURL();
    console.log(url);
    getDescription(url);
})()

server.listen(process.env.PORT, () => {
    console.log(`Aplication is running on port ${process.env.PORT}`);
});