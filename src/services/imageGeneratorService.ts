import { loadImage } from 'canvas'
import { canvas, context } from '../config/canvas/canvasConfig';
import { getStickersDimensions } from './writeStickersService'
import path from 'path';
import { formatNames, getInitialDimensionsOfNames, writeNames } from './writeNamesService';

const checkLimitOfColumns = (limitOfColumns: number, index: number): boolean => {
    const result = ((index + 1) % limitOfColumns === 0) ? true : false
    
    return result;
}

const getDimensionsWhenLineBreak = (dx: number, dy: number, verticalProximityStickers: number,
    stickersHeight: number, namesDY: number, namesDYBase: number, initialBorder: number): any => {
    dx = initialBorder;
    dy += stickersHeight - verticalProximityStickers;
    namesDY += stickersHeight - verticalProximityStickers;
    namesDYBase = namesDY;

    return { dx, dy, namesDY, namesDYBase };
}

async function generateImage(sickNames: string[]) {
    loadImage(path.resolve("./src/assets/wallpaper.png")).then(async (image) => {
        context.drawImage(image, 0, 0, 1920, 1080);

        loadImage(path.resolve("./src/assets/sticker.png")).then(async (image) => {
            sickNames.length = sickNames.length > 30 ? 30 : sickNames.length;

            let { initialBorder,
                limitOfColumns,
                dx, dy,
                stickersWidth, stickersHeight,
                horizontalProximityStickers, verticalProximityStickers } = getStickersDimensions(sickNames);
            let { namesDX, namesDY, fontSize, lineBreakSize } = getInitialDimensionsOfNames(sickNames);
            let namesDYBase = namesDY;
            let splittedArray: string[]

            for (let i = 0; i < sickNames.length; i++) {
                context.drawImage(image, dx, dy, stickersWidth, stickersHeight);

                splittedArray = sickNames[i].split(" ");
                const formattedNames: string[] = formatNames(sickNames, splittedArray, namesDX, namesDY, fontSize);

                writeNames(formattedNames, fontSize, dx, namesDX, namesDY, sickNames[i], lineBreakSize, context);

                namesDY = namesDYBase;
                const isColumnLimit: any = checkLimitOfColumns(limitOfColumns, i);

                if (isColumnLimit) {
                    const newDimensions: any = getDimensionsWhenLineBreak(dx, dy, verticalProximityStickers,
                        stickersHeight, namesDY, namesDYBase, initialBorder);
                    dx = newDimensions.dx;
                    dy = newDimensions.dy;
                    namesDY = newDimensions.namesDY;
                    namesDYBase = newDimensions.namesDY;
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