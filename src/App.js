import React from 'react';
import style from './App.module.scss';
import HandDetection from './components/HandDetection/HandDetection';
import { HandDrawingProvider } from './contexts/HandDrawingContext/HandDrawing.context';

function App() {
	return (
		<div className={style.app}>
			<HandDrawingProvider>
				<HandDetection />
			</HandDrawingProvider>
		</div>
	);
}

export default App;
