'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { SettingsFormProps } from '@/types';
import { Trash } from 'lucide-react';
import { FC } from 'react';
import * as z from 'zod';
import formSchema from '@/lib/schema';

const SettingsForm: FC<SettingsFormProps> = () => {
	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title='Settings' description='Manage Store Preferences' />
				<Button variant={'destructive'} size={'sm'} onClick={() => {}}>
					<Trash className='h-4 w-4' />
				</Button>
			</div>
			<Separator />
		</>
	);
};

export default SettingsForm;
