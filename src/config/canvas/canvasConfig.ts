import { createCanvas } from 'canvas'

const canvas = createCanvas(1920, 1080);
const context = canvas.getContext('2d');
context.quality = 'best';
context.fillStyle = '#000000';
context.textAlign = "center";

export { canvas, context }