import prisma from '@/prisma/client';

export const getTotalRevenue = async (store_id: string) => {
	const paidOrders = await prisma.order.findMany({
		where: {
			store_id,
			isPaid: true,
		},
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
	});

	const totalRevenue = paidOrders.reduce((total, order) => {
		const orderTotal = order.orderItems.reduce((orderSum, item) => {
			return orderSum + item.product.price.toNumber();
		}, 0);
		return total + orderTotal;
	}, 0);

	return totalRevenue;
};
