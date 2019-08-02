import React, { createContext, useReducer } from 'react';

import { reducer, initialState } from './HandDrawing.reducer';

export const HandDrawingContext = createContext();

export const HandDrawingProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<HandDrawingContext.Provider value={{ state, dispatch }}>
			{children}
		</HandDrawingContext.Provider>
	);
};
