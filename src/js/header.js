function stickyHeader() {
	const header = document.querySelector('header');
	const heroSection = document.querySelector('#hero');
	const rect = heroSection?.getBoundingClientRect();

	// make header sticky when the hero section has scrolled off screen
	if (rect?.bottom < 0) {
		header?.classList.add('sticky');
	} else {
		header?.classList.remove('sticky');
	}
}

// click anywhere or scroll to close pull down menu
window.addEventListener('scroll', () => {
	stickyHeader();
});
