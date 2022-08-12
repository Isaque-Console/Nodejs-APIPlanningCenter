export const getStickersDimensions = (sickNames: Array<string>): any => {
    let limitOfColumns = 6;
    let initialBorder = 40;
    let dx, dy = 220, stickersHeight = 250, stickersWidth = 400;
    let horizontalProximityStickers = 110, verticalProximityStickers = 120;

    if (sickNames.length === 1) {
        initialBorder = 700;
        dy = 360;
        stickersWidth = 520, stickersHeight = 500;
        verticalProximityStickers = 115;
    }
    else if (sickNames.length === 2) {
        initialBorder = 500;
        dy = 370;
        stickersWidth = 520, stickersHeight = 450;
        verticalProximityStickers = 115;
    }
    else if (sickNames.length < 10) {
        initialBorder = 400;
        limitOfColumns = 3;
        dy = 250;
        stickersWidth = 450, stickersHeight = 350;
        verticalProximityStickers = 115;
    }
    else if (sickNames.length < 17) {
        initialBorder = 250;
        limitOfColumns = 4;
        dy = 250;
        stickersWidth = 450, stickersHeight = 300;
        verticalProximityStickers = 140;
    }
    else if (sickNames.length < 26) {
        initialBorder = 180;
        limitOfColumns = 5;
        dy = 200;
        stickersWidth = 400, stickersHeight = 270;
        verticalProximityStickers = 120;
    }
    dx = initialBorder;

    return {
        initialBorder,
        limitOfColumns,
        dx, dy,
        stickersWidth, stickersHeight,
        horizontalProximityStickers, verticalProximityStickers
    };
}