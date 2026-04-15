document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.burger-btn');
  const closeBtn = document.querySelector('.close-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const root = document.documentElement;
  const body = document.body;

  const lockPage = () => {
    root.classList.add('menu-open');
    body.classList.add('menu-open');
  };

  const unlockPage = () => {
    root.classList.remove('menu-open');
    body.classList.remove('menu-open');
  };

  const openMenu = () => {
    if (!burgerBtn || !mobileMenu) return;
    mobileMenu.classList.add('is-active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    burgerBtn.setAttribute('aria-expanded', 'true');
    lockPage();
  };

  const closeMenu = () => {
    if (!burgerBtn || !mobileMenu) return;
    mobileMenu.classList.remove('is-active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    burgerBtn.setAttribute('aria-expanded', 'false');
    unlockPage();
  };

  if (burgerBtn && closeBtn && mobileMenu) {
    burgerBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    mobileMenu.addEventListener('click', (event) => {
      if (event.target === mobileMenu) closeMenu();
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) closeMenu();
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('.accordion-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      if (!content) return;
      const isActive = content.classList.contains('is-active');

      document.querySelectorAll('.accordion-content').forEach((panel) => {
        panel.classList.remove('is-active');
      });

      if (!isActive) {
        content.classList.add('is-active');
      }
    });
  });
});
