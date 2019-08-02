import React from 'react';

import style from './HandDetection.module.scss';

import { useHandDetectionWithPredictinos } from './HandDetection.utils';

const HandDetection = () => {
	const {
		videoRef,
		isReady,
		predictions
	} = useHandDetectionWithPredictinos();

	console.log(isReady, predictions);
	return (
		<div className={style.container}>
			<h1>hand drawing</h1>
			<video className={style.video} ref={videoRef} />
		</div>
	);
};

export default HandDetection;
