import React, { useContext, useRef, useEffect } from 'react';

import style from './Palette.module.scss';

import { HandDrawingContext } from '../../contexts/HandDrawingContext/HandDrawing.context';
import { initLine, addPoints } from './Palette.utils';
import {
	startDrawing,
	finishDrawing,
	setCurrentPointerPoints,
	countUp
} from '../../contexts/HandDrawingContext/HandDrawing.actions';

import { Stage, Layer } from 'react-konva';

const Palette = () => {
	const {
		state: {
			isDrawing,
			drawingLine,
			currentPoints,
			// currentPointerPoints,
			count
		},
		dispatch
	} = useContext(HandDrawingContext);
	const layerRef = useRef(null);

	const { x, y } = currentPoints;

	useEffect(() => {
		if (isDrawing || !x || !y) return;

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

export default Palette;
