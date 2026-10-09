/* Health Tower Intelligence — diagramas interactivos (arquitectura y árbol de proyectos)
   Módulo compartido por la presentación HTML y el artefacto. Sin dependencias. */
(function (g) {
  'use strict';

  var DOMAINS = [
    { id: 'D1', name: 'Demanda y Comercial', sub: 'Qué comprar, qué vender y a quién', tone: 'dorado', projects: ['P1', 'P8', 'P5'] },
    { id: 'D2', name: 'Logística y Red Fría', sub: 'Almacén, transporte y temperatura', tone: 'verde', projects: ['P2', 'P4', 'P7'] },
    { id: 'D3', name: 'Equipos y Clínicas', sub: 'Disponibilidad y capacidad operativa', tone: 'guinda', projects: ['P3', 'P6'] }
  ];

  var ENGINES = [
    { id: 'E1', name: 'Pronóstico y estadística' },
    { id: 'E2', name: 'Optimización' },
    { id: 'E3', name: 'Machine learning y anomalías' },
    { id: 'E4', name: 'PLN y visión computacional' }
  ];

  var SOURCES = [
    { id: 'S1', name: 'ERP · Ventas · Compras' },
    { id: 'S2', name: 'WMS · TMS · Pedidos' },
    { id: 'S3', name: 'IoT · Sensores · GPS' },
    { id: 'S4', name: 'Equipos y mantenimiento' },
    { id: 'S5', name: 'Clínicas de hemodiálisis' },
    { id: 'S6', name: 'Documentos y catálogo' }
  ];

  var PROJECTS = {
    P1: { n: 1, domain: 'D1', short: 'Inventarios', name: 'Pronóstico de demanda y optimización de inventarios médicos',
      caps: 'Ciencia de Datos · Estadística · Optimización', engines: ['E1', 'E2'], sources: ['S1', 'S2'],
      problem: 'Exceso de inventario, faltantes, caducidades y compras deficientes.',
      solution: 'Pronóstico por SKU a 7, 30, 60 y 90 días, y una recomendación de cuánto comprar, cuándo y dónde tenerlo.',
      kpis: ['Fill rate', 'Stockout rate', 'Rotación', 'Días de inventario', 'Error de pronóstico', 'Inventario caducado'],
      formula: 'Q* = f(D, lead time, stock, costo, caducidad, nivel de servicio)' },
    P2: { n: 2, domain: 'D2', short: 'Control Tower logístico', name: 'Control Tower inteligente de logística médica',
      caps: 'IA · Optimización · Software', engines: ['E2', 'E3'], sources: ['S2', 'S1'],
      problem: 'Retrasos, rutas, entregas, almacenes y picking sin una vista que ayude a decidir.',
      solution: 'Un motor de decisión que optimiza inventario, rutas, capacidad y prioridad médica con VRP, programación entera y metaheurísticas.',
      kpis: ['Costo por pedido', 'Nivel de servicio', 'Retrasos', 'Utilización de flota'],
      formula: 'min (α·Costo + β·Tiempo + γ·Retrasos + δ·Riesgo)' },
    P3: { n: 3, domain: 'D3', short: 'Mantenimiento predictivo', name: 'Mantenimiento predictivo de equipo médico',
      caps: 'ML · Estadística · Software', engines: ['E3'], sources: ['S4', 'S3'],
      problem: 'Fallas, mantenimiento reactivo y baja disponibilidad de bombas de infusión y equipo hospitalario.',
      solution: 'Probabilidad de falla por equipo y optimización de qué técnico enviar, qué pieza llevar y cuándo intervenir.',
      kpis: ['MTBF', 'MTTR', 'Disponibilidad', 'Equipos críticos'],
      formula: 'P(Falla t+h | X)' },
    P4: { n: 4, domain: 'D2', short: 'Red fría', name: 'ColdChain AI: trazabilidad inteligente y red fría',
      caps: 'IoT · Analítica · IA', engines: ['E1', 'E3'], sources: ['S3', 'S2'],
      problem: 'Excursiones de temperatura, pérdida de producto y cumplimiento regulatorio.',
      solution: 'Sensores IoT alimentan un motor de anomalías que avisa del riesgo de desviación térmica antes de que ocurra.',
      kpis: ['Excursiones de temperatura', 'Riesgo por envío', 'Producto perdido'],
      formula: 'RiskScore = f(T, H, t, ruta, equipo, producto)' },
    P5: { n: 5, domain: 'D1', short: 'Licitaciones IA', name: 'MIUS Tender AI: análisis de licitaciones y ventas institucionales',
      caps: 'PLN · LLM · Software', engines: ['E4'], sources: ['S6', 'S1'],
      problem: 'Análisis manual de bases con cientos de páginas y miles de partidas.',
      solution: 'Un LLM lee la licitación y la cruza con catálogo, inventario, precios, registros sanitarios y fichas técnicas.',
      kpis: ['Coincidencia con catálogo', 'Riesgo de cumplimiento', 'Tiempo de respuesta'],
      formula: 'Partida → coincidencia de catálogo → stock → documentación' },
    P6: { n: 6, domain: 'D3', short: 'Hemodiálisis', name: 'Analítica operacional de unidades de hemodiálisis',
      caps: 'Estadística · Optimización · BI', engines: ['E1', 'E2'], sources: ['S5', 'S4'],
      problem: 'Utilización de máquinas, turnos, consumibles y capacidad sin optimizar.',
      solution: 'Programación de sesiones, tiempos muertos y consumo de insumos con analítica operacional, sin IA diagnóstica.',
      kpis: ['Utilización', 'Tiempos muertos', 'Ocupación', 'Consumo de insumos'],
      formula: 'Utilización = horas operativas / horas disponibles' },
    P7: { n: 7, domain: 'D2', short: 'Visión en almacén', name: 'Visión computacional para almacenes médicos',
      caps: 'Visión computacional · OCR', engines: ['E4'], sources: ['S3', 'S2'],
      problem: 'Errores de picking, lote, caducidad y conteo en una operación donde un error es equipo médico.',
      solution: 'Una cámara con OCR y códigos QR valida producto, lote, caducidad y cantidad antes de que salga el pedido.',
      kpis: ['Errores de picking', 'Lotes incorrectos', 'Exactitud de conteo'],
      formula: 'Pedido vs. paquete: SKU · lote · caducidad · cantidad' },
    P8: { n: 8, domain: 'D1', short: 'Inteligencia comercial', name: 'Inteligencia comercial y forecasting',
      caps: 'BI · ML · Estadística', engines: ['E1', 'E3'], sources: ['S1'],
      problem: 'Segmentación, ventas y recomendación de producto para hospitales, clínicas y farmacias.',
      solution: 'Segmentación RFM, propensión de compra, siguiente mejor producto y predicción de abandono.',
      kpis: ['Propensión de compra', 'Abandono (churn)', 'Margen por segmento'],
      formula: 'P(Compra SKU i | Cliente j) · P(Churn)' }
  };

  var ORDER = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'];
  var DOMAIN_BY_ID = {}; DOMAINS.forEach(function (d) { DOMAIN_BY_ID[d.id] = d; });
  var NS = 'http://www.w3.org/2000/svg';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function chip(kind, o) { return '<span class="hti-chip" data-kind="' + kind + '" data-id="' + o.id + '">' + esc(o.name) + '</span>'; }

  function projBtn(id, long, plain) {
    var p = PROJECTS[id], d = DOMAIN_BY_ID[p.domain];
    return '<button type="button" class="hti-proj tone-' + d.tone + '" data-kind="proj" data-id="' + id + '" aria-pressed="false">' +
      '<span class="hti-num">' + (plain ? '' : p.n) + '</span><span class="hti-pt"><b>' + esc(p.short) + '</b>' +
      '<small>' + esc(long ? p.name : p.caps) + '</small></span>' +
      (!plain && p.n <= 3 ? '<i class="hti-top3" title="Propuesta para la primera reunión"></i>' : '') + '</button>';
  }

  function arqHTML(plain) {
    var h = '<div class="hti-row"><div class="hti-tag">Decisión</div>' +
      '<div class="hti-tower" data-kind="tower"><div class="hti-tower-t"><b>Health Tower Intelligence</b>' +
      '<small>' + (plain ? 'Plataforma modular de datos y analítica para MIUS' : 'Decision Intelligence de la plataforma MIUS') + '</small></div>' +
      '<div class="hti-tower-c"><span>KPIs en vivo</span><span>Alertas de riesgo</span><span>Recomendaciones</span><span>Priorización clínica</span></div></div></div>';
    h += '<div class="hti-row"><div class="hti-tag">' + (plain ? 'Módulos' : '8 proyectos') + '</div><div class="hti-domains">';
    DOMAINS.forEach(function (d) {
      h += '<section class="hti-domain tone-' + d.tone + '" data-kind="domain" data-id="' + d.id + '">' +
        '<header><b>' + esc(d.name) + '</b><small>' + esc(d.sub) + '</small></header><div class="hti-projs">';
      d.projects.forEach(function (pid) { h += projBtn(pid, false, plain); });
      h += '</div></section>';
    });
    h += '</div></div>';
    h += '<div class="hti-row"><div class="hti-tag">Motores</div><div class="hti-engines">' + ENGINES.map(function (e) { return chip('engine', e); }).join('') + '</div></div>';
    h += '<div class="hti-row"><div class="hti-tag">Datos</div><div class="hti-data"><div class="hti-data-t">Plataforma de datos e integración</div><div class="hti-sources">' +
      SOURCES.map(function (s) { return chip('source', s); }).join('') + '</div></div></div>';
    return h;
  }

  function treeHTML(compact) {
    var h = '<div class="hti-troot" data-kind="root"><b>MIUS Health Intelligence Platform</b>' +
      '<small>Una plataforma, tres dominios, ocho proyectos</small></div><div class="hti-tdomains">';
    DOMAINS.forEach(function (d) {
      h += '<div class="hti-tcol"><div class="hti-tnode tone-' + d.tone + '" data-kind="domain" data-id="' + d.id + '"><b>' + esc(d.name) + '</b><small>' + esc(d.sub) + '</small></div><div class="hti-tleaves">';
      d.projects.forEach(function (pid) { h += projBtn(pid, !compact); });
      h += '</div></div>';
    });
    h += '</div><div class="hti-tdata"><div class="hti-data-t">Plataforma de datos transversal</div><div class="hti-sources">' +
      SOURCES.map(function (s) { return chip('source', s); }).join('') + '</div></div>';
    return h;
  }

  function panelHTML(id, plain) {
    var p = PROJECTS[id], d = DOMAIN_BY_ID[p.domain];
    return '<div class="hti-pn-head tone-' + d.tone + '"><span class="hti-num">' + (plain ? '' : p.n) + '</span><div><div class="hti-pn-dom">' + esc(d.name) +
      (!plain && p.n <= 3 ? ' · <em>Primera reunión</em>' : '') + '</div><div class="hti-pn-name">' + esc(p.name) + '</div><div class="hti-pn-caps">' + esc(p.caps) + '</div></div></div>' +
      '<div class="hti-pn-body"><div><h4>Problema</h4><p>' + esc(p.problem) + '</p></div><div><h4>Solución CIMAT</h4><p>' + esc(p.solution) + '</p></div></div>' +
      '<div class="hti-pn-kpi"><h4>KPIs</h4><div class="hti-kpis">' + p.kpis.map(function (k) { return '<span>' + esc(k) + '</span>'; }).join('') + '</div><code>' + esc(p.formula) + '</code></div>';
  }

  function mount(root, opts) {
    opts = opts || {};
    var view = opts.view === 'tree' ? 'tree' : 'arq', plain = !!opts.plain;
    root.classList.toggle('hti-plain', plain);
    var reduce = g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var auto = opts.autoplay !== false && !reduce, timer = null, idx = 0, active = null;
    root.classList.add('hti', 'hti-' + view);
    if (opts.compact) root.classList.add('hti-compact');
    root.innerHTML = '<div class="hti-stage">' + (view === 'tree' ? treeHTML(!!opts.compact) : arqHTML(plain)) +
      '<svg class="hti-links" aria-hidden="true"></svg></div>' +
      (plain ? '' : '<div class="hti-legend"><i></i>Prioridad 1 a 3: propuesta para la primera reunión</div>') +
      '<div class="hti-panel" aria-live="polite"></div>' +
      '<button type="button" class="hti-play" aria-pressed="' + auto + '"></button>';
    var stage = root.querySelector('.hti-stage'), svg = root.querySelector('.hti-links');
    var panel = root.querySelector('.hti-panel'), play = root.querySelector('.hti-play');

    function q(sel) { return Array.prototype.slice.call(stage.querySelectorAll(sel)); }
    function node(kind, id) { return stage.querySelector('[data-kind="' + kind + '"][data-id="' + id + '"]'); }
    function geom(el) {
      var s = stage.getBoundingClientRect(), r = el.getBoundingClientRect(), k = s.width / stage.offsetWidth || 1;
      return { l: (r.left - s.left) / k, t: (r.top - s.top) / k, w: r.width / k, h: r.height / k };
    }
    function path(x1, y1, x2, y2, cls, tone, vertical) {
      var p = document.createElementNS(NS, 'path'), m = (y1 + y2) / 2, d;
      d = vertical === false ? 'M' + x1 + ' ' + y1 + ' L' + x1 + ' ' + y2 + ' L' + x2 + ' ' + y2
        : 'M' + x1 + ' ' + y1 + ' C' + x1 + ' ' + m + ' ' + x2 + ' ' + m + ' ' + x2 + ' ' + y2;
      p.setAttribute('d', d); p.setAttribute('class', cls + (tone ? ' tone-' + tone : ''));
      if (cls.indexOf('hot') > -1) p.setAttribute('pathLength', '1');
      svg.appendChild(p); return p;
    }
    function bottomC(el) { var o = geom(el); return { x: o.l + o.w / 2, y: o.t + o.h }; }
    function topC(el) { var o = geom(el); return { x: o.l + o.w / 2, y: o.t }; }

    function drawLinks() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      if (!stage.offsetWidth || getComputedStyle(svg).display === 'none') return;
      var p = active && PROJECTS[active], dom = p && DOMAIN_BY_ID[p.domain];
      if (view === 'tree') {
        var rootB = bottomC(stage.querySelector('[data-kind="root"]'));
        DOMAINS.forEach(function (d) {
          var dn = node('domain', d.id), dt = topC(dn), dg = geom(dn);
          path(rootB.x, rootB.y, dt.x, dt.y, 'base');
          d.projects.forEach(function (pid) {
            var lg = geom(node('proj', pid)), x0 = dg.l + 16;
            path(x0, dg.t + dg.h, lg.l, lg.t + lg.h / 2, 'base', '', false);
          });
        });
        if (p) {
          var dn2 = node('domain', dom.id), dt2 = topC(dn2), dg2 = geom(dn2), lg2 = geom(node('proj', active));
          path(rootB.x, rootB.y, dt2.x, dt2.y, 'hot', dom.tone);
          path(dg2.l + 16, dg2.t + dg2.h, lg2.l, lg2.t + lg2.h / 2, 'hot', dom.tone, false);
        }
        return;
      }
      if (plain) {
        var tw = stage.querySelector('[data-kind="tower"]'), twb = bottomC(tw);
        DOMAINS.forEach(function (d) { var tt = topC(node('domain', d.id)); path(twb.x, twb.y, tt.x, tt.y, 'base'); });
      }
      if (!p) return;
      var dEl = node('domain', dom.id), tower = stage.querySelector('[data-kind="tower"]');
      var dt3 = topC(dEl), tb = bottomC(tower), db = bottomC(dEl);
      path(dt3.x, dt3.y, Math.max(geom(tower).l + 40, Math.min(dt3.x, geom(tower).l + geom(tower).w - 40)), tb.y, 'hot', dom.tone);
      p.engines.forEach(function (eid) {
        var eT = topC(node('engine', eid));
        path(db.x, db.y, eT.x, eT.y, 'hot', dom.tone);
        p.sources.forEach(function (sid) { var sT = topC(node('source', sid)), eB = bottomC(node('engine', eid)); path(sT.x, sT.y, eB.x, eB.y, 'hot', dom.tone); });
      });
    }

    function setActive(id) {
      active = id;
      var p = PROJECTS[id], rel = {};
      rel['proj:' + id] = 1; rel['domain:' + p.domain] = 1;
      p.engines.forEach(function (e) { rel['engine:' + e] = 1; });
      p.sources.forEach(function (s) { rel['source:' + s] = 1; });
      q('[data-kind]').forEach(function (el) {
        var k = el.getAttribute('data-kind'), key = k + ':' + el.getAttribute('data-id');
        var on = k === 'tower' || k === 'root' || rel[key];
        el.classList.toggle('is-on', !!on); el.classList.toggle('is-dim', !on);
        if (k === 'proj') { el.classList.toggle('is-active', el.getAttribute('data-id') === id); el.setAttribute('aria-pressed', el.getAttribute('data-id') === id); }
      });
      root.setAttribute('data-tone', DOMAIN_BY_ID[p.domain].tone);
      panel.innerHTML = panelHTML(id, plain);
      panel.classList.remove('hti-swap'); void panel.offsetWidth; panel.classList.add('hti-swap');
      drawLinks();
    }

    function tick() { idx = (idx + 1) % ORDER.length; setActive(ORDER[idx]); }
    function start() { if (auto && !timer) timer = setInterval(function () { if (!document.hidden) tick(); }, opts.interval || 4200); syncPlay(); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } syncPlay(); }
    function syncPlay() {
      play.setAttribute('aria-pressed', !!timer);
      play.textContent = timer ? 'Pausar recorrido' : 'Reanudar recorrido';
      play.hidden = reduce;
    }
    function userPick(id) { auto = false; stop(); idx = ORDER.indexOf(id); setActive(id); }

    stage.addEventListener('pointerover', function (e) { var b = e.target.closest('.hti-proj'); if (b && stage.contains(b) && b.getAttribute('data-id') !== active) userPick(b.getAttribute('data-id')); });
    stage.addEventListener('click', function (e) { var b = e.target.closest('.hti-proj'); if (b) userPick(b.getAttribute('data-id')); });
    stage.addEventListener('focusin', function (e) { var b = e.target.closest('.hti-proj'); if (b && b.getAttribute('data-id') !== active) userPick(b.getAttribute('data-id')); });
    play.addEventListener('click', function () { if (timer) { auto = false; stop(); } else { auto = true; start(); } });

    if (g.ResizeObserver) new ResizeObserver(function () { drawLinks(); }).observe(stage);
    g.addEventListener('resize', drawLinks);
    setActive(opts.initial || 'P1');
    syncPlay();
    if (opts.start !== false) start();
    return { start: start, stop: stop, redraw: drawLinks, select: userPick };
  }

  g.HTI = { mount: mount, data: { DOMAINS: DOMAINS, PROJECTS: PROJECTS, ENGINES: ENGINES, SOURCES: SOURCES } };
})(window);
