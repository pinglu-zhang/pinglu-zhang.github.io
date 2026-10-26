(function () {
  'use strict';

  var root = document.documentElement;
  if (root.getAttribute('data-bilingual') !== 'true') return;

  var key = 'pinglu-site-language';
  var current = root.getAttribute('lang') === 'zh-CN' ? 'zh' : 'en';
  var paths = {
    en: root.getAttribute('data-language-en'),
    zh: root.getAttribute('data-language-zh')
  };
  var sections = ['about-me', '-news', '-fundings', '-publications', '-awards', '-educations'];

  function supported(value) {
    return value === 'en' || value === 'zh';
  }

  function save(language) {
    try { window.localStorage.setItem(key, language); } catch (error) { /* Storage is optional. */ }
  }

  function preferredLanguage() {
    var explicit = new URL(window.location.href).searchParams.get('lang');
    if (supported(explicit)) {
      save(explicit);
      return explicit;
    }
    try {
      var saved = window.localStorage.getItem(key);
      if (supported(saved)) return saved;
    } catch (error) { /* Continue with browser preferences. */ }
    var languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (var i = 0; i < languages.length; i++) {
      var language = String(languages[i] || '').toLowerCase().split(/[-_]/)[0];
      if (supported(language)) return language;
    }
    return 'en';
  }

  function destination(language, manual, hash) {
    var url = new URL(window.location.href);
    url.pathname = paths[language];
    if (manual) url.searchParams.set('lang', language);
    if (hash !== undefined) url.hash = hash;
    return url.href;
  }

  function redirectToPreference() {
    var preferred = preferredLanguage();
    if (preferred === current) return false;
    window.location.replace(destination(preferred, false));
    return true;
  }
  if (redirectToPreference()) return;
  // A page restored from the back-forward cache does not execute this script again.
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) redirectToPreference();
  });

  function readingSection() {
    if (window.location.hash) return window.location.hash;
    var main = document.querySelector('.page__content');
    var headings = main ? main.querySelectorAll('h1') : [];
    // Short final sections cannot always scroll up to the sticky navigation.
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= root.scrollHeight - 2) {
      return '#-educations';
    }
    var masthead = document.querySelector('.masthead');
    var threshold = (masthead ? masthead.getBoundingClientRect().height : 0) + 80;
    var section = 'about-me';
    Array.prototype.forEach.call(headings, function (heading, index) {
      if (heading.getBoundingClientRect().top <= threshold && sections[index]) section = sections[index];
    });
    return '#' + section;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var switches = document.querySelectorAll('[data-language-switch]');
    function updateLinks() {
      Array.prototype.forEach.call(switches, function (link) {
        link.href = destination(link.getAttribute('data-language-switch'), true, readingSection());
      });
    }
    updateLinks();
    window.addEventListener('hashchange', updateLinks);
    var scheduled = false;
    window.addEventListener('scroll', function () {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(function () { updateLinks(); scheduled = false; });
      }
    }, { passive: true });

    Array.prototype.forEach.call(switches, function (link) {
      link.addEventListener('click', function (event) {
        var language = link.getAttribute('data-language-switch');
        save(language);
        link.href = destination(language, true, readingSection());
        if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
          event.preventDefault();
          // Keep the legacy smooth-scroll listener from intercepting this navigation.
          event.stopImmediatePropagation();
          window.location.assign(link.href);
        }
      }, true);
    });

    // Native fragment navigation respects scroll-margin-top and updates the URL.
    // The old theme's smooth-scroll handler uses a fixed offset that hides titles.
    Array.prototype.forEach.call(document.querySelectorAll('#site-nav a[href^="#"]'), function (link) {
      link.addEventListener('click', function (event) { event.stopImmediatePropagation(); }, true);
    });

    var menu = document.querySelector('#site-nav button');
    if (menu) {
      menu.setAttribute('aria-expanded', 'false');
      var hiddenLinks = document.querySelector('#site-nav .hidden-links');
      if (hiddenLinks) {
        new MutationObserver(function () {
          menu.setAttribute('aria-expanded', String(!hiddenLinks.classList.contains('hidden')));
        }).observe(hiddenLinks, { attributes: true, attributeFilter: ['class'] });
      }
    }
  });
}());
