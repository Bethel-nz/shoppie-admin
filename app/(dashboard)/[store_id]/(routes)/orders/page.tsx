import { format } from 'date-fns';

import prisma from '@/prisma/client';
import { formatter } from '@/lib/utils';

import { OrderColumn } from './components/columns';
import { OrderClient } from './components/client';

const OrdersPage = async ({ params }: { params: { store_id: string } }) => {
	const orders = await prisma.order.findMany({
		where: {
			store_id: params.store_id,
		},
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedOrders: OrderColumn[] = orders.map((item) => ({
		id: item.id,
		phone: item.phone,
		address: item.address,
		products: item.orderItems
			.map((orderItem) => orderItem.product.name)
			.join(', '),
		totalPrice: formatter.format(
			item.orderItems.reduce((total, item) => {
				return total + Number(item.product.price);
			}, 0)
		),
		isPaid: item.isPaid,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<OrderClient data={formattedOrders} />
			</div>
		</div>
	);
};

export default OrdersPage;
