import { actionTypes } from './HandDrawing.actions';

export const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_POINTS:
			return { ...state, currentPoints: action.payload };
		case actionTypes.START_DRAWING:
			return { ...state, isDrawing: true, drawingLine: action.payload };
		case actionTypes.FINISH_DRAWING:
			return {
				...state,
				isDrawing: false,
				drawingLine: null,
				currentPointerPoints: { x: null, y: null },
				count: 0
			};
		case actionTypes.COUNT:
			return {
				...state,
				count: state.count < 10 ? state.count + 1 : 0
			};
		case actionTypes.SET_CURRENT_POINTER_POINTS:
			return { ...state, currentPointerPoints: action.payload, count: 0 };
		default:
			throw new Error('Invalid action provided.');
	}
};

export const initialState = {
	currentPoints: { x: null, y: null },
	currentPointerPoints: { x: null, y: null },
	isDrawing: false,
	drawingLine: null,
	count: 0
};
