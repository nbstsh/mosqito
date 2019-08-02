import { actionTypes } from './HandDrawing.reducer';

export const setCurrentPoints = (currentPointX, currentPointY) => ({
	type: actionTypes.SET_CURRENT_POINTS,
	payload: {
		currentPointX,
		currentPointY
	}
});
