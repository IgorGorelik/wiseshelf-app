(function () {
  var langs = ['en', 'ru', 'he'];
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (langs.indexOf(q) >= 0) return q;
    try { var s = localStorage.getItem('lang'); if (langs.indexOf(s) >= 0) return s; } catch (e) {}
    var n = (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (n === 'iw') n = 'he';
    return langs.indexOf(n) >= 0 ? n : 'en';
  }
  function show(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.querySelectorAll('section[lang]').forEach(function (s) {
      var on = s.lang === lang;
      s.classList.toggle('on', on);
      if (on && s.dataset.title) document.title = s.dataset.title;
    });
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
    document.querySelectorAll('[data-' + lang + ']').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
    });
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () { show(b.dataset.lang); });
  });
  show(pick());
})();
