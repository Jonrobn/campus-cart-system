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

const CART_STORAGE_KEY = 'campusCart';
const cartSizes = ['XS', 'S', 'M', 'L', 'XL'];

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

function getCart() {
	try {
		const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
		return Array.isArray(savedCart) ? savedCart : [];
	} catch (error) {
		return [];
	}
}

function saveCart(cart) {
	localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
	updateCartCount();
}

function updateCartCount() {
	const itemCount = getCart().reduce((total, item) => total + item.quantity, 0);
	document.querySelectorAll('.cart-count').forEach((count) => {
		count.textContent = itemCount;
	});
}

function addToCart(product, size, quantity) {
	const cart = getCart();
	const existingItem = cart.find((item) => item.id === product.id && item.size === size);

	if (existingItem) {
		existingItem.quantity += quantity;
	} else {
		cart.push({
			id: product.id,
			name: product.name,
			category: product.category,
			mark: product.mark,
			price: product.price,
			size,
			quantity
		});
	}

	saveCart(cart);
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
				<div class="product-actions">
					<button class="button-small add-to-cart" type="button" data-product-id="${product.id}">Add to cart</button>
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

	catalogContent.querySelectorAll('.add-to-cart').forEach((button) => {
		button.addEventListener('click', () => openAddToCartDialog(Number(button.dataset.productId)));
	});
}

function openAddToCartDialog(productId) {
	const product = catalogProducts.find((item) => item.id === productId);
	if (!product) return;

	const dialog = document.createElement('div');
	dialog.className = 'cart-dialog-backdrop';
	dialog.innerHTML = `
		<div class="cart-dialog" role="dialog" aria-modal="true" aria-labelledby="add-to-cart-title">
			<button class="cart-dialog-close" type="button" aria-label="Close">&times;</button>
			<p class="eyebrow"><span></span>${escapeHtml(product.category)}</p>
			<h2 id="add-to-cart-title">Add ${escapeHtml(product.name)}</h2>
			<p class="dialog-price">₱${product.price.toLocaleString()}</p>
			<label class="dialog-label" for="product-size">Size</label>
			<select id="product-size" class="size-select">${cartSizes.map((size) => `<option value="${size}">${size}</option>`).join('')}</select>
			<label class="dialog-label" for="product-quantity">Quantity</label>
			<input id="product-quantity" class="quantity-input" type="number" min="1" max="${product.stock}" value="1">
			<button class="button button-primary button-block confirm-add" type="button">Add to cart</button>
		</div>`;

	document.body.appendChild(dialog);
	const closeDialog = () => dialog.remove();
	dialog.querySelector('.cart-dialog-close').addEventListener('click', closeDialog);
	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) closeDialog();
	});
	dialog.querySelector('.confirm-add').addEventListener('click', () => {
		const quantityInput = dialog.querySelector('.quantity-input');
		const quantity = Math.max(1, Math.min(product.stock, Number(quantityInput.value) || 1));
		addToCart(product, dialog.querySelector('.size-select').value, quantity);
		closeDialog();
		showToast(`${product.name} added to cart.`);
	});
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
updateCartCount();

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
function showToast(message) {
	if (!toast) return;
	toast.textContent = message;
	toast.classList.add('visible');
	window.clearTimeout(toast.hideTimer);
	toast.hideTimer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
}

document.querySelectorAll('[data-action]').forEach((button) => {
	button.addEventListener('click', function () {
		if (button.dataset.action === 'cart') {
			window.location.href = 'cart.html';
			return;
		}

		const messages = {
			search: 'Search will be available in the catalog.',
			profile: 'Profile features are coming soon.'
		};
		showToast(messages[button.dataset.action]);
	});
});

if (window.location.pathname.endsWith('cart.html')) {
	const cartContent = document.getElementById('cart-content');

	function renderCartPage() {
		if (!cartContent) return;
		const cart = getCart();
		const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

		if (!cart.length) {
			cartContent.innerHTML = `
				<div class="cart-page-header"><div><p class="eyebrow"><span></span>Your selection</p><h1 id="cart-title">Your cart</h1></div></div>
				<div class="cart-page-empty"><div class="empty-cart-mark">C</div><h2>Your cart is empty</h2><p>Browse the catalog and add school essentials to get started.</p><a class="button button-primary" href="catalog.html">Browse catalog <span aria-hidden="true">&rarr;</span></a></div>`;
			return;
		}

		cartContent.innerHTML = `
			<div class="cart-page-header"><div><p class="eyebrow"><span></span>Your selection</p><h1 id="cart-title">Your cart</h1></div><p>${cart.length} product${cart.length === 1 ? '' : 's'} selected</p></div>
			<div class="cart-page-layout">
				<div class="cart-page-items">${cart.map((item, index) => `
					<article class="cart-page-item">
						<div class="cart-page-image" role="img" aria-label="${escapeHtml(item.name)} image">${escapeHtml(item.mark)}</div>
						<div class="cart-page-item-info"><div><p class="product-category">${escapeHtml(item.category)}</p><h2>${escapeHtml(item.name)}</h2><p class="cart-page-size">Size: ${escapeHtml(item.size)}</p></div><button class="cart-item-remove" type="button" data-remove-index="${index}">Remove</button></div>
						<div class="cart-page-item-bottom"><div class="quantity-control"><button type="button" aria-label="Decrease quantity" data-change-index="${index}" data-change="-1">−</button><span>${item.quantity}</span><button type="button" aria-label="Increase quantity" data-change-index="${index}" data-change="1">+</button></div><strong>₱${(item.price * item.quantity).toLocaleString()}</strong></div>
					</article>`).join('')}</div>
				<aside class="cart-page-summary"><h2>Order summary</h2><div class="cart-summary-row"><span>Items</span><span>${cart.reduce((sum, item) => sum + item.quantity, 0)}</span></div><div class="cart-summary-row total"><span>Total</span><span>₱${total.toLocaleString()}</span></div><button class="button button-primary button-block" type="button" data-reservation>Proceed to Reservation <span aria-hidden="true">&rarr;</span></button><p class="summary-note">Reservation details will be collected in the next step.</p></aside>
			</div>`;

		cartContent.querySelectorAll('[data-change-index]').forEach((button) => {
			button.addEventListener('click', () => {
				const item = cart[Number(button.dataset.changeIndex)];
				item.quantity = Math.max(1, item.quantity + Number(button.dataset.change));
				saveCart(cart);
				renderCartPage();
			});
		});
		cartContent.querySelectorAll('[data-remove-index]').forEach((button) => {
			button.addEventListener('click', () => {
				cart.splice(Number(button.dataset.removeIndex), 1);
				saveCart(cart);
				renderCartPage();
			});
		});
		cartContent.querySelector('[data-reservation]')?.addEventListener('click', () => showToast('Reservation is coming soon.'));
	}

	renderCartPage();
}


