import Konva from 'konva';

const randomColor = Konva.Util.getRandomColor();

const LINE_OPTION = {
	x: 0,
	y: 0,
	points: [],
	stroke: randomColor,
	tension: 0
};

const isValidPoints = (x, y) => {
	return typeof x === 'number' && typeof y === 'number';
};

export const initLine = (x, y, color) => {
	if (!isValidPoints(x, y)) throw new Error('Invalid point was given!');

	const options = color ? { ...LINE_OPTION, stroke: color } : LINE_OPTION;
	options.points = [x, y];
	return new Konva.Line(options);
};

export const addPoints = (line, x, y) => {
	if (!line) throw new Error('Line must be provided!');
	if (!isValidPoints(x, y)) throw new Error('Invalid point was given!');

	line.points([...line.points(), x, y]);
	line.draw();
};
