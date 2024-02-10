import prisma from '@/prisma/client';

export const getStockCount = async (store_id: string) => {
	const stockCount = await prisma.product.count({
		where: {
			store_id,
			isArchived: false,
		},
	});

	return stockCount;
};
