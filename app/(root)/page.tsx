'use client';

import { Modal } from '@/components/ui/modal';
import { useModalStore } from '@/hooks/use-modal-store';
import { useEffect } from 'react';

export default function SetupPage() {
	const { isOpen, onOpen } = useModalStore();

	useEffect(() => {
		if (!isOpen) {
			onOpen();
		}
	}, [isOpen, onOpen]);

	return <div className='p-4'>root</div>;
}
