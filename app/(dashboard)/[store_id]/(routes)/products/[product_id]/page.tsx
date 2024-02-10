import prisma from '@/prisma/client';

import { ProductForm } from './components/product-form';

const ProductPage = async ({
	params,
}: {
	params: { product_id: string; store_id: string };
}) => {
	const product = await prisma.product.findUnique({
		where: {
			id: params.product_id,
		},
		include: {
			images: true,
		},
	});

	const categories = await prisma.category.findMany({
		where: {
			store_id: params.store_id,
		},
	});

	const sizes = await prisma.size.findMany({
		where: {
			store_id: params.store_id,
		},
	});

	const colors = await prisma.color.findMany({
		where: {
			store_id: params.store_id,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ProductForm
					categories={categories}
					colors={colors}
					sizes={sizes}
					initialData={product}
				/>
			</div>
		</div>
	);
};

export default ProductPage;
