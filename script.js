/**
 * script.js
 * Lógica del Dashboard de Estabilidad Operativa PUC (Programa Lazos).
 * Sin frameworks. Consume HALLAZGOS / ENCUESTA / CATALOGOS definidos en data.js.
 */
(function () {
  "use strict";

  // ---------------------------------------------------------------------
  // Utilidades
  // ---------------------------------------------------------------------
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function slug(s) {
    return String(s).toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "");
  }

  function fmtDate(d) {
    if (!d) return "—";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return d; // rango textual, se muestra tal cual
    const [y, m, day] = d.split("-");
    const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
    return `${day} ${meses[parseInt(m,10)-1]} ${y}`;
  }

  function statusPillClass(estatus) {
    const map = {
      "Liberado":"pill-status--liberado", "Pruebas":"pill-status--pruebas",
      "Desarrollo":"pill-status--desarrollo", "Análisis":"pill-status--analisis",
      "Definición de Negocio":"pill-status--definicion",
      "Completada":"pill-status--completada", "En proceso":"pill-status--enproceso",
      "En validación":"pill-status--envalidacion"
    };
    return map[estatus] || "";
  }

  function critBadgeClass(crit) {
    return crit === "Bloqueante" ? "badge-crit--bloqueante" : "badge-crit--nobloqueante";
  }

  function countBy(arr, key) {
    const out = {};
    arr.forEach(item => { const k = item[key]; out[k] = (out[k] || 0) + 1; });
    return out;
  }

  // ---------------------------------------------------------------------
  // Tabs
  // ---------------------------------------------------------------------
  function initTabs() {
    $$(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        $$(".tab-btn").forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected","false"); });
        btn.classList.add("is-active"); btn.setAttribute("aria-selected","true");
        $$(".tab-panel").forEach(p => p.classList.remove("is-active"));
        $("#" + btn.dataset.tab).classList.add("is-active");
      });
    });
  }

  // =======================================================================
  // VISTA GENERAL
  // =======================================================================
  function renderResumenKPI() {
    const total = HALLAZGOS.length;
    const incidencias = HALLAZGOS.filter(h => h.clasificacion === "Incidencia").length;
    const mejoras = HALLAZGOS.filter(h => h.clasificacion === "Mejora").length;
    $("#kpi-resumen").innerHTML = `
      <div class="kpi-card kpi-card--primary">
        <span class="kpi-label">Total Hallazgos</span>
        <span class="kpi-value">${total}</span>
        <span class="kpi-sub">Incidencias + mejoras registradas</span>
      </div>
      <div class="kpi-card kpi-card--incidencia">
        <span class="kpi-label">Incidencias</span>
        <span class="kpi-value">${incidencias}</span>
        <span class="kpi-sub">${Math.round(incidencias/total*100)}% del total</span>
      </div>
      <div class="kpi-card kpi-card--mejora">
        <span class="kpi-label">Mejoras</span>
        <span class="kpi-value">${mejoras}</span>
        <span class="kpi-sub">${Math.round(mejoras/total*100)}% del total</span>
      </div>`;
  }

  function renderStatusCards() {
    const total = HALLAZGOS.length;
    const counts = countBy(HALLAZGOS, "estatus");
    const orderedStatus = CATALOGOS.estatus; // Definición → Análisis → Desarrollo → Pruebas → Liberado
    $("#status-cards").innerHTML = orderedStatus.map(st => {
      const n = counts[st] || 0;
      const pct = total ? Math.round(n/total*100) : 0;
      return `
        <div class="status-card" data-status="${st}">
          <div class="status-value">${n}</div>
          <div class="status-label">${st}</div>
          <div class="status-pct">${pct}% del total</div>
        </div>`;
    }).join("");
  }

  function renderDistribucionCharts() {
    const porFlujo = countBy(HALLAZGOS, "flujo");
    const flujoLabels = Object.keys(porFlujo);
    const flujoData = flujoLabels.map(l => porFlujo[l]);

    new Chart($("#chart-flujo"), {
      type: "bar",
      data: {
        labels: flujoLabels,
        datasets: [{ data: flujoData, backgroundColor: "#3D6BB3", borderRadius: 4, maxBarThickness: 18 }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#F1F3F6" } },
          y: { grid: { display: false } }
        }
      }
    });

    const porMedio = countBy(HALLAZGOS, "medio");
    const medioLabels = Object.keys(porMedio);
    const medioData = medioLabels.map(l => porMedio[l]);
    const palette = ["#1B3A6B","#3D6BB3","#6D96D1","#A9C2E8","#F97316","#9CA3AF"];

    new Chart($("#chart-medio"), {
      type: "doughnut",
      data: {
        labels: medioLabels,
        datasets: [{ data: medioData, backgroundColor: palette, borderColor: "#fff", borderWidth: 2 }]
      },
      options: {
        responsive: true,
        cutout: "62%",
        plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } } }
      }
    });
  }

  function renderPuntosRelevantes() {
    // Liberaciones relevantes: liberados más recientes (fecha de solución válida, orden desc)
    const liberados = HALLAZGOS
      .filter(h => h.estatus === "Liberado" && /^\d{4}-\d{2}-\d{2}$/.test(h.fechaSolucion))
      .sort((a, b) => b.fechaSolucion.localeCompare(a.fechaSolucion))
      .slice(0, 5);

    $("#lista-liberaciones").innerHTML = liberados.map(h => `
      <li>
        <div class="li-top"><span class="tag">${h.flujo}</span></div>
        <div class="li-desc">${h.descripcion}</div>
        <div class="li-meta">Liberado el ${fmtDate(h.fechaSolucion)} · ${h.clasificacion}</div>
      </li>`).join("");

    // Focos de atención: bloqueantes no liberados + elementos próximos a liberar (en Pruebas)
    const focos = HALLAZGOS
      .filter(h => (h.criticidad === "Bloqueante" && h.estatus !== "Liberado") || h.estatus === "Pruebas")
      .sort((a, b) => (a.estatus === "Pruebas" ? 1 : -1) - (b.estatus === "Pruebas" ? 1 : -1));

    $("#lista-focos").innerHTML = focos.map(h => `
      <li>
        <div class="li-top">
          <span class="tag tag--orange">${h.criticidad === "Bloqueante" ? "Bloqueante" : "Próximo a liberar"}</span>
          <span class="tag">${h.flujo}</span>
        </div>
        <div class="li-desc">${h.descripcion}</div>
        <div class="li-meta">${h.estatus} · estimado ${fmtDate(h.fechaSolucion)}</div>
      </li>`).join("");
  }

  // ---------------------------------------------------------------------
  // Filtros + Tabla
  // ---------------------------------------------------------------------
  let currentSort = { key: "id", dir: "asc" };

  function populateFilters() {
    const fill = (selId, values) => {
      const sel = $(selId);
      values.forEach(v => {
        const opt = document.createElement("option");
        opt.value = v; opt.textContent = v;
        sel.appendChild(opt);
      });
    };
    fill("#f-clasificacion", CATALOGOS.clasificacion);
    fill("#f-flujo", [...new Set(HALLAZGOS.map(h => h.flujo))].sort());
    fill("#f-estatus", CATALOGOS.estatus);
    fill("#f-responsable", [...new Set(HALLAZGOS.map(h => h.responsable))].sort());
    fill("#f-criticidad", CATALOGOS.criticidad);

    ["#f-clasificacion","#f-flujo","#f-estatus","#f-responsable","#f-criticidad"]
      .forEach(id => $(id).addEventListener("change", renderTabla));
    $("#f-buscar").addEventListener("input", renderTabla);
    $("#btn-clear-filters").addEventListener("click", () => {
      ["#f-clasificacion","#f-flujo","#f-estatus","#f-responsable","#f-criticidad"].forEach(id => $(id).value = "");
      $("#f-buscar").value = "";
      renderTabla();
    });
  }

  function getFilteredData() {
    const clasificacion = $("#f-clasificacion").value;
    const flujo = $("#f-flujo").value;
    const estatus = $("#f-estatus").value;
    const responsable = $("#f-responsable").value;
    const criticidad = $("#f-criticidad").value;
    const texto = $("#f-buscar").value.trim().toLowerCase();

    return HALLAZGOS.filter(h => {
      if (clasificacion && h.clasificacion !== clasificacion) return false;
      if (flujo && h.flujo !== flujo) return false;
      if (estatus && h.estatus !== estatus) return false;
      if (responsable && h.responsable !== responsable) return false;
      if (criticidad && h.criticidad !== criticidad) return false;
      if (texto) {
        const haystack = `${h.id} ${h.descripcion} ${h.responsable} ${h.flujo}`.toLowerCase();
        if (!haystack.includes(texto)) return false;
      }
      return true;
    });
  }

  function sortData(data) {
    const { key, dir } = currentSort;
    const mult = dir === "asc" ? 1 : -1;
    return [...data].sort((a, b) => {
      let va = a[key], vb = b[key];
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * mult;
      va = String(va ?? ""); vb = String(vb ?? "");
      return va.localeCompare(vb, "es") * mult;
    });
  }

  function renderTabla() {
    const data = sortData(getFilteredData());
    $("#table-count").textContent = `${data.length} registro${data.length === 1 ? "" : "s"}`;
    $("#tabla-hallazgos-body").innerHTML = data.map(h => `
      <tr>
        <td>${h.id}</td>
        <td>${h.flujo}</td>
        <td>${h.clasificacion}</td>
        <td><span class="badge-crit ${critBadgeClass(h.criticidad)}">${h.criticidad}</span></td>
        <td class="col-descripcion">${h.descripcion}</td>
        <td>${h.casos}</td>
        <td>${h.medio}</td>
        <td>${h.responsable}</td>
        <td><span class="pill-status ${statusPillClass(h.estatus)}">${h.estatus}</span></td>
        <td>${fmtDate(h.fechaReporte)}</td>
        <td>${fmtDate(h.fechaSolucion)}</td>
      </tr>`).join("");
  }

  function initSortableHeaders(tableSel, onSort) {
    $$(`${tableSel} thead th`).forEach(th => {
      th.addEventListener("click", () => {
        const key = th.dataset.key;
        if (currentSort.key === key) {
          currentSort.dir = currentSort.dir === "asc" ? "desc" : "asc";
        } else {
          currentSort = { key, dir: "asc" };
        }
        $$(`${tableSel} thead th`).forEach(h => h.classList.remove("sorted","sorted-asc"));
        th.classList.add(currentSort.dir === "asc" ? "sorted-asc" : "sorted");
        onSort();
      });
    });
  }

  // =======================================================================
  // ENCUESTA FUERZA DE VENTAS
  // =======================================================================
  function renderEncuestaKPI() {
    const total = ENCUESTA.totalObservaciones;
    const counts = countBy(ENCUESTA.observaciones, "estatus");
    const orden = ["Completada", "En proceso", "En validación"];
    const cards = [
      `<div class="kpi-card kpi-card--primary">
        <span class="kpi-label">Total Observaciones</span>
        <span class="kpi-value">${total}</span>
        <span class="kpi-sub">Levantadas con Líderes de Fuerza de Ventas</span>
      </div>`
    ].concat(orden.map((st, i) => {
      const n = counts[st] || 0;
      const cls = i === 0 ? "kpi-card--mejora" : (i === 1 ? "kpi-card--incidencia" : "");
      return `<div class="kpi-card ${cls}">
        <span class="kpi-label">${st}</span>
        <span class="kpi-value">${n}</span>
        <span class="kpi-sub">${Math.round(n/total*100)}% del total</span>
      </div>`;
    }));
    // Resumen: Total + "En proceso" (carga de trabajo activa) + "Completada" (resuelto)
    $("#kpi-encuesta").innerHTML = [cards[0], cards[2], cards[1]].join("");
  }

  function renderEjeChart() {
    const labels = ENCUESTA.porEje.map(e => e.eje);
    const data = ENCUESTA.porEje.map(e => e.total);
    const palette = ["#1B3A6B","#3D6BB3","#6D96D1","#A9C2E8","#F97316"];
    new Chart($("#chart-eje"), {
      type: "doughnut",
      data: { labels, datasets: [{ data, backgroundColor: palette, borderColor: "#fff", borderWidth: 2 }] },
      options: {
        responsive: true, cutout: "62%",
        plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10.5 } } } }
      }
    });
  }

  function renderTemasRecurrentes() {
    const porRubro = countBy(ENCUESTA.observaciones, "rubro");
    const entries = Object.entries(porRubro).sort((a, b) => b[1] - a[1]);
    const max = entries[0][1];
    $("#lista-temas").innerHTML = entries.map(([rubro, n]) => `
      <li>
        <span class="rank-name">${rubro}</span>
        <span class="rank-bar-track"><span class="rank-bar-fill" style="width:${(n/max*100).toFixed(0)}%"></span></span>
        <span class="rank-value">${n}</span>
      </li>`).join("");
  }

  function renderComentariosDestacados() {
    // Selección editorial: una observación representativa por eje con mayor volumen
    const destacados = [
      ENCUESTA.observaciones.find(o => o.no === 8),
      ENCUESTA.observaciones.find(o => o.no === 2),
      ENCUESTA.observaciones.find(o => o.no === 19)
    ].filter(Boolean);
    $("#quote-grid").innerHTML = destacados.map(o => `
      <div class="quote-card">
        <p class="quote-text">“${o.problematica}”</p>
        <div class="quote-meta">
          <span class="quote-rubro">${o.rubro}</span>
          <span class="pill-status ${statusPillClass(o.estatus)}">${o.estatus}</span>
        </div>
      </div>`).join("");
  }

  function renderTablaEncuesta() {
    $("#tabla-encuesta-body").innerHTML = ENCUESTA.observaciones.map(o => `
      <tr>
        <td>${o.no}</td>
        <td>${o.rubro}</td>
        <td class="col-problematica">${o.problematica}</td>
        <td>${o.eje}</td>
        <td><span class="pill-status ${statusPillClass(o.estatus)}">${o.estatus}</span></td>
        <td class="col-solucion">${o.solucion}</td>
      </tr>`).join("");
    $("#table-count-enc").textContent = `${ENCUESTA.observaciones.length} registros`;
  }

  // ---------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    initTabs();

    renderResumenKPI();
    renderStatusCards();
    renderDistribucionCharts();
    renderPuntosRelevantes();
    populateFilters();
    renderTabla();
    initSortableHeaders("#tabla-hallazgos", renderTabla);

    renderEncuestaKPI();
    renderEjeChart();
    renderTemasRecurrentes();
    renderComentariosDestacados();
    renderTablaEncuesta();
    initSortableHeaders("#tabla-encuesta", () => {
      const data = sortData(ENCUESTA.observaciones);
      $("#tabla-encuesta-body").innerHTML = data.map(o => `
        <tr>
          <td>${o.no}</td>
          <td>${o.rubro}</td>
          <td class="col-problematica">${o.problematica}</td>
          <td>${o.eje}</td>
          <td><span class="pill-status ${statusPillClass(o.estatus)}">${o.estatus}</span></td>
          <td class="col-solucion">${o.solucion}</td>
        </tr>`).join("");
    });
  });
})();
