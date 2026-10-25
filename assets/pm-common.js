/* ==========================================================================
   Programación Avanzada 2026 — Profe Macón
   Script de Navegación Común, Header Dinámico y Botones de Copia Segura
   ========================================================================== */

(function () {
  'use strict';

  // 1. Cabecera institucional compacta / expandida
  function initHeader() {
    var header = document.getElementById('pmSiteHeader');
    if (!header) return;

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY || window.pageYOffset || 0;
          if (y > 80) {
            header.classList.add('is-compact');
          } else {
            header.classList.remove('is-compact');
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 2. Extracción limpia de código original sin metadatos de interfaz
  function extractCleanCode(targetPre) {
    if (!targetPre) return '';

    // Clonar para no alterar el DOM original
    var clone = targetPre.cloneNode(true);

    // Eliminar botones, etiquetas, leyendas de cabecera y números de línea
    var toRemove = clone.querySelectorAll(
      '.pm-copy-btn, .copy-btn, button, .caption, .code-label, .code-header, ' +
      '.code-title, .line-numbers, .line-number, .gutter, [data-line-number], header'
    );
    for (var i = 0; i < toRemove.length; i++) {
      toRemove[i].parentNode.removeChild(toRemove[i]);
    }

    var raw = clone.textContent || '';
    // Normalizar saltos de línea Windows / Unix
    raw = raw.replace(/\r\n/g, '\n');

    // Descartar líneas iniciales o finales totalmente vacías sin tocar la indentación interna
    var lines = raw.split('\n');
    while (lines.length && lines[0].trim() === '') {
      lines.shift();
    }
    while (lines.length && lines[lines.length - 1].trim() === '') {
      lines.pop();
    }

    return lines.join('\n');
  }

  // 3. Incorporación de botones «Copiar» exclusivamente a bloques de código reconocidos
  function initCodeCopy() {
    // Reconocer contenedores de código: elementos .codebox o <pre> que no estén dentro de un .codebox
    var candidates = [];

    var codeboxes = document.querySelectorAll('.codebox');
    codeboxes.forEach(function (cb) {
      candidates.push(cb);
    });

    var pres = document.querySelectorAll('pre');
    pres.forEach(function (p) {
      // Si el pre ya está dentro de un .codebox, el botón va en el codebox, no duplicar
      if (!p.closest('.codebox')) {
        candidates.push(p);
      }
    });

    candidates.forEach(function (container) {
      // Evitar duplicar botones si el contenedor ya tiene botón propio o de la lección
      if (container.querySelector('.pm-copy-btn, .copy-btn, .btn-copy, [data-action="copy"]')) {
        return;
      }

      // Localizar el elemento <pre> correspondiente
      var targetPre = container.matches('pre') ? container : container.querySelector('pre');
      if (!targetPre) return;

      // Crear el botón
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pm-copy-btn';
      btn.setAttribute('aria-label', 'Copiar código al portapapeles');
      btn.innerHTML = '<span class="pm-copy-label">Copiar</span>';

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var cleanCode = extractCleanCode(targetPre);
        if (!cleanCode) return;

        navigator.clipboard.writeText(cleanCode).then(function () {
          btn.classList.add('is-copied');
          btn.innerHTML = '<span class="pm-copy-label">¡Copiado!</span>';
          setTimeout(function () {
            btn.classList.remove('is-copied');
            btn.innerHTML = '<span class="pm-copy-label">Copiar</span>';
          }, 2000);
        }).catch(function () {
          btn.innerHTML = '<span class="pm-copy-label">Error</span>';
        });
      });

      // Asegurar posición relativa en el contenedor
      container.classList.add('pm-has-copy-btn');
      container.appendChild(btn);
    });
  }

  // 4. Ocultar enlaces de navegación flotantes heredados obsoletos
  function hideLegacyBackLinks() {
    var siteBack = document.getElementById('site-back');
    if (siteBack) siteBack.style.display = 'none';

    var cursoRegreso = document.querySelectorAll('.curso-regreso');
    cursoRegreso.forEach(function (el) {
      el.style.display = 'none';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initHeader();
      initCodeCopy();
      hideLegacyBackLinks();
    });
  } else {
    initHeader();
    initCodeCopy();
    hideLegacyBackLinks();
  }
})();
