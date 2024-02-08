import prisma from '@/prisma/client';
import { SettingPageProps } from '@/types';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';
import SettingsForm from './components/settings-form';

const page: FC<SettingPageProps> = async ({ params: { store_id } }) => {
	const { userId } = auth();
	if (!userId) redirect('/sign-in');

	const store = await prisma.store.findFirst({
		where: {
			id: store_id,
			userId,
		},
	});
	if (!store) redirect('/');
	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SettingsForm initialData={store} />
			</div>
		</div>
	);
};

export default page;
