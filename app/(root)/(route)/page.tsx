'use client';

import { useModalStore } from '@/hooks/use-modal-store';
import { useEffect } from 'react';

export default function SetupPage() {
	const { isOpen, onOpen } = useModalStore();

	useEffect(() => {
		if (!isOpen) {
			onOpen();
		}
	}, [isOpen, onOpen]);

	return;
}
