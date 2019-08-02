import React from 'react';
import style from './App.module.scss';
import HandDetection from './components/HandDetection/HandDetection';

function App() {
	return (
		<div className={style.app}>
			<HandDetection />
		</div>
	);
}

export default App;
