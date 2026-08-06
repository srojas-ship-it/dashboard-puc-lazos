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

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  }

  // ---------------------------------------------------------------------
  // Gráficos SVG nativos (sin librerías externas / sin CDN) — funcionan
  // sin conexión a internet, importante en redes corporativas restringidas.
  // ---------------------------------------------------------------------
  // Semáforo de estatus (mismo criterio que Focos de Atención y la tabla):
  // Liberado=verde, Pruebas=amarillo, Análisis/Desarrollo/Definición de Negocio=naranja.
  function estatusDotColor(estatus) {
    if (estatus === "Liberado") return "#16A34A";
    if (estatus === "Pruebas") return "#F59E0B";
    return "#F97316";
  }

  // Hallazgos por Flujo: dos barras por flujo (Incidencias / Mejoras), cada una
  // segmentada por estatus con el semáforo (verde/amarillo/naranja). El color comunica
  // el estatus al instante y el número dentro de cada segmento conserva la precisión
  // que necesita Dirección. Diseño acordado con Dirección tras evaluar alternativas.
  function renderFlujoBreakdown(containerId) {
    const el = $(containerId);
    if (!el) return;

    const porFlujo = {};
    HALLAZGOS.forEach(h => {
      if (!porFlujo[h.flujo]) porFlujo[h.flujo] = { total: 0, inc: { total: 0, byEstatus: {} }, mej: { total: 0, byEstatus: {} } };
      const f = porFlujo[h.flujo];
      f.total++;
      const bucket = h.clasificacion === "Incidencia" ? f.inc : f.mej;
      bucket.total++;
      bucket.byEstatus[h.estatus] = (bucket.byEstatus[h.estatus] || 0) + 1;
    });

    const entradas = Object.entries(porFlujo).sort((a, b) => b[1].total - a[1].total);

    // El ancho de cada barra debe representar su magnitud real, no solo repartir el
    // 100% del espacio disponible (eso hacía que un total de 1 se viera igual de largo
    // que uno de 6). Se escala contra el mayor bucket Incidencias/Mejoras del gráfico.
    let maxBucket = 1;
    entradas.forEach(([, f]) => { maxBucket = Math.max(maxBucket, f.inc.total, f.mej.total); });

    function segmentos(bucket) {
      return CATALOGOS.estatus.filter(st => bucket.byEstatus[st]).map(st => {
        const n = bucket.byEstatus[st];
        const pct = (n / bucket.total) * 100;
        const color = estatusDotColor(st);
        const textColor = st === "Pruebas" ? "#78350F" : "#FFFFFF";
        return `<div class="flujo-seg" style="width:${pct}%; background:${color}; color:${textColor};" title="${st}: ${n}">${n}</div>`;
      }).join("");
    }

    function subBar(bucket, etiqueta) {
      if (!bucket.total) return "";
      const anchoPct = (bucket.total / maxBucket) * 100;
      return `
        <div class="flujo-subrow">
          <span class="flujo-sublabel">${etiqueta} ${bucket.total}</span>
          <div class="flujo-subbar-track">
            <div class="flujo-subbar" style="width:${anchoPct}%">${segmentos(bucket)}</div>
          </div>
        </div>`;
    }

    const legend = `
      <div class="flujo-legend">
        <span><span class="flujo-legend-dot" style="background:#16A34A"></span>Liberado</span>
        <span><span class="flujo-legend-dot" style="background:#F59E0B"></span>Pruebas</span>
        <span><span class="flujo-legend-dot" style="background:#F97316"></span>Análisis / Desarrollo / Definición</span>
      </div>`;

    const filas = entradas.map(([flujo, f]) => `
      <div class="flujo-row">
        <div class="flujo-row-header">
          <span class="flujo-name">${escapeHtml(flujo)}</span>
          <span class="flujo-total">${f.total}</span>
        </div>
        ${subBar(f.inc, "Incidencias")}
        ${subBar(f.mej, "Mejoras")}
      </div>`).join("");

    el.innerHTML = legend + filas;
  }

  function renderDoughnutChart(containerId, labels, data, colors) {
    const el = $(containerId);
    if (!el || !labels.length) return;
    const total = data.reduce((a, b) => a + b, 0) || 1;
    const r = 40, cx = 50, cy = 50, sw = 16;
    const circumference = 2 * Math.PI * r;
    let offset = 0;
    const segments = labels.map((label, i) => {
      const frac = data[i] / total;
      const dash = frac * circumference;
      const seg = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors[i % colors.length]}"
        stroke-width="${sw}" stroke-dasharray="${dash} ${circumference - dash}"
        stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})"></circle>`;
      offset += dash;
      return seg;
    }).join("");
    const bg = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#F1F3F6" stroke-width="${sw}"></circle>`;
    const legend = labels.map((label, i) => `
      <div class="svgc-legend-item">
        <span class="svgc-swatch" style="background:${colors[i % colors.length]}"></span>
        ${escapeHtml(label)}<b>${data[i]}</b>
      </div>`).join("");
    el.innerHTML = `
      <div class="svgc-donut-wrap">
        <svg viewBox="0 0 100 100" class="svgc-donut" role="img" aria-label="Gráfico de dona">${bg}${segments}</svg>
        <div class="svgc-legend">${legend}</div>
      </div>`;
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
    const orderedStatus = CATALOGOS.estatus; // Liberado → Pruebas → Desarrollo → Análisis → Definición
    $("#status-cards").innerHTML = orderedStatus.map(st => {
      const n = counts[st] || 0;
      const pct = total ? Math.round(n/total*100) : 0;
      const enEstado = HALLAZGOS.filter(h => h.estatus === st);
      const incidencias = enEstado.filter(h => h.clasificacion === "Incidencia").length;
      const mejoras = enEstado.filter(h => h.clasificacion === "Mejora").length;
      const partes = [];
      if (incidencias) partes.push(`${incidencias} incidencia${incidencias === 1 ? "" : "s"}`);
      if (mejoras) partes.push(`${mejoras} mejora${mejoras === 1 ? "" : "s"}`);
      const desglose = partes.join(" · ");
      return `
        <div class="status-card" data-status="${st}">
          <div class="status-value">${n}</div>
          <div class="status-label">${st}</div>
          ${desglose ? `<div class="status-breakdown">${desglose}</div>` : ""}
          <div class="status-pct">${pct}% del total</div>
        </div>`;
    }).join("");
  }

  // Ordena un conteo {etiqueta: total} de mayor a menor y separa labels/valores.
  function sortCountsDesc(counts) {
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return [entries.map(e => e[0]), entries.map(e => e[1])];
  }

  function renderDistribucionCharts() {
    renderFlujoBreakdown("#flujo-breakdown");

    const [medioLabels, medioData] = sortCountsDesc(countBy(HALLAZGOS, "medio"));
    const palette = ["#1B3A6B","#3D6BB3","#6D96D1","#A9C2E8","#F97316","#9CA3AF"];
    renderDoughnutChart("#chart-medio", medioLabels, medioData, palette);
  }

  // Semáforo de estatus: Liberado=verde, Pruebas ("próximo a liberar")=amarillo,
  // Análisis/Desarrollo/Definición de Negocio=naranja.
  function estatusTagClass(estatus) {
    if (estatus === "Liberado") return "tag--green";
    if (estatus === "Pruebas") return "tag--yellow";
    return "tag--orange";
  }

  function renderPuntosRelevantes() {
    // Liberaciones relevantes: liberados más recientes (fecha de solución válida, orden desc)
    const liberados = HALLAZGOS
      .filter(h => h.estatus === "Liberado" && /^\d{4}-\d{2}-\d{2}$/.test(h.fechaSolucion))
      .sort((a, b) => b.fechaSolucion.localeCompare(a.fechaSolucion))
      .slice(0, 5);

    // Punto fijo: consolida los 3 hallazgos de error al solicitar entrega de TDD (ids 4, 5, 6).
    // Va al final de la lista (no pineado arriba): por fecha (10 jul) es el más antiguo del
    // grupo, así que ese es justo su lugar natural en un orden de más reciente a más antiguo.
    const liberacionesHtml = liberados.map(h => `
      <li>
        <div class="li-top"><span class="tag">${h.flujo}</span></div>
        <div class="li-desc">${h.descripcion}</div>
        <div class="li-meta">Liberado el ${fmtDate(h.fechaSolucion)} · ${h.clasificacion}</div>
      </li>`)
      .concat([`
      <li>
        <div class="li-top"><span class="tag">Entrega TDD</span></div>
        <div class="li-desc">Corrección al momento de solicitar la entrega de TDD (3 hallazgos corregidos: errores "XFF4H", "DLL08" y "C0B4S").</div>
        <div class="li-meta">Liberado el ${fmtDate("2026-07-10")} · Incidencia</div>
      </li>`]);
    $("#lista-liberaciones").innerHTML = liberacionesHtml.join("");

    // Focos de atención: bloqueantes no liberados + elementos próximos a liberar (en Pruebas).
    // El hallazgo #20 se fija siempre primero: no es bloqueante, pero el volumen de casos
    // afectados (100+) lo vuelve prioritario para Dirección.
    const pinId = 20;
    const pinned = HALLAZGOS.find(h => h.id === pinId);
    const resto = HALLAZGOS
      .filter(h => h.id !== pinId && ((h.criticidad === "Bloqueante" && h.estatus !== "Liberado") || h.estatus === "Pruebas"))
      .sort((a, b) => (a.estatus === "Pruebas" ? 1 : -1) - (b.estatus === "Pruebas" ? 1 : -1));
    const focos = pinned ? [pinned, ...resto] : resto;

    $("#lista-focos").innerHTML = focos.map(h => {
      const casosTxt = (h.casos && h.casos !== "N/A") ? ` · ${h.casos} casos` : "";
      const tagTexto = h.estatus === "Pruebas" ? "Próximo a liberar" : h.estatus;
      return `
      <li>
        <div class="li-top">
          <span class="tag ${estatusTagClass(h.estatus)}">${tagTexto}</span>
          <span class="tag">${h.flujo}</span>
        </div>
        <div class="li-desc">${h.descripcion}</div>
        <div class="li-meta">${h.estatus} · estimado ${fmtDate(h.fechaSolucion)}${casosTxt}</div>
      </li>`;
    }).join("");
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
    renderDoughnutChart("#chart-eje", labels, data, palette);
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
    // (no. según numeración vigente en DASHBOARD-PROGRAMA LAZOS V2.xlsx)
    const destacados = [
      ENCUESTA.observaciones.find(o => o.no === 3),  // PUC / Apertura N4 y Estabilidad PUC
      ENCUESTA.observaciones.find(o => o.no === 16), // Transferencias / SPEI
      ENCUESTA.observaciones.find(o => o.no === 13)  // Atención a Clientes / Servicio al Cliente
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
  // Ejecuta cada bloque de forma aislada: si uno falla, no arrastra al resto
  // de la página (defensivo — evita que un solo error deje el dashboard en blanco).
  function safe(label, fn) {
    try { fn(); } catch (err) { console.error(`[Dashboard PUC] Error en "${label}":`, err); }
  }

  document.addEventListener("DOMContentLoaded", () => {
    safe("tabs", initTabs);

    safe("resumen KPI", renderResumenKPI);
    safe("status cards", renderStatusCards);
    safe("distribución (charts)", renderDistribucionCharts);
    safe("puntos relevantes", renderPuntosRelevantes);
    safe("filtros", populateFilters);
    safe("tabla hallazgos", renderTabla);
    safe("orden tabla hallazgos", () => initSortableHeaders("#tabla-hallazgos", renderTabla));

    safe("encuesta KPI", renderEncuestaKPI);
    safe("encuesta chart eje", renderEjeChart);
    safe("temas recurrentes", renderTemasRecurrentes);
    safe("comentarios destacados", renderComentariosDestacados);
    safe("tabla encuesta", renderTablaEncuesta);
    safe("orden tabla encuesta", () => initSortableHeaders("#tabla-encuesta", () => {
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
    }));
  });
})();
