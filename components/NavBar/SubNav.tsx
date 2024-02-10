'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { HTMLAttributes } from 'react';

export function SubNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	const { store_id } = useParams();
	const routes = [
		{
			href: `/${store_id}`,
			label: 'Overview',
			active: pathname === `/${store_id}`,
		},
		{
			href: `/${store_id}/billboards`,
			label: 'Billboards',
			active: pathname === `/${store_id}/billboards`,
		},
		{
			href: `/${store_id}/categories`,
			label: 'Categories',
			active: pathname === `/${store_id}/categories`,
		},
		{
			href: `/${store_id}/sizes`,
			label: 'Sizes',
			active: pathname === `/${store_id}/sizes`,
		},
		{
			href: `/${store_id}/colors`,
			label: 'Colors',
			active: pathname === `/${store_id}/colors`,
		},
		{
			href: `/${store_id}/products`,
			label: 'Products',
			active: pathname === `/${store_id}/products`,
		},
		{
			href: `/${store_id}/orders`,
			label: 'Orders',
			active: pathname === `/${store_id}/orders`,
		},
		{
			href: `/${store_id}/settings`,
			label: 'Settings',
			active: pathname === `/${store_id}/settings`,
		},
	];
	return (
		<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
			{routes.map((route) => (
				<Link
					prefetch={true}
					key={route.href}
					href={route.href}
					className={cn(
						'text-sm font-medium transition-colors hover:text-primary',
						route.active
							? 'text-black dark:text-white font-semibold'
							: 'text-muted-foreground font-regular'
					)}
				>
					{route.label}
				</Link>
			))}
		</nav>
	);
}
