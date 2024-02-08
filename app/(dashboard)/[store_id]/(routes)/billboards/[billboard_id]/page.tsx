import prisma from '@/prisma/client';
import BillboardForm from './components/billboard-form';

const BillboardPage = async ({
	params,
}: {
	params: { billboard_id: string };
}) => {
	const billboard = await prisma.billboard.findUnique({
		where: {
			id: params.billboard_id,
		},
	});
	return (
		<div className={'flex-col'}>
			<div className={'flex-1 space-y-4 p-8 pt-6'}>
				<BillboardForm initialData={billboard} />
			</div>
		</div>
	);
};

export default BillboardPage;
