import { useState, useRef, useEffect } from 'react';
import * as handTrack from 'handtrackjs';

const modelParams = {
	flipHorizontal: true, // flip e.g for video
	imageScaleFactor: 0.5, // reduce input image size for gains in speed.
	maxNumBoxes: 1, // maximum number of boxes to detect
	iouThreshold: 0.5, // ioU threshold for non-max suppression
	scoreThreshold: 0.79 // confidence threshold for predictions.
};

const startVideo = async videoEl => {
	if (!videoEl) throw new Error('Video element needs to be set.');

	const status = await handTrack.startVideo(videoEl);
	if (!status) throw new Error('Permission denied.');

	const videoConstraints = {
		audio: false,
		video: true
	};

	const stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
	videoEl.srcObject = stream;
};

const loadModel = async () => {
	return await handTrack.load(modelParams);
};

const initHandDetection = async videoEl => {
	try {
		await startVideo(videoEl);
		return await loadModel();
	} catch (e) {
		handTrack.stopVideo(videoEl);
		console.error(e);
	}
};

export const useHandDetectionWithPredictinos = (interval = 500) => {
	const videoRef = useRef(null);
	const [model, setModel] = useState(null);
	const [isReady, setIsReady] = useState(false);
	const [predictions, setPredictions] = useState(null);

	useEffect(() => {
		initHandDetection(videoRef.current)
			.then(setModel)
			.catch(err => console.error('Something went wrong at init.'));
	}, []);

	useEffect(() => {
		if (!model) return;

		const proceedDetection = async () => {
			const predictions = await model.detect(videoRef.current);
			setPredictions(predictions);
		};
		setInterval(proceedDetection, interval);
		setIsReady(true);
	}, [model, interval]);

	return {
		videoRef,
		isReady,
		predictions
	};
};
