import React, { useContext, useRef, useEffect } from 'react';

import style from './Palette.module.scss';

import { Stage, Layer, Rect, Circle } from 'react-konva';
import { HandDrawingContext } from '../../contexts/HandDrawingContext/HandDrawing.context';
import { initLine, addPoints } from './Palette.utils';
import {
	startDrawing,
	finishDrawing
} from '../../contexts/HandDrawingContext/HandDrawing.actions';

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
		} else {
			dispatch(finishDrawing());
		}
	}, [isDrawing, drawingLine, currentPoints, dispatch]);

	return (
		<Stage
			className={style.stage}
			width={window.innerWidth}
			height={window.innerHeight}
		>
			<Layer ref={layerRef}>
				<Pointer x={x} y={y} />
			</Layer>
		</Stage>
	);
};

const Pointer = ({ x, y }) => {
	if (!x || !y) return null;
	return <Circle x={x} y={y} radius={10} fill='green' />;
};

export default Palette;
