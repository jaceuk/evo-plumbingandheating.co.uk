// pull down menu
const menuTriggers = document.querySelectorAll('[aria-haspopup="true"]');

function toggleMenu(menuTrigger) {
	menuTrigger.setAttribute(
		'aria-expanded',
		menuTrigger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
	);
}

menuTriggers?.forEach((menuTrigger) => {
	menuTrigger.addEventListener('click', () => {
		toggleMenu(menuTrigger);
	});
});

// click anywhere or scroll to close pull down menu
window.addEventListener('scroll', () => {
	menuTriggers?.forEach((menuTrigger) => {
		menuTrigger.setAttribute('aria-expanded', 'false');
	});
});

window.addEventListener('click', (element) => {
	const target = element.target;
	if (target.classList.contains('link')) return;
	menuTriggers?.forEach((menuTrigger) => {
		menuTrigger.setAttribute('aria-expanded', 'false');
	});
});
