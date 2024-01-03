import { create } from 'zustand';

export const useModalStore = create<useModalStoreType>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
