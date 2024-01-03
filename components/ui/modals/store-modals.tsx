'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import formSchema from '@/lib/schema';

import { Modal } from '@/components/ui/modal';
import { useModalStore } from '@/hooks/use-modal-store';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const StoreModals = () => {
	const { isOpen, onClose } = useModalStore();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});
	const Submit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		// TODO: create Store
	};
	return (
		<Modal
			title='Create a new Store'
			description='Add a new store to manage products'
			isOpen={isOpen}
			onClose={onClose}
		>
			<div>
				<div className='space-y-4 py-2 pb-4'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(Submit)}>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder={`What's your store name`}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='pt-6 space-x-2 flex items-center justify-end'>
								<Button variant={'outline'} onClick={onClose}>
									Cancel
								</Button>
								<Button type='submit'>Continue</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
