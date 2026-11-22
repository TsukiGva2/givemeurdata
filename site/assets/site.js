// Hero photo: flip to the desk shot now and then (7 s front, 3 s back).
// Off with reduced motion; waits while the tab is hidden.
(function () {
  var flip = document.querySelector('.flip');
  if (!flip || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function tick() {
    if (!document.hidden) flip.classList.toggle('flipped');
    setTimeout(tick, flip.classList.contains('flipped') ? 3000 : 7000);
  }
  setTimeout(tick, 7000);
})();
