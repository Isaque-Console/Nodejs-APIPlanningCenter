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
const base_api_planningCenter_1 = require("./services/base.api.planningCenter");
const URLProvider_1 = require("./services/URLProvider");
const server = (0, express_1.default)();
const imageGeneratorService_1 = __importDefault(require("./services/imageGeneratorService"));
const arrayUtils_1 = require("./utils/arrayUtils");
server.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "Hello world!" });
}));
server.get('/generate/image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = yield (0, URLProvider_1.generateURL)();
    const description = yield (0, base_api_planningCenter_1.getDescription)(url);
    if (description.length === 0)
        return res.status(404).send({ message: "Não tem nenhum registro para hoje." });
    try {
        const image = yield (0, imageGeneratorService_1.default)((0, arrayUtils_1.convertDescriptionToArray)(description));
        const pngData = image.createPNGStream();
        res.setHeader("Content-Disposition", `attachment; filename=mural_de_oracao.png`);
        pngData.pipe(res);
    }
    catch (error) {
        // res.setHeader('Content-Type', 'application/json');
        // res.send(JSON.stringify({ error: "Erro ao gerar imagem" }));
    }
}));
server.listen(process.env.PORT, () => {
    console.log(`Aplication is running on port ${process.env.PORT}`);
});
