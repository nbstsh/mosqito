import React from 'react';

import bee from './bee.png';
import useImage from 'use-image';

import { Image } from 'react-konva';

const Pointer = ({ x, y }) => {
	const [image] = useImage(bee);
	const HEIGHT = 30;
	const WIDTH = 30;

	if (!x || !y) return null;
	return (
		<Image
			width={WIDTH}
			height={HEIGHT}
			x={x - WIDTH / 2}
			y={y - HEIGHT / 2}
			image={image}
		/>
	);
};

export default Pointer;
