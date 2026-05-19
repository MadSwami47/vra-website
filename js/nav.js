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
    if (!href) return;
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });
})();
