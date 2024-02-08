'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRouter, useParams } from 'next/navigation';

export const BillboardClient = () => {
	const router = useRouter();
	const params = useParams();
	const { store_id } = params;
	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title='Billboards (0)'
					description={'Manage billboards for your store'}
				/>
				<Button onClick={() => router.push(`/${store_id}/billboards/new`)}>
					<Plus className='mr-2 h-4 w-4' />
					Add New
				</Button>
			</div>
			<Separator />
		</>
	);
};
