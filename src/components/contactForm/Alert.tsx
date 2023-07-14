import styles from './Alert.module.scss';
import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface Props {
	children: React.ReactNode;
	type: string;
}

export default function Alert({ children, type }: Props) {
	return (
		<div
			className={`${styles.alert} ${styles[type]}`}
			role={type === 'error' ? 'alert' : undefined}
		>
			<div className={styles.iconContainer}>
				{type === 'success' && <CheckCircledIcon />}
				{type === 'error' && <ExclamationTriangleIcon />}
			</div>
			<p className={styles.textContainer}>{children}</p>
		</div>
	);
}
