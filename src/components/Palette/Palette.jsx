import React, { useContext, useRef, useEffect } from 'react';

import style from './Palette.module.scss';

import { Stage, Layer } from 'react-konva';
import { HandDrawingContext } from '../../contexts/HandDrawingContext/HandDrawing.context';
import { initLine, addPoints } from './Palette.utils';
import {
	startDrawing,
	finishDrawing
} from '../../contexts/HandDrawingContext/HandDrawing.actions';
import Konva from 'konva';

const Palette = () => {
	const {
		state: { isDrawing, drawingLine, currentPoints },
		dispatch
	} = useContext(HandDrawingContext);
	const layerRef = useRef(null);
	const { x, y } = currentPoints;

	useEffect(() => {
		if (isDrawing || !x || !y) return;

		//init line
		console.log(currentPoints);
		const line = initLine(currentPoints.x, currentPoints.y);
		dispatch(startDrawing(line));

		// add line to layer
		layerRef.current.add(line);
	}, [isDrawing, currentPoints, dispatch]);

	useEffect(() => {
		if (!isDrawing || !drawingLine) return;
		// detect whether or not line is drawing
		if (x && y) {
			addPoints(drawingLine, x, y);
		} else {
			dispatch(finishDrawing());
		}
	}, [isDrawing, drawingLine, currentPoints, dispatch]);

	useEffect(() => {
		// var circle = new Konva.Circle({
		// 	x: window.innerWidth / 2,
		// 	y: window.innerHeight / 2,
		// 	radius: 70,
		// 	fill: 'red',
		// 	stroke: 'black',
		// 	strokeWidth: 4
		// });
		// // add the shape to the layer
		// layerRef.current.add(circle);
	}, []);

	return (
		<Stage
			className={style.stage}
			width={window.innerWidth}
			height={window.innerHeight}
		>
			<Layer ref={layerRef} />
		</Stage>
	);
};

export default Palette;
