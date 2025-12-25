(function(){
  const path = window.location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('[data-nav]').forEach(a=>{
    const href = a.getAttribute('href');
    if(!href) return;
    const normalized = href.replace(/\/index\.html$/, '/');
    if(normalized === path || (path.endsWith('/') && normalized === path)){
      a.classList.add('active');
    } else if (path.endsWith(href) || path.endsWith(normalized)) {
      a.classList.add('active');
    }
  });
})();