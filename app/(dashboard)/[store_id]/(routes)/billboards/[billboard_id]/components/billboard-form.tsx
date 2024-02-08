'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { BillboardFormProps, zInferFormSchema } from '@/types';
import { Trash } from 'lucide-react';
import { FC, useState } from 'react';
import { billboardSchema } from '@/lib/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import logger from '@/lib/logger';
import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';
import ImageUpload from '@/components/ui/image-upload';

const BillboardForm: FC<BillboardFormProps> = ({ initialData }) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { store_id, billboard_id } = useParams();
	const router = useRouter();
	const origin = useOrigin();
	const form = useForm<zInferFormSchema>({
		resolver: zodResolver(billboardSchema),
		defaultValues: initialData || {
			label: '',
			imageUrl: '',
		},
	});
	const title = initialData ? 'Edit billboard' : 'Create billboard';
	const description = initialData ? 'Edit a billboard.' : 'Add a new billboard';
	const toastMessage = initialData
		? 'Billboard updated.'
		: 'Billboard created.';
	const action = initialData ? 'Save changes' : 'Create';

	const onSubmit = async (data: zInferFormSchema) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(`/api/${store_id}/billboards/${billboard_id}`, data);
			} else {
				await axios.post(`/api/${store_id}/billboards`, data);
			}
			router.refresh();
			router.push(`/${store_id}/billboards`);
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${store_id}/billboards/${billboard_id}`);
			router.refresh();
			router.push(`/${store_id}/billboards`);
			toast.success('Billboard deleted.');
		} catch (error: any) {
			toast.error(
				'Make sure you removed all categories using this billboard first.'
			);
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={loading}
						variant='destructive'
						size='sm'
						onClick={() => setOpen(true)}
					>
						<Trash className='h-4 w-4' />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'
				>
					<FormField
						control={form.control}
						name='imageUrl'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										disabled={loading}
										onChange={(url: string) => field.onChange(url)}
										onRemove={() => field.onChange('')}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='md:grid md:grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='label'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Billboard label'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className='ml-auto' type='submit'>
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};

export default BillboardForm;
