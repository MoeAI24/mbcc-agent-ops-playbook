(() => {
  const links = document.querySelectorAll('a[data-scroll]');
  links.forEach(a => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || !id.startsWith('#')) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth', block:'start'});
    history.replaceState(null, '', id);
  }));
})();