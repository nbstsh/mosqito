import React, { useContext, useEffect } from 'react';

import style from './HandDetection.module.scss';

import { useHandDetectionWithPredictinos } from './HandDetection.utils';
import { HandDrawingContext } from '../../contexts/HandDrawingContext/HandDrawing.context';
import { setCurrentPoints } from '../../contexts/HandDrawingContext/HandDrawing.actions';

const HandDetection = () => {
	const {
		videoRef,
		isReady,
		predictions
	} = useHandDetectionWithPredictinos();
	const { state, dispatch } = useContext(HandDrawingContext);

	useEffect(() => {
		if (!predictions || !predictions.length) return;

		const {
			bbox: [x, y, width, height]
		} = predictions[0];
		const currentPointX = x + width / 2;
		const currentPointY = y + height / 2;

		dispatch(setCurrentPoints(currentPointX, currentPointY));
	}, [predictions, dispatch]);

	return (
		<div className={style.container}>
			<h1>hand drawing</h1>
			<pre>{JSON.stringify(state, null, 4)}</pre>
			<div className={style.videoBox}>
				<video
					className={style.video}
					ref={videoRef}
					style={{
						width: window.innerWidth,
						height: window.innerHeight
					}}
				/>
			</div>
		</div>
	);
};

export default HandDetection;
