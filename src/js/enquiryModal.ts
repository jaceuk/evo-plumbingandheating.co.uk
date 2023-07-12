import { createFocusTrap } from 'focus-trap';

const modalTriggers = document.querySelectorAll('button[data-modal="enquiry-modal"]');
const modalClosers = document.querySelectorAll('button[data-close="enquiry-modal"]');
const modal = document.querySelector(`#enquiry-modal`);
const focusTrap = createFocusTrap('#enquiry-modal');

modalTriggers.forEach((modalTrigger) => {
	modalTrigger.addEventListener('click', () => openModal(modal));
});

modalClosers.forEach((modalCloser) => {
	modalCloser.addEventListener('click', () => closeModal(modal));
});

function openModal(modal: Element | null) {
	modal?.classList.add('show');
	document.body.classList.add('no-scroll');
	createFocusTrap('#enquiry-modal');
	focusTrap.activate();
}

function closeModal(modal: Element | null) {
	modal?.classList.remove('show');
	document.body.classList.remove('no-scroll');
	focusTrap.deactivate();
}

window.addEventListener('click', (element) => {
	const target = element.target as Element;
	if (target.classList.contains('backdrop')) {
		const modal = document.querySelector('#enquiry-modal');
		if (modal) {
			modal.classList.remove('show');
			focusTrap.deactivate();
		}
	}
});
