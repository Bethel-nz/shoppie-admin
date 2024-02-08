'use client';
import { useState } from 'react';
import { useModalStore } from '@/hooks/use-modal-store';
import { useParams, useRouter } from 'next/navigation';

import { StoreSwitcherProps } from '@/types';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
	Check,
	ChevronsUpDown,
	PlusCircle,
	Store as StoreIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';

function StoreSwitcher({ className, items = [] }: StoreSwitcherProps) {
	const { onOpen } = useModalStore();
	const { store_id } = useParams();
	const router = useRouter();

	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));
	const [open, setOpen] = useState(false);

	const onStoreSelect = (store: { value: string; label: string }) => {
		setOpen(false);
		router.push(`/${store.value}`);
	};
	const currentStore = formattedItems.find((item) => item.value === store_id);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					size={'icon'}
					role='combobox'
					aria-expanded={open}
					aria-label='Select a store'
					className={cn(`w-52 justify-between`, className)}
				>
					<StoreIcon className='m-2 h-4 w-4' />
					<span>{currentStore?.label}</span>
					<ChevronsUpDown className='m-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-52 p-0'>
				<Command>
					<CommandList>
						<CommandInput placeholder='Search for a store...' />
						<CommandEmpty>No Store Found</CommandEmpty>
						<CommandGroup heading={'Stores'}>
							{formattedItems.map((store) => (
								<CommandItem
									key={store.value}
									onSelect={() => onStoreSelect(store)}
									className='text-sm'
								>
									<StoreIcon className='mr-2 h-4 w-4' />
									{store.label}
									<Check
										className={cn(
											'ml-auto h-4 w-4',
											currentStore?.value === store.value
												? 'opacity-80'
												: 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setOpen(false);
									onOpen();
								}}
							>
								<>
									<PlusCircle className='mr-2 h-5' />
									Create Store
								</>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default StoreSwitcher;
