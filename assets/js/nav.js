(() => {
  const header = document.querySelector('.site-nav');
  const btn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (!header || !btn || !nav) return;

  const close = () => {
    header.classList.remove('menu-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
  };
  const open = () => {
    header.classList.add('menu-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
  };
  const toggle = () => {
    if (header.classList.contains('menu-open')) close(); else open();
  };

  btn.addEventListener('click', toggle);

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Close on navigation link click (mobile)
  nav.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.tagName === 'A') close();
  });
})();

