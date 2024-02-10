import prisma from '@/prisma/client';

import { ColorForm } from './components/color-form';

const ColorPage = async ({ params }: { params: { color_id: string } }) => {
	const color = await prisma.color.findUnique({
		where: {
			id: params.color_id,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ColorForm initialData={color} />
			</div>
		</div>
	);
};

export default ColorPage;
