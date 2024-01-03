'use client';

import { Modal } from '@/components/ui/modal';
import { useModalStore } from '@/hooks/use-modal-store';

export const StoreModals = () => {
	const storeModal = useModalStore();
	return (
		<Modal
			title='Create a new Store'
			description='Add a new store to manage products'
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			Future Create Store Form
		</Modal>
	);
};
