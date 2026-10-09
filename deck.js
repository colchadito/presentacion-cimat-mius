/* Visor de la presentación: escala 1280×720, navegación, contadores y diagramas */
(function () {
  'use strict';
  var stage = document.getElementById('stage');
  var slides = Array.prototype.slice.call(stage.querySelectorAll('.slide'));
  var N = slides.length, cur = -1;
  var prog = document.getElementById('prog'), cnt = document.getElementById('cnt');
  var ui = document.getElementById('ui'), ov = document.getElementById('ov'), ovg = document.getElementById('ovg');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fit() {
    var s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    stage.style.setProperty('--s', s);
    if (dg.platform) dg.platform.redraw();
  }

  // Diagramas interactivos
  var dg = {};
  dg.platform = HTI.mount(document.getElementById('dg-platform'), { view: 'arq', compact: true, plain: true, start: false });

  // Números de página
  slides.forEach(function (s, i) {
    var pg = s.querySelector('.pg');
    if (pg) pg.innerHTML = '<b>' + String(i + 1).padStart(2, '0') + '</b> / ' + String(N).padStart(2, '0');
  });

  function countUp(el) {
    var to = +el.getAttribute('data-count'), pre = el.getAttribute('data-prefix') || '';
    if (reduce) { el.textContent = pre + to; return; }
    var t0 = null, dur = 1100;
    function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + Math.round(to * e);
      if (k < 1) requestAnimationFrame(step);
    }
    el.textContent = pre + '0'; requestAnimationFrame(step);
    setTimeout(function () { el.textContent = pre + to; }, dur + 400);
  }

  function go(i, fromHash) {
    i = Math.max(0, Math.min(N - 1, i));
    if (i === cur) return;
    slides.forEach(function (s, k) { s.classList.toggle('active', k === i); s.classList.toggle('past', k < i); });
    cur = i;
    prog.style.width = ((i + 1) / N * 100) + '%';
    cnt.textContent = (i + 1) + ' / ' + N;
    try { history.replaceState(null, '', '#' + (i + 1)); } catch (e) {}
    var s = slides[i];
    Array.prototype.forEach.call(s.querySelectorAll('[data-count]'), function (el) { setTimeout(function () { countUp(el); }, 500); });
    var id = s.id;
    dg.platform.stop();
    if (id === 'sl-platform') { dg.platform.redraw(); setTimeout(function () { dg.platform.redraw(); dg.platform.start(); }, 700); }
    Array.prototype.forEach.call(ovg.children, function (b, k) { b.classList.toggle('cur', k === i); });
  }

  // Índice
  slides.forEach(function (s, i) {
    var b = document.createElement('button');
    b.innerHTML = '<em>' + String(i + 1).padStart(2, '0') + '</em><small>' + s.getAttribute('data-kicker') + '</small><b>' + s.getAttribute('data-title') + '</b>';
    b.addEventListener('click', function () { toggleOv(false); go(i); });
    ovg.appendChild(b);
  });
  function toggleOv(on) { ov.classList.toggle('open', on === undefined ? !ov.classList.contains('open') : on); }

  function fs() {
    var d = document, el = d.documentElement;
    if (d.fullscreenElement) { d.exitFullscreen && d.exitFullscreen(); }
    else if (el.requestFullscreen) { el.requestFullscreen().catch(function () {}); }
  }

  document.getElementById('bPrev').onclick = function () { go(cur - 1); };
  document.getElementById('bNext').onclick = function () { go(cur + 1); };
  document.getElementById('bOv').onclick = function () { toggleOv(); };
  document.getElementById('bFs').onclick = fs;

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;
    if (k === 'Escape') { toggleOv(false); return; }
    if (ov.classList.contains('open')) return;
    if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Enter') { e.preventDefault(); go(cur + 1); }
    else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); go(cur - 1); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(N - 1);
    else if (k === 'f' || k === 'F') fs();
    else if (k === 'g' || k === 'G' || k === 'o' || k === 'O') toggleOv();
  });

  // Gestos táctiles y rueda
  var tx = null;
  stage.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
  });
  var wheelLock = 0;
  window.addEventListener('wheel', function (e) {
    if (ov.classList.contains('open') || Math.abs(e.deltaY) < 40 || Date.now() < wheelLock) return;
    wheelLock = Date.now() + 700; go(cur + (e.deltaY > 0 ? 1 : -1));
  }, { passive: true });

  // Barra de controles: se oculta en reposo
  var idle;
  function wake() { ui.classList.remove('idle'); clearTimeout(idle); idle = setTimeout(function () { ui.classList.add('idle'); }, 2600); }
  ['mousemove', 'keydown', 'touchstart'].forEach(function (ev) { window.addEventListener(ev, wake, { passive: true }); });
  wake();

  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', function () { var n = parseInt(location.hash.slice(1), 10); if (n) go(n - 1); });
  fit();
  var start = parseInt(location.hash.slice(1), 10);
  go(start ? start - 1 : 0);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
