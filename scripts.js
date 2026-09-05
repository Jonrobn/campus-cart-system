/*
Homepage JavaScript - CampusCart
Content and repeated homepage elements are created here.
*/

// PAGE CONTENT
const pageContent = {
	brand: 'CampusCart',
	brandSubtitle: 'SCHOOL MERCHANDISE STORE',
	navigation: [
		{ label: 'Home', href: 'index.html', active: true },
		{ label: 'Catalog', href: 'catalog.html' },
		{ label: 'My Reservations', href: '#footer' }
	],
	announcements: [
		'NEW P.E STOCK AVAILABLE',
		'UPCOMING INTRAMURAL JERSEYS ARRIVE SOON',
		'NEW DEPARTMENTAL SHIRT THIS DECEMBER'
	],
	hero: {
		eyebrow: 'Made for your school community',
		heading: ['Your School', 'Your Style', 'One Place'],
		description: 'Reserve your uniforms and school merchandise items easily.',
		button: 'Shop Now',
		note: 'Official items, ready when you are'
	},
	benefits: {
		eyebrow: 'Why CampusCart',
		heading: ['The easy way to', 'wear your school pride.'],
		items: [
			{ icon: '✦', title: 'Official School Items', text: 'Trusted and quality merchandise.', number: '01' },
			{ icon: '↗', title: 'Easy Reservation', text: 'Reserve in a few simple steps.', number: '02' },
			{ icon: '⌁', title: 'Quick Pickup', text: 'Claim your items at the scheduled time.', number: '03' }
		]
	},
	footer: {
		description: ['Making school essentials simple,', 'accessible, and yours.'],
		copyright: ['© 2024 CampusCart', 'Built for your school community.']
	}
};

// DOM
const navigationContent = document.getElementById('navigation-content');
const announcementContent = document.getElementById('announcement-content');
const heroCopy = document.getElementById('hero-copy');
const benefitsContent = document.getElementById('benefits-content');
const catalogContent = document.getElementById('catalog-content');
const footerContent = document.getElementById('footer-content');
const toast = document.querySelector('.toast');

// ICONS
const iconMarkup = {
	search: '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>',
	cart: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.5L20.5 8H6"></path><circle cx="9" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg>',
	profile: '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20a7 7 0 0 1 14 0"></path></svg>'
};

// CREATE NAVIGATION
function renderNavigation() {
	if (!navigationContent) return;
	const currentPage = window.location.pathname.split('/').pop() || 'index.html';
	navigationContent.innerHTML = `
		<a class="brand" href="index.html" aria-label="${pageContent.brand} home">
			<span class="brand-mark" aria-hidden="true">C</span>
			<span class="brand-copy"><strong>${pageContent.brand}</strong><small>${pageContent.brandSubtitle}</small></span>
		</a>
		<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
			<span class="sr-only">Toggle navigation</span><span></span><span></span><span></span>
		</button>
		<nav class="site-nav" id="site-navigation" aria-label="Primary navigation">
			${pageContent.navigation.map((link) => {
				const isActive = currentPage === 'catalog.html' ? link.href === 'catalog.html' : link.href === 'index.html' && currentPage === 'index.html';
				return `<a class="${isActive ? 'active' : ''}" href="${link.href}">${link.label}</a>`;
			}).join('')}
		</nav>
		<div class="nav-actions" aria-label="Quick actions">
			${['search', 'cart', 'profile'].map((action) => `<button class="icon-button ${action === 'cart' ? 'cart-button' : ''}" type="button" data-action="${action}" aria-label="${action}">${iconMarkup[action]}${action === 'cart' ? '<span class="cart-count">0</span>' : ''}</button>`).join('')}
		</div>`;
}

// CREATE ANNOUNCEMENT
function renderAnnouncements() {
	if (!announcementContent) return;
	const announcements = pageContent.announcements;
	const items = [...announcements, ...announcements];
	announcementContent.innerHTML = `
		<p class="sr-only">${announcements.join('. ')}.</p>
		<div class="announcement-window" aria-hidden="true"><div class="announcement-track">
			${items.map((item, index) => `<span>${item}</span>${index < items.length - 1 ? '<b>-</b>' : ''}`).join('')}
		</div></div>`;
}

// CREATE HERO
function renderHero() {
	if (!heroCopy) return;
	const { hero } = pageContent;
	heroCopy.innerHTML = `
		<p class="eyebrow"><span></span>${hero.eyebrow}</p>
		<h1 id="hero-title" aria-label="${hero.heading.join(' ')}">
			${hero.heading.map((line) => `<span class="typing-line" data-text="${line}" aria-hidden="true"></span>`).join('')}
		</h1>
		<p class="hero-description">${hero.description}</p>
		<a class="button button-primary" href="catalog.html">${hero.button} <span aria-hidden="true">&rarr;</span></a>
		<div class="hero-note"><span class="note-icon" aria-hidden="true">✓</span>${hero.note}</div>`;
}

// CREATE BENEFITS
function renderBenefits() {
	if (!benefitsContent) return;
	const { benefits } = pageContent;
	benefitsContent.innerHTML = `
		<div class="section-heading"><p class="eyebrow"><span></span>${benefits.eyebrow}</p>
		<h2 id="benefits-title">${benefits.heading[0]}<br><em>${benefits.heading[1]}</em></h2></div>
		<div class="benefit-grid">${benefits.items.map((item) => `
			<article class="benefit-card"><div class="benefit-icon">${item.icon}</div>
			<div><h3>${item.title}</h3><p>${item.text}</p></div><span class="card-number">${item.number}</span></article>`).join('')}
		</div>`;
}

