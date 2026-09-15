// cr0pht — small, dependency-free enhancements.
(function () {
  // Footer year.
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav.
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      });
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal sections and cards as they scroll into view.
  var targets = document.querySelectorAll('.card, .step, .work-item, .section-head, .about-grid > *, .contact-grid > *');
  if ('IntersectionObserver' in window && !reduceMotion) {
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  // Count up the hero stats once.
  var counters = document.querySelectorAll('[data-count]');
  function runCounter(el) {
    var end = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = (String(end).split('.')[1] || '').length;
    if (reduceMotion) { el.textContent = end.toFixed(decimals) + suffix; return; }
    var start = null, duration = 1200;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (end * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
      });
    });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  // Contact form: submit via fetch so the page doesn't navigate away.
  var form = document.querySelector('.contact-form');
  if (form) {
    var status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    form.appendChild(status);
    form.addEventListener('submit', function (e) {
      if (form.action.indexOf('your-form-id') !== -1) {
        e.preventDefault();
        status.className = 'form-status err';
        status.textContent = 'Form endpoint not set yet. Email cr0pht@proton.me instead.';
        return;
      }
      e.preventDefault();
      var btn = form.querySelector('button');
      btn.disabled = true;
      status.className = 'form-status';
      status.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('Request failed');
          form.reset();
          status.className = 'form-status ok';
          status.textContent = 'Thanks. We will be in touch within two working days.';
        })
        .catch(function () {
          status.className = 'form-status err';
          status.textContent = 'Something went wrong. Email cr0pht@proton.me instead.';
        })
        .finally(function () { btn.disabled = false; });
    });
  }
})();
