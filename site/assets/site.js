// Home page motion. Both pieces stay still with reduced motion and pause in a hidden tab.
(function () {
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero photo: flip to the desk shot now and then (7 s front, 3 s back).
  var flip = document.querySelector('.flip');
  if (flip && !still) {
    var tick = function () {
      if (!document.hidden) flip.classList.toggle('flipped');
      setTimeout(tick, flip.classList.contains('flipped') ? 3000 : 7000);
    };
    setTimeout(tick, 7000);
  }

  // Quote: rotate through the list every 8 s while on screen; pauses on hover or focus.
  var box = document.querySelector('[data-quotes]'), data = document.getElementById('quotes');
  if (!box || !data) return;
  var quotes = JSON.parse(data.textContent), i = 0, seen = false, held = false;
  var text = box.querySelector('blockquote p'), who = box.querySelector('figcaption');
  function show(n) { i = n % quotes.length; text.textContent = quotes[i][0]; who.textContent = quotes[i][1]; }
  if (still) { show(Math.floor(Math.random() * quotes.length)); return; } // one quote per visit, no rotation
  box.addEventListener('mouseenter', function () { held = true; });
  box.addEventListener('mouseleave', function () { held = false; });
  box.addEventListener('focusin', function () { held = true; });
  box.addEventListener('focusout', function () { held = false; });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { seen = es[0].isIntersecting; }).observe(box);
  else seen = true;
  setInterval(function () {
    if (!seen || held || document.hidden) return;
    box.classList.add('fading');
    setTimeout(function () { show(i + 1); box.classList.remove('fading'); }, 300);
  }, 8000);
})();
