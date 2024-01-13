type ModalProps= {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
	children?:React.ReactNode
}

type useModalStoreType = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () =>void;

}

type DashboardPageProps = {
	params: {
		storeid:string
	}
}