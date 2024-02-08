import { PopoverTrigger } from '@/components/ui/popover';
import { Billboard, Store } from '@prisma/client';
import { ComponentPropsWithoutRef } from 'react';
import formSchema, { billboardSchema } from './lib/schema';
import * as z from 'zod';

type zInferFormSchema =
	| z.infer<typeof formSchema>
	| z.infer<typeof billboardSchema>;

type ModalProps = {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
	children?: React.ReactNode;
};

type AlertModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
};

type ApiAlertProps = {
	title: string;
	description: string;
	variant: 'public' | 'admin';
};

type useModalStoreType = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

interface DashboardPageProps {
	params: {
		store_id: string;
	};
}

interface SettingPageProps {
	params: {
		store_id: string;
	};
}
interface SettingsFormProps {
	initialData: Store;
}
interface BillboardFormProps {
	initialData: Billboard | null;
}

type HeadingProps = {
	title: string;
	description: string;
};

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
	items: Store[];
}

interface BillboardClientProps {
	data: Billboard[];
}
