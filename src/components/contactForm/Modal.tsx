import * as React from 'react';
import { Portal } from 'react-portal';
import styles from './Modal.module.scss';
import Form from './Form';
import Overlay from './Overlay';
import FocusTrap from 'focus-trap-react';
import { Cross2Icon } from '@radix-ui/react-icons';

interface Props {
	buttonType: 'primary' | 'secondary' | 'primary small';
}

export function Modal({ buttonType }: Props) {
	const [open, setOpen] = React.useState(false);

	function handleOpenToggle() {
		setOpen(!open);
		document.body.classList.toggle('no-scroll');
	}

	return (
		<>
			<button className={`button ${buttonType} full-width`} onClick={handleOpenToggle}>
				Enquire online
			</button>

			{open && (
				<Portal>
					<FocusTrap>
						<Overlay handleOpenToggle={handleOpenToggle}>
							<div
								onClick={(e) => e.stopPropagation()}
								role="alertdialog"
								aria-modal="true"
								aria-labelledby="modal-label"
								aria-describedby="modal-desc"
								className={`card ${styles.modal}`}
							>
								<h2 id="modal-label" className="coloured-text">
									Enquire online
								</h2>
								<button
									onClick={handleOpenToggle}
									className={`button outline ${styles.close}`}
									data-close="enquiry-modal"
								>
									<Cross2Icon />
									<div className="sr-only">Close</div>
								</button>

								<div id="modal-desc" className={styles.desc}>
									<p>Please fill in the form below and we'll get back to you shortly.</p>
								</div>

								<Form />
							</div>
						</Overlay>
					</FocusTrap>
				</Portal>
			)}
		</>
	);
}