// CATALOG DATA
const catalogProducts = [
	{ id: 1, name: 'School Uniform', category: 'Uniforms', price: 1200, stock: 12, badge: '', mark: 'SU' },
	{ id: 2, name: 'Jersey', category: 'Athletics', price: 400, stock: 8, badge: 'Limited', mark: 'JR' },
	{ id: 3, name: 'ID Lace', category: 'Accessories', price: 150, stock: 20, badge: '', mark: 'ID' },
	{ id: 4, name: 'P.E. Uniform', category: 'Uniforms', price: 800, stock: 10, badge: '', mark: 'PE' },
	{ id: 5, name: 'Departmental Shirt', category: 'Uniforms', price: 300, stock: 6, badge: '', mark: 'DS' }
];

const catalogState = {
	category: 'All',
	query: ''
};

function escapeHtml(value = '') {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function getVisibleCatalogProducts() {
	const query = catalogState.query.trim().toLowerCase();

	return catalogProducts.filter((product) => {
		const matchesCategory = catalogState.category === 'All' || product.category === catalogState.category;
		const haystack = `${product.name} ${product.category} ${product.badge}`.toLowerCase();
		const matchesQuery = !query || haystack.includes(query);
		return matchesCategory && matchesQuery;
	});
}

function renderCatalog() {
	if (!catalogContent) return;
	const categories = ['All', ...new Set(catalogProducts.map((product) => product.category))];
	const visibleProducts = getVisibleCatalogProducts();
	const safeQuery = escapeHtml(catalogState.query);

	const cardsHtml = visibleProducts.length > 0 ? visibleProducts.map((product) => `
		<article class="product-card">
			<div class="product-image">
				<span>${product.mark}</span>
				<span class="product-badge ${product.stock <= 8 ? 'low' : ''}">${product.badge}</span>
			</div>
			<div class="product-info">
				<p class="product-category">${product.category}</p>
				<h3>${product.name}</h3>
				<div class="product-meta">
					<span class="product-price">₱${product.price.toLocaleString()}</span>
					<span class="product-stock ${product.stock <= 8 ? 'low' : ''}">${product.stock} left</span>
				</div>
			</div>
		</article>
	`).join('') : '<div class="catalog-empty">No products matched your search. Try another keyword or category.</div>';

	catalogContent.innerHTML = `
		<div class="catalog-header">
			<div>
				<p class="eyebrow"><span></span>Featured collection</p>
				<h2 id="catalog-title">Uniform essentials for campus life</h2>
			</div>
			<p>Carefully chosen pieces for everyday comfort, school pride, and easy daily wear.</p>
		</div>
		<div class="catalog-controls">
			<div class="catalog-filters">
				${categories.map((category) => `
					<button type="button" class="filter-button ${catalogState.category === category ? 'active' : ''}" data-category="${category}">${category}</button>
				`).join('')}
			</div>
			<label class="catalog-search" aria-label="Search products">
				<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"></circle><path d="M16 16L21 21"></path></svg>
				<input type="search" placeholder="Search products" value="${safeQuery}">
			</label>
		</div>
		<div class="catalog-grid">${cardsHtml}</div>
	`;

	catalogContent.querySelectorAll('.filter-button').forEach((button) => {
		button.addEventListener('click', () => {
			catalogState.category = button.dataset.category;
			renderCatalog();
		});
	});

	const searchInput = catalogContent.querySelector('.catalog-search input');
	if (searchInput) {
		searchInput.addEventListener('input', (event) => {
			catalogState.query = event.target.value;
			renderCatalog();
		});
	}
}

// CREATE FOOTER
function renderFooter() {
	if (!footerContent) return;
	const { footer } = pageContent;
	footerContent.innerHTML = `
		<div class="footer-grid"><div><a class="footer-brand" href="index.html">${pageContent.brand}</a>
		<p>${footer.description.join('<br>')}</p></div>
		<div class="footer-links">${pageContent.navigation.map((link) => `<a href="${link.href}">${link.label === 'My Reservations' ? 'Reservations' : link.label}</a>`).join('')}</div>
		<p class="copyright">${footer.copyright.join('<br>')}</p></div>`;
}

renderNavigation();
renderAnnouncements();
renderHero();
renderBenefits();
renderCatalog();
renderFooter();

// TYPING ANIMATION
const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('.site-nav');
const typingLines = document.querySelectorAll('.typing-line');

function typeHeroHeading(lineIndex = 0) {
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
	}

	typeCharacter();
}

if (typingLines.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	typeHeroHeading();
} else {
	typingLines.forEach((line) => { line.textContent = line.dataset.text; });
}

// MENU EVENTS
if (menuToggle) {
	menuToggle.addEventListener('click', function () {
		const isOpen = siteNavigation.classList.toggle('open');
		menuToggle.setAttribute('aria-expanded', String(isOpen));
	});
}

document.querySelectorAll('.site-nav a').forEach((link) => {
	link.addEventListener('click', function () {
		siteNavigation.classList.remove('open');
		menuToggle?.setAttribute('aria-expanded', 'false');
	});
});

// BUTTON FEEDBACK
document.querySelectorAll('[data-action]').forEach((button) => {
	button.addEventListener('click', function () {
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


