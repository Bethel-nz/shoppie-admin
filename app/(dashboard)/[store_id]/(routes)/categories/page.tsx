import { format } from 'date-fns';

import prisma from '@/prisma/client';

import { CategoryColumn } from './components/columns';
import { CategoriesClient } from './components/client';

const CategoriesPage = async ({ params }: { params: { store_id: string } }) => {
	const categories = await prisma.category.findMany({
		where: {
			store_id: params.store_id,
		},
		include: {
			billboard: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedCategories: CategoryColumn[] = categories.map((item) => ({
		id: item.id,
		name: item.name,
		billboardLabel: item.billboard.label,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<CategoriesClient data={formattedCategories} />
			</div>
		</div>
	);
};

export default CategoriesPage;
