export const actionTypes = {
	SET_CURRENT_POINTS: 'SET_CURRENT_POINTS'
};

export const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_POINTS:
			return { ...state, ...action.payload };
		default:
			throw new Error('Invalid action provided.');
	}
};

export const initialState = {
	currentPointX: null,
	currentPointY: null
};
