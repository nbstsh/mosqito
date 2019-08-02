export const actionTypes = {
	SET_CURRENT_POINTS: 'SET_CURRENT_POINTS',
	START_DRAWING: 'START_DRAWING',
	FINISH_DRAWING: 'FINISH_DRAWING'
};

export const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_POINTS:
			return { ...state, currentPoints: action.payload };
		case actionTypes.START_DRAWING:
			return { ...state, isDrawing: true, drawingLine: action.payload };
		case actionTypes.FINISH_DRAWING:
			return { ...state, isDrawing: false, drawingLine: null };
		default:
			throw new Error('Invalid action provided.');
	}
};

export const initialState = {
	currentPoints: { x: null, y: null },
	isDrawing: false,
	drawingLine: null
};
