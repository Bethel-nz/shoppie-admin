'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { SettingsFormProps, zInferFormSchema } from '@/types';
import { Trash } from 'lucide-react';
import { FC, useState } from 'react';
import formSchema from '@/lib/schema';
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

const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { storeid } = useParams();
	const router = useRouter();

	const form = useForm<zInferFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const onSubmit = async (data: zInferFormSchema) => {
		try {
			setLoading(true);
			await axios.patch(`/api/stores/${storeid}`, data);
			router.refresh();
			toast.success(`store renamed to - ${data.name}`);
		} catch (error) {
			toast.error('Something went wrong!');
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title='Settings' description='Manage Store Preferences' />
				<Button
					variant={'destructive'}
					size={'icon'}
					disabled={loading}
					onClick={() => setOpen(true)}
				>
					<Trash className='h-4 w-4' />
				</Button>
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'
				>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Store name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} type='submit'>
						Save Changes
					</Button>
				</form>
			</Form>
		</>
	);
};

export default SettingsForm;
