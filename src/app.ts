import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { getDescription } from "./services/base.api.planningCenter"
import { generateURL } from "./services/URLProvider";
const server: express.Application = express();
import generateImage from './services/imageGeneratorService'
import { convertDescriptionToArray } from "./utils/arrayUtils";

server.get('/generate/image', async (req, res) => {
    // const url: string = await generateURL();
    // const description = await getDescription(url);
    // if (description.length === 0) return res.status(404).send({ message: "Não tem nenhum registro para hoje." });

    try {
        // const image = await generateImage(convertDescriptionToArray(description));
        const image = await generateImage(convertDescriptionToArray(`Pr. Iltemar Silva

        Enfermos:
        - Teste
        - Lorem ipsum
        - dolor sit
        
        Motivo 2:
        - amet
        consectetur adipiscing elit.
        - Donec vitae
        - accumsan ex.
        - In et nibh sed
        - dui sagittis dictum. Fusce rutrum sit amet nisl vel consequat. Sed tristique mauris eu metus laoreet volutpat et a ex. In sapien elit, facilisis ut nisi a, varius sodales est. Aenean consequat, augue vitae interdum molestie, odio odio tincidunt risus, nec pellentesque risus lacus a metus. Mauris luctus sapien vitae nisl suscipit, id tempor lorem molestie. Aenean interdum laoreet finibus. Suspendisse scelerisque tristique porta. Sed facilisis, erat id sollicitudin mattis, eros leo tempus diam, a placerat magna odio in sapien. In consequat posuere lacus, a ullamcorper libero rutrum semper.`));

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