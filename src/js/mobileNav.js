const menuToggleButton = document.querySelector('[aria-label="Toggle menu"]');
const closeIcon = document.getElementById('close');
const menuIcon = document.getElementById('menu');
const mobileMenu = document.getElementById('mobile-nav');

menuToggleButton?.addEventListener('click', menuToggle);

function menuToggle() {
	document.body.classList.toggle('no-scroll');
	mobileMenu?.classList.toggle('show');
	closeIcon?.classList.toggle('show');
	menuIcon?.classList.toggle('show');
}
