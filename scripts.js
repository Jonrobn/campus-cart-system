const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('.site-nav');
const toast = document.querySelector('.toast');
const typingLines = document.querySelectorAll('.typing-line');

const typeHeroHeading = (lineIndex = 0) => {
	if (lineIndex >= typingLines.length) return;

	const line = typingLines[lineIndex];
	const text = line.dataset.text;
	let characterIndex = 0;
	line.classList.add('is-typing');

	const typeCharacter = () => {
		line.textContent = text.slice(0, characterIndex + 1);
		characterIndex += 1;
		if (characterIndex < text.length) {
			window.setTimeout(typeCharacter, 75);
		} else {
			line.classList.remove('is-typing');
			window.setTimeout(() => typeHeroHeading(lineIndex + 1), 180);
		}
	};

	typeCharacter();
};

if (typingLines.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	typeHeroHeading();
} else {
	typingLines.forEach((line) => { line.textContent = line.dataset.text; });
}

if (menuToggle) {
	menuToggle.addEventListener('click', () => {
		const isOpen = siteNavigation.classList.toggle('open');
		menuToggle.setAttribute('aria-expanded', String(isOpen));
	});
}

document.querySelectorAll('.site-nav a').forEach((link) => {
	link.addEventListener('click', () => {
		siteNavigation.classList.remove('open');
		menuToggle?.setAttribute('aria-expanded', 'false');
	});
});

document.querySelectorAll('[data-action]').forEach((button) => {
	button.addEventListener('click', () => {
		const messages = {
			search: 'Search will be available in the catalog.',
			cart: 'Your cart is ready for your first item.',
			profile: 'Profile features are coming soon.'
		};
		toast.textContent = messages[button.dataset.action];
		toast.classList.add('visible');
		window.clearTimeout(toast.hideTimer);
		toast.hideTimer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
	});
});
