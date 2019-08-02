import { actionTypes } from './HandDrawing.reducer';

export const setCurrentPoints = (x, y) => ({
	type: actionTypes.SET_CURRENT_POINTS,
	payload: { x, y }
});

export const startDrawing = drawingLine => ({
	type: actionTypes.START_DRAWING,
	payload: drawingLine
});

export const finishDrawing = () => ({
	type: actionTypes.FINISH_DRAWING
});

export const countUp = () => ({
	type: actionTypes.COUNT
});

export const setCurrentPointerPoints = (x, y) => ({
	type: actionTypes.SET_CURRENT_POINTER_POINTS,
	payload: { x, y }
});
