import { fixBigStrings, getSecondName } from "../utils/arrayUtils";

export const writeNames = (formattedNames: string[], fontSize: number, dx: number, namesFrontStickers: number, namesDY: number, sickName: string, lineBreakSize: number, context: any) => {
    if (formattedNames.length !== 0) {
        for (let name of formattedNames) {
            context.font = `500 ${fontSize}px RobotoFlex`;
            const fixedName = fixBigStrings(name);
            context.fillText(fixedName, (dx + namesFrontStickers), namesDY);
            namesDY += lineBreakSize;
        }
        formattedNames = [];
    } else {
        context.font = `500 ${fontSize}px RobotoFlex`;
        const fixedName = fixBigStrings(sickName);
        context.fillText(fixedName, (dx + namesFrontStickers), namesDY);
    }
}

export const formatNames = (sickNames: string[], splittedArray: string[], namesDX: number, namesDY: number, fontSize: number): string[] => {
    if (sickNames.length === 1) {
        if (splittedArray.length > 1) {
            splittedArray[1] = getSecondName(splittedArray);
            splittedArray.length = 2;
            namesDY -= 28;
        } else {
            namesDY -= 10
        }
        // formattedNames = splittedArray;
        fontSize = 37;
        namesDX = 255;
    } else if (sickNames.length === 2) {
        if (splittedArray.length > 1) {
            splittedArray[1] = getSecondName(splittedArray);
            splittedArray.length = 2;
            namesDY += 150;
        } else {
            namesDY += 165;
        }
        // formattedNames = splittedArray;
        fontSize = 37;
        namesDX = 255;
    } else if (sickNames.length < 10) {
        if (splittedArray.length > 1) {
            splittedArray[1] = getSecondName(splittedArray);
            splittedArray.length = 2;
            namesDY -= 20;
        } else {
            namesDY -= 3;
        }
        namesDX = 225;
        // formattedNames = splittedArray;
        fontSize = 31;
    }
    else if (sickNames.length < 17) {
        if (splittedArray.length > 1) {
            splittedArray[1] = getSecondName(splittedArray);
            splittedArray.length = 2;
            namesDY -= 19;
        } else {
            namesDY -= 7;
        }
        // formattedNames = splittedArray;
        fontSize = 30;
        namesDX = 220;
    } else if (sickNames.length < 26) {
        if (splittedArray.length > 1) {
            splittedArray[1] = getSecondName(splittedArray);
            splittedArray.length = 2;
            namesDY -= 27;
        } else {
            namesDY -= 15;
        }
        namesDX = 200;
        fontSize = 26;
        // formattedNames = splittedArray;
    }
    else if (sickNames.length < 31) {
        if (splittedArray.length > 1) {
            splittedArray[1] = getSecondName(splittedArray);
            splittedArray.length = 2;
            namesDY -= 20;
        } else {
            namesDY -= 5;
        }
        namesDX = 198;
        fontSize = 29;
        // formattedNames = splittedArray;
    }

    return splittedArray;
}

export const getInicialDY = (sickNames: string[]): number => {
    let namesDY: number
    // atualizar o DY dos nomes de acordo com o tamanho 
    if (sickNames.length === 1) { namesDY = 640; }
    else if (sickNames.length < 10) { namesDY = 445; }
    else if (sickNames.length < 17) { namesDY = 423; }
    else { namesDY = 365; }

    return namesDY;
}

export const getInitialDimensionsOfNames = (sickNames: string[]) => {
    // dimensoes dos nomes
    const namesDX = 220, namesDY = getInicialDY(sickNames), fontSize = 28;
    const lineBreakSize: number = sickNames.length > 1 ? 40 : 55;

    return {
        namesDX, namesDY, fontSize, lineBreakSize
    }
}