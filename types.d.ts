type ModalProps= {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
	children?:React.ReactNode
}