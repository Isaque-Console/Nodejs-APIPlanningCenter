import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { getDescription } from "./services/base.api.planningCenter"
import { generateURL } from "./services/URLProvider";
const server: express.Application = express();
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import generateImage from './services/imageGeneratorService'
import { convertDescriptionToArray } from "./utils/arrayUtils";

// const __filename = fileURLToPath(import.meta.url);
// const directory = path.dirname(__filename);

// (async () => {
//     const url: string = await generateURL();
//     getDescription(url);
// })()

server.get('/generate/image', async (req, res) => {
    const url: string = await generateURL();
    const description = await getDescription(url);
    if (description.length === 0) return res.send({message: "Não tem nenhum registro para hoje."})    

    const canvas = await generateImage(convertDescriptionToArray(description));
    const pngData = canvas.createPNGStream()

    // set response header: Content-Disposition
    res.setHeader("Content-Disposition", `attachment; filename=mural_de_oracao`);
    pngData.pipe(res);
})

server.listen(process.env.PORT, () => {
    console.log(`Aplication is running on port ${process.env.PORT}`);
});