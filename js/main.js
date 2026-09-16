// cr0pht — small, dependency-free enhancements.
(function () {
  // Footer year.
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal sections as they scroll into view.
  var targets = document.querySelectorAll('.section-head, .contact-grid > *');
  if ('IntersectionObserver' in window && !reduceMotion) {
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    targets.forEach(function (el) { io.observe(el); });
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
