(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const syncTheme = () => {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
    toggle.textContent = dark ? 'Modo claro' : 'Modo oscuro';
  };
  toggle.hidden = false;
  syncTheme();
  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch {}
    syncTheme();
  });
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
  colorScheme.addEventListener('change', event => {
    let saved;
    try { saved = localStorage.getItem('portfolio-theme'); } catch {}
    if (saved !== 'light' && saved !== 'dark') {
      root.dataset.theme = event.matches ? 'dark' : 'light';
      syncTheme();
    }
  });
  const menu = document.querySelector('.menu-toggle');
  const links = document.querySelector('.navigation-links');
  const mobile = window.matchMedia('(max-width: 760px)');
  const closeMenu = () => {
    menu.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  };
  root.classList.add('js');
  menu.hidden = false;
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    links.classList.toggle('is-open', open);
  });
  links.addEventListener('click', event => {
    if (event.target.closest('a')) {
      closeMenu();
      if (mobile.matches) menu.focus({preventScroll: true});
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  mobile.addEventListener('change', closeMenu);
  document.addEventListener('click', event => {
    if (!event.target.closest('.navigation')) closeMenu();
  });
})();
