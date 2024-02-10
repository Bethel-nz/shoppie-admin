import { UserButton, auth } from '@clerk/nextjs';
import React from 'react';
import { SubNav } from './SubNav';
import StoreSwitcher from '@/components/store-switcher/store-switcher';
import { redirect } from 'next/navigation';
import prisma from '@/prisma/client';
import { ThemeToggle } from '../theme-toggle';

const NavBar = async () => {
	const { userId } = auth();
	if (!userId) redirect('/sign-in');
	const stores = await prisma.store.findMany({
		where: {
			userId,
		},
	});
	return (
		<div className='border-b'>
			<div className='flex h-16 items-center px-4'>
				<StoreSwitcher items={stores} />
				<SubNav className='mx-6' />
				<div className='ml-auto flex items-center space-x-4'>
					<div className='ml-auto flex items-center space-x-4'>
						<ThemeToggle />
						<span className='hover:ring-2 ring-offset-2 ring-black rounded-full'>
							<UserButton afterSignOutUrl='/' />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
