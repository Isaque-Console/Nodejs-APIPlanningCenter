"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = (0, express_1.default)();
const imageGeneratorService_1 = __importDefault(require("./services/imageGeneratorService"));
const arrayUtils_1 = require("./utils/arrayUtils");
server.get('/generate/image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const url: string = await generateURL();
    // const description = await getDescription(url);
    // if (description.length === 0) return res.status(404).send({ message: "Não tem nenhum registro para hoje." });
    try {
        // const image = await generateImage(convertDescriptionToArray(description));
        const image = yield (0, imageGeneratorService_1.default)((0, arrayUtils_1.convertDescriptionToArray)(`Pr. Iltemar Silva

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
    }
    catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: "Erro ao gerar imagem" }));
    }
}));
server.listen(process.env.PORT, () => {
    console.log(`Aplication is running on port ${process.env.PORT}`);
});
