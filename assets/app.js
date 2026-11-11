(() => {
  const sidebar = document.getElementById('sidebar');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('searchOverlay');
  const modalSearch = document.getElementById('modalSearch');
  const searchResults = document.getElementById('searchResults');
  const docSearch = document.getElementById('docSearch');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('.doc-section[id]')];

  function copyText(text, button) {
    const decoded = text.replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&#39;', "'");
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(decoded).then(() => copied(button)).catch(() => fallbackCopy(decoded, button));
    } else fallbackCopy(decoded, button);
  }
  function copied(button) {
    if (!button) return;
    const old = button.textContent;
    button.textContent = 'Copied';
    button.classList.add('copied');
    setTimeout(() => { button.textContent = old; button.classList.remove('copied'); }, 1400);
  }
  function fallbackCopy(text, button) {
    const el = document.createElement('textarea');
    el.value = text; el.style.position = 'fixed'; el.style.opacity = '0';
    document.body.appendChild(el); el.select();
    try { document.execCommand('copy'); copied(button); } catch (_) {}
    el.remove();
  }
  document.addEventListener('click', e => {
    const button = e.target.closest('[data-copy]');
    if (button) copyText(button.dataset.copy, button);
  });

  mobileMenu?.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    mobileMenu.setAttribute('aria-expanded', String(open));
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    navLinks.forEach(x => x.classList.remove('active'));
    link.classList.add('active');
    sidebar.classList.remove('open');
    mobileMenu?.setAttribute('aria-expanded', 'false');
  }));

  const searchable = sections.map(section => ({
    id: section.id,
    title: section.dataset.title || section.querySelector('h2')?.textContent || section.id,
    text: section.innerText.toLowerCase().slice(0, 4000)
  }));
  function runSearch(value, target) {
    const q = value.trim().toLowerCase();
    target.innerHTML = '';
    if (!q) { target.innerHTML = '<p>Type to search documentation</p>'; return; }
    const hits = searchable.filter(item => item.title.toLowerCase().includes(q) || item.text.includes(q)).slice(0, 12);
    if (!hits.length) { target.innerHTML = '<div class="search-empty">No results found. Try another keyword.</div>'; return; }
    hits.forEach(item => {
      const a = document.createElement('a'); a.className = 'search-result'; a.href = `#${item.id}`;
      const strong = document.createElement('strong'); strong.textContent = item.title;
      const span = document.createElement('span'); span.textContent = item.id.replaceAll('-', ' ');
      a.append(strong, span); a.addEventListener('click', closeSearch); target.append(a);
    });
  }
  function openSearch() { overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); setTimeout(() => modalSearch.focus(), 30); }
  function closeSearch() { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); modalSearch.value = ''; }
  docSearch?.addEventListener('focus', openSearch);
  docSearch?.addEventListener('click', openSearch);
  modalSearch?.addEventListener('input', () => runSearch(modalSearch.value, searchResults));
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') closeSearch();
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin: '-18% 0px -72% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));

  const hash = location.hash;
  if (hash) {
    const link = navLinks.find(x => x.getAttribute('href') === hash);
    if (link) { navLinks.forEach(x => x.classList.remove('active')); link.classList.add('active'); }
  }
})();
