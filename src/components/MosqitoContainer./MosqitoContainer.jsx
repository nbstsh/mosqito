import React, { useContext } from 'react';
import Mosqito from '../Mosqito/Mosqiito';

import style from './MosqitoContainer.module.scss';

import { HandDrawingContext } from '../../contexts/HandDrawingContext/HandDrawing.context';

const MosqitoContainer = () => {
	const {
		state: { currentPointerPoints }
	} = useContext(HandDrawingContext);

	return (
		<div className={style.container}>
			<Mosqito {...currentPointerPoints} />
		</div>
	);
};

export default MosqitoContainer;
