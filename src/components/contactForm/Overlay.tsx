import styles from './Overlay.module.scss';

interface Props {
	children: React.ReactNode;
	handleOpenToggle?: () => void;
}

export default function Overlay({ children, handleOpenToggle }: Props) {
	return (
		<div className={styles.overlay} onClick={handleOpenToggle}>
			{children}
		</div>
	);
}
