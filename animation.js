document.addEventListener('DOMContentLoaded', () => {
	// selectors
	const sectionEls = Array.from(document.querySelectorAll('section'));

	// helper: add class safely
	const addAos = el => el && !el.classList.contains('aos-item') && el.classList.add('aos-item');

	// mark inner elements of sections (avoid animating the section container itself)
	sectionEls.forEach(section => {
		section.querySelectorAll('h1,h2,h3,h4,p,img,div').forEach(n => addAos(n));
	});

	// project cards: fade from left with stagger
	const projectCards = Array.from(document.querySelectorAll('.projects-cards .project-card'));
	projectCards.forEach((card, i) => {
		addAos(card);
		card.classList.add('aos-left');
		card.style.setProperty('--aos-delay', `${i * 120}ms`);
		// also stagger inner content slightly
		const inner = card.querySelector('.project-card-contents');
		if (inner) { addAos(inner); inner.style.setProperty('--aos-delay', `${i * 120 + 80}ms`); inner.classList.add('aos-left'); }
	});

	// skills cards: fade from left, one-after-another
	const skills = Array.from(document.querySelectorAll('.skills-cards .skills-card'));
	skills.forEach((s, i) => { addAos(s); s.classList.add('aos-left'); s.style.setProperty('--aos-delay', `${i * 90}ms`); });

	// other content default: from top (don't include section containers)
	const defaultEls = Array.from(document.querySelectorAll('section h1, section h2, section p, .contact-content, .hero-main'));
	defaultEls.forEach(el => { addAos(el); if (!el.classList.contains('aos-left')) el.classList.add('aos-from-top'); });

	// IntersectionObserver toggles animate class on enter/exit so animations run both directions
	const io = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			const el = entry.target;
			if (entry.isIntersecting) el.classList.add('aos-animate');
			else el.classList.remove('aos-animate');
		});
	}, { threshold: [0.12, 0.9], rootMargin: '0px 0px -4% 0px' });

	// observe all aos items (skip elements with zero area)
	Array.from(document.querySelectorAll('.aos-item')).forEach(el => {
		const r = el.getBoundingClientRect();
		if (r.width === 0 && r.height === 0) return;
		io.observe(el);
	});

});
