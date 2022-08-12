import { promises } from 'fs'
import { createCanvas, loadImage } from 'canvas'
import { v4 as uuidv4 } from 'uuid'
import { getStickersDimensions } from './writeStickersService'

// É como se fosse a prancheta que vamos desenhar, deve ter o tamanho final desejado para sua imagem
const canvas = createCanvas(1920, 1080);
const context = canvas.getContext('2d');
context.quality = 'best';
context.fillStyle = '#000000';
context.textAlign = "center";

async function generateImage(sickNames: string[]) {
    // const fileName = `${uuidv4()}.png`;
    let bigNames: string[] = []

    loadImage('/home/isaque/Documentos/Projects/PlanningCenter/src/assets/wallpaper.png').then(async (image) => {
        context.drawImage(image, 0, 0, 1920, 1080);

        loadImage("/home/isaque/Documentos/Projects/PlanningCenter/src/assets/sticker.png").then(async (image) => {
            // garantir o maximo de 30 nomes
            sickNames.length = sickNames.length > 30 ? 30 : sickNames.length;

            //pegar dimensoes dos adesivos
            let { initialBorder,
                limitOfColumns,
                dx, dy,
                stickersWidth, stickersHeight,
                horizontalProximityStickers, verticalProximityStickers } = getStickersDimensions(sickNames);

            // dimensoes dos nomes
            let namesFrontStickers = 220, namesDY = 360, fontSize = 28, namesDYBase;

            // atualizar o DY dos nomes de acordo com o tamanho 
            if (sickNames.length === 1) { namesDY = 640; }
            else if (sickNames.length < 10) { namesDY = 445; }
            else if (sickNames.length < 17) { namesDY = 423; }
            else if (sickNames.length < 16) { namesDY = 423; }
            else { namesDY = 365; }

            namesDYBase = namesDY;

            for (let i = 0; i < sickNames.length; i++) {
                context.drawImage(image, dx, dy, stickersWidth, stickersHeight);

                // Escrever os nomes

                if (sickNames.length === 1) {
                    namesFrontStickers = 255;
                    if (sickNames[i].length < 15) {
                        fontSize = 37;
                    } else {
                        const splittedArray = sickNames[i].split(" ");
                        // Ex: "fulano de araújo 
                        if (splittedArray.length > 2) {
                            splittedArray[1] += " " + splittedArray[2];
                            splittedArray.pop();
                            bigNames = splittedArray;
                            // sickNames[i] = splittedArray;
                            fontSize = 37;
                            namesDY -= 19;
                            namesFrontStickers = 255;
                        } else {
                            // Ex: Fulano Araújo
                            bigNames = splittedArray;
                            // sickNames[i] = splittedArray;
                            fontSize = 37;
                            namesDY -= 19;
                            namesFrontStickers = 255;
                        }
                    }
                } else if (sickNames.length === 2) {
                    namesFrontStickers = 255;
                    if (sickNames[i].length < 15) {
                        fontSize = 37;
                        namesDY += 170;
                    } else {
                        const splittedArray = sickNames[i].split(" ");
                        // Ex: "fulano de araújo 
                        if (splittedArray.length > 2) {
                            splittedArray[1] += " " + splittedArray[2];
                            splittedArray.pop();
                            bigNames = splittedArray;
                            // sickNames[i] = splittedArray;
                            fontSize = 37;
                            namesDY += 160;
                            namesFrontStickers = 255;
                        } else {
                            // Ex: Fulano Araújo
                            bigNames = splittedArray;
                            // sickNames[i] = splittedArray;
                            fontSize = 37;
                            namesDY += 160;
                            namesFrontStickers = 255;
                        }
                    }
                }
                else if (sickNames.length < 17) {
                    if (sickNames[i].length < 15) {
                        namesFrontStickers = 220;
                        fontSize = 32;
                    } else if (sickNames[i].length === 15 || sickNames[i].length === 16) {
                        namesFrontStickers = 223;
                        fontSize = 30;
                    } else {
                        const splittedArray = sickNames[i].split(" ");
                        // Ex: "fulano de araújo 
                        if (splittedArray.length > 2) {
                            splittedArray[1] += " " + splittedArray[2];
                            splittedArray.pop();
                            bigNames = splittedArray;
                            // sickNames[i] = splittedArray;
                            fontSize = 30;
                            namesDY -= 19;
                            namesFrontStickers = 220;
                        } else {
                            // Ex: Fulano Araújo
                            bigNames = splittedArray;
                            // sickNames[i] = splittedArray;
                            fontSize = 30;
                            namesDY -= 19;
                            namesFrontStickers = 220;
                        }
                    }
                } else if (sickNames.length < 26) {
                    const splittedArray = sickNames[i].split(" ");
                    // Ex: "fulano de araújo 
                    if (splittedArray.length > 2) {
                        splittedArray[1] += " " + splittedArray[2];
                        splittedArray.pop();
                        bigNames = splittedArray;
                        // sickNames[i] = splittedArray;
                        fontSize = 30;
                        namesDY -= 27;
                        namesFrontStickers = 220;
                    } else {
                        // Ex: Fulano Araújo
                        bigNames = splittedArray;
                        // sickNames[i] = splittedArray;
                        fontSize = 30;
                        namesDY -= 27;
                        namesFrontStickers = 220;
                    }
                    namesFrontStickers = 200;
                    fontSize = 28
                }
                else if (sickNames.length < 31) {
                    namesFrontStickers = 197;
                    if (sickNames[i].length > 14) {
                        const splittedArray = sickNames[i].split(" ");
                        // Ex: "fulano de araújo 
                        if (splittedArray.length > 2) {
                            splittedArray[1] += " " + splittedArray[2];
                            splittedArray.pop();
                            bigNames = splittedArray;
                            // sickNames[i] = splittedArray;
                            fontSize = 30;
                            namesDY -= 20;
                            namesFrontStickers = 200;
                        } else if (splittedArray.length === 2) {
                            // Ex: Fulano Araújo
                            bigNames = splittedArray;
                            // sickNames[i] = splittedArray;
                            fontSize = 30;
                            namesDY -= 20;
                            namesFrontStickers = 200;
                        }
                        else {
                            fontSize = 28;
                        }
                    } else {
                        fontSize = 32;
                    }
                }

                context.font = `${fontSize}px Mont Serrat`;
                if (typeof sickNames[i] === "string") context.fillText(sickNames[i], (dx + namesFrontStickers), namesDY);
                // else {
                //     for (let name of sickNames[i]) {
                //         context.fillText(name, (dx + namesFrontStickers), namesDY);
                //         namesDY += 40;
                //     }
                // }

                if (bigNames.length !== 0) {
                    for (let name of bigNames) {
                        context.fillText(name, (dx + namesFrontStickers), namesDY);
                        namesDY += 40;
                        bigNames.shift();
                    }
                }

                namesDY = namesDYBase;

                if ((i + 1) % limitOfColumns === 0) {
                    dx = initialBorder;
                    dy += stickersHeight - verticalProximityStickers;
                    namesDY += stickersHeight - verticalProximityStickers;
                    namesDYBase = namesDY;
                    continue;
                } else {
                    if (sickNames.length === 1) { namesDY = 640; }
                }



                dx += stickersWidth - horizontalProximityStickers;
            }
        })
    })

    return canvas;
}

export default generateImage;