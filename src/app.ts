import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { getDescription } from "./services/base.api.planningCenter"
import { generateURL } from "./services/URLProvider";
const server: express.Application = express();
import generateImage from './services/imageGeneratorService'
import { convertDescriptionToArray } from "./utils/arrayUtils";

server.get('/generate/image', async (req, res) => {
    const url: string = await generateURL();
    const description = await getDescription(url);
    if (description.length === 0) return res.status(404).send({ message: "Não tem nenhum registro para hoje." });

    try {
        const canvas = await generateImage([
            'Lindemberguil Correia',
            'Familia Júnior Amorim',
            'Antonio Pinheiro',
            'Marli',
            'Noelia',
            'Singlair Martins',
            'Maria Nascimento',
            'Jane Nascimento',
            'Ozias Nascimento',
            'Luzimar de Fatima',
            'Maria Celine',
            'Ricardo Menezes',
            'José Alves', 'Lindemberguildso Correia',
            'Marlene Martins',
            'Antonio Pinheiro',
            'Marli',
            'Noelia',
            'Singlair Martins',
            'Maria Nascimento',
            'Jane Nascimento',
            'Ozias Nascimento',
            'Luzimar de Fatima',
            'Maria Celine',
            'Ricardo Menezes',
            'José Alves',            'Luzimar de Fatima',
            'Maria Celine',
            'Ricardo Menezes',
            'José Alves'
        ]);
        const pngData = canvas.createPNGStream();

        res.setHeader("Content-Disposition", `attachment; filename=mural_de_oracao`);
        pngData.pipe(res);
    } catch (error: any) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: "Erro ao gerar imagem" }));
    }
})

server.listen(process.env.PORT, () => {
    console.log(`Aplication is running on port ${process.env.PORT}`);
});