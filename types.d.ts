import { PopoverTrigger } from "@/components/ui/popover";
import { Store } from "@prisma/client";
import { ComponentPropsWithoutRef } from "react";
import formSchema from "./lib/schema";
import * as z from 'zod'

type zInferFormSchema= z.infer<typeof formSchema> 

type ModalProps= {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
	children?:React.ReactNode
}

type AlertModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
}

type ApiAlertProps = {
	title: string
	description: string;
	variant:"public" | "admin"
}

type useModalStoreType = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () =>void;

}

interface DashboardPageProps  {
	params: {
		storeid:string
	}
}

interface SettingPageProps {
	params: {
		storeid:string
	}
}
interface SettingsFormProps {
	initialData: Store
}

type HeadingProps= {
	title: string,
	description:string
}

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
	items: Store[];
}