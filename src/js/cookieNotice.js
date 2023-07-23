let cookieConsent = localStorage.getItem('cookieConsent') || false;
const cookieNotice = document.querySelector('#cookie-notice');
const acceptButton = document.querySelector('#cookie-button');

acceptButton?.addEventListener('click', acceptCookies);

function acceptCookies() {
	localStorage.setItem('cookieConsent', 'true');
	cookieNotice?.remove();
}

if (cookieConsent) {
	cookieNotice?.remove();
} else {
	cookieNotice?.classList.remove('hidden');
}
