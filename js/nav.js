(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Scroll shadow
  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile burger toggle
  const burger = nav.querySelector('.nav-burger');
  if (burger) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      const expanded = nav.classList.contains('nav-open');
      burger.setAttribute('aria-expanded', String(expanded));
    });
  }

  // Mark active page link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });

  // ─── Hover dropdowns (Coverage, etc.) ───
  const CLOSE_DELAY_MS = 250;
  const dropdowns = nav.querySelectorAll('.nav-dropdown');

  dropdowns.forEach((dropdown) => {
    let closeTimer = null;
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    const open = () => {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      // Close other open dropdowns
      dropdowns.forEach((d) => { if (d !== dropdown) d.classList.remove('is-open'); });
      dropdown.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    };
    const scheduleClose = () => {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }, CLOSE_DELAY_MS);
    };
    const closeNow = () => {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      dropdown.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    // Hover (desktop)
    dropdown.addEventListener('mouseenter', open);
    dropdown.addEventListener('mouseleave', scheduleClose);

    // Click toggle (mobile + keyboard)
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (dropdown.classList.contains('is-open')) closeNow();
      else open();
    });

    // Keyboard support
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (dropdown.classList.contains('is-open')) closeNow();
        else open();
      } else if (e.key === 'Escape') {
        closeNow();
        trigger.focus();
      }
    });
  });

  // Close any open dropdown when clicking outside
  document.addEventListener('click', (e) => {
    dropdowns.forEach((d) => {
      if (!d.contains(e.target)) {
        d.classList.remove('is-open');
        const t = d.querySelector('.nav-dropdown-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Esc closes everything (when focus is anywhere)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach((d) => {
        d.classList.remove('is-open');
        const t = d.querySelector('.nav-dropdown-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
})();
