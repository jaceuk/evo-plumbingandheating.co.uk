import PulseLoader from 'react-spinners/PulseLoader';
import styles from './Loader.module.scss';

interface Props {
	children: React.ReactNode;
}

export default function Loader({ children }: Props) {
	return (
		<div className={styles.loader}>
			{children}
			<PulseLoader color="white" />
		</div>
	);
}
