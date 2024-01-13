import { HeadingProps } from '@/types';
import React, { FC } from 'react';

const Heading: FC<HeadingProps> = ({ title, description }) => {
	return (
		<div>
			<h2 className='text-3 font-bold tracking-tight'>{title}</h2>
			<p className='text-sm text-muted-foreground'>{description}</p>
		</div>
	);
};

export default Heading;
