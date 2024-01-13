'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

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
import { useState } from 'react';
import toast from 'react-hot-toast';
import { zInferFormSchema } from '@/types';

export const StoreModals = () => {
	const { isOpen, onClose } = useModalStore();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<zInferFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});
	const Submit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			const response = await axios.post('/api/stores', values);
			window.location.assign(`/${response.data.id}`);
		} catch (error) {
			setIsLoading(false);
			toast.error('Something went wrong!');
			console.error(error);
		} finally {
			setIsLoading(false);
		}
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
												disabled={isLoading}
												placeholder={`What's your store name`}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='pt-6 space-x-2 flex items-center justify-end'>
								<Button
									variant={'outline'}
									onClick={onClose}
									disabled={isLoading}
								>
									Cancel
								</Button>
								<Button type='submit' disabled={isLoading}>
									Continue
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
