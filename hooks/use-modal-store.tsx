import { create } from 'zustand';
import { useModalStoreType } from '@/types';

export const useModalStore = create<useModalStoreType>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
