'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { HTMLAttributes } from 'react';

export function SubNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	const { storeid } = useParams();
	const routes = [
		{
			href: `/${storeid}`,
			label: 'Overview',
			active: pathname === `/${storeid}`,
		},
		{
			href: `/${storeid}/settings`,
			label: 'Settings',
			active: pathname === `/${storeid}/settings`,
		},
	];
	return (
		<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
			{routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						'text-sm font-medium transition-colors hover:text-primary',
						route.active
							? 'text-black dark:text-white'
							: 'text-muted-foreground'
					)}
				>
					{route.label}
				</Link>
			))}
		</nav>
	);
}
