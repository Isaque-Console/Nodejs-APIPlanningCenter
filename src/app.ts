import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { getDescription } from "./services/base.api.planningCenter"
import { generateURL } from "./services/URLProvider";
const server: express.Application = express();
import generateImage from './services/imageGeneratorService'
import { convertDescriptionToArray } from "./utils/arrayUtils";

server.get('/', async (_req, res, _next) => {
	// optional: add further things to check (e.g. connecting to dababase)
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e: any) {
		healthcheck.message = e;
		res.status(503).send();
	}
});

server.get('/generate/image', async (req, res) => {
    const url: string = await generateURL();
    const description = await getDescription(url);
    if (description.length === 0) return res.status(404).send({ message: "Não tem nenhum registro para hoje." });

    try {
        const image = await generateImage(convertDescriptionToArray(description));
        const pngData = image.createPNGStream();

        res.setHeader("Content-Disposition", `attachment; filename=mural_de_oracao.png`);
        pngData.pipe(res);
    } catch (error: any) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: "Erro ao gerar imagem" }));
    }
})

server.listen(process.env.PORT, () => {
    console.log(`Aplication is running on port ${process.env.PORT}`);
});