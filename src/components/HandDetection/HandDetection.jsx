import React, { useContext, useEffect } from 'react';

import style from './HandDetection.module.scss';

import { useHandDetectionWithPredictinos } from './HandDetection.utils';
import { HandDrawingContext } from '../../contexts/HandDrawingContext/HandDrawing.context';
import { setCurrentPoints } from '../../contexts/HandDrawingContext/HandDrawing.actions';

import { ReactComponent as HandLogo } from './hand.svg';

const HandDetection = () => {
	const { videoRef, isReady, predictions } = useHandDetectionWithPredictinos(
		100
	);
	const { dispatch } = useContext(HandDrawingContext);

	useEffect(() => {
		if (!predictions || !predictions.length)
			return dispatch(setCurrentPoints(null, null));

		const {
			bbox: [x, y, width, height]
		} = predictions[0];
		const currentPointX = x + width / 2;
		const currentPointY = y + height / 2;

		dispatch(setCurrentPoints(currentPointX, currentPointY));
	}, [predictions, dispatch]);

	return (
		<div className={style.container}>
			{isReady ? (
				<h1>Show your hand!</h1>
			) : (
				<h1>
					Loading
					<span> . </span>
					<span> . </span>
					<span> . </span>
				</h1>
			)}

			<div className={style.handBox}>
				{predictions && predictions.length > 0 && (
					<HandLogo style={{ width: '5vw' }} />
				)}
			</div>
			<div className={style.videoBox}>
				<video
					className={style.video}
					ref={videoRef}
					width={window.innerWidth}
					height={window.innerHeight}
				/>
			</div>
		</div>
	);
};

export default HandDetection;
