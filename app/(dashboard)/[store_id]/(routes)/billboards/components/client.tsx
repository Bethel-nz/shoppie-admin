'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Plus } from 'lucide-react';

import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { useRouter, useParams } from 'next/navigation';
import { BillboardClientProps } from '@/types';
import { columns } from './columns';
import { ApiList } from '@/components/ui/api-list';

export const BillboardClient = ({ data }: BillboardClientProps) => {
	const router = useRouter();
	const params = useParams();
	const { store_id } = params;
	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Billboards (${data.length})`}
					description={'Manage billboards for your store'}
				/>
				<Button onClick={() => router.push(`/${store_id}/billboards/new`)}>
					<Plus className='mr-2 h-4 w-4' />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey='label' columns={columns} data={data} />
			<Heading title='API' description='API Calls for Billboards' />
			<Separator />
			<ApiList entityName='billboards' entityIdName='billboardId' />
		</>
	);
};
