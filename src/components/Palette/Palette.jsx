import React, { useContext, useRef, useEffect } from 'react';

import style from './Palette.module.scss';
import bee from './bee.png';

import { HandDrawingContext } from '../../contexts/HandDrawingContext/HandDrawing.context';
import { initLine, addPoints } from './Palette.utils';
import {
	startDrawing,
	finishDrawing,
	setCurrentPointerPoints,
	countUp
} from '../../contexts/HandDrawingContext/HandDrawing.actions';
import useImage from 'use-image';

import { Stage, Layer, Image } from 'react-konva';

const Palette = () => {
	const {
		state: {
			isDrawing,
			drawingLine,
			currentPoints,
			currentPointerPoints,
			count
		},
		dispatch
	} = useContext(HandDrawingContext);
	const layerRef = useRef(null);

	const { x, y } = currentPoints;

	useEffect(() => {
		if (isDrawing || !x || !y) return;

		//init line
		const line = initLine(currentPoints.x, currentPoints.y);
		dispatch(startDrawing(line));
		// add line to layer
		layerRef.current.add(line);
	}, [isDrawing, currentPoints, dispatch]);

	useEffect(() => {
		if (!isDrawing || !drawingLine) return;

		// detect whether or not user keeps drawing
		if (x && y) {
			addPoints(drawingLine, x, y);
			dispatch(setCurrentPointerPoints(x, y));
		} else {
			dispatch(countUp());
		}
	}, [isDrawing, drawingLine, currentPoints, dispatch]);

	useEffect(() => {
		console.log(count);
		if (count < 10) return;

		dispatch(finishDrawing());
	}, [count]);
	return (
		<Stage
			className={style.stage}
			width={window.innerWidth}
			height={window.innerHeight}
		>
			<Layer ref={layerRef}>
				{/* <Pointer {...currentPointerPoints} /> */}
			</Layer>
		</Stage>
	);
};

// const Pointer = ({ x, y }) => {
// 	const [image] = useImage(bee);
// 	const HEIGHT = 30;
// 	const WIDTH = 30;

// 	if (!x || !y) return null;
// 	return (
// 		<Image
// 			width={WIDTH}
// 			height={HEIGHT}
// 			x={x - WIDTH / 2}
// 			y={y - HEIGHT / 2}
// 			image={image}
// 		/>
// 	);
// };

export default Palette;
