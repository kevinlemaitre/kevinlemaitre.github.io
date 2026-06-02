/**
 * script.js — Zoom au scroll sur les sections du CV
 * Kévin Lemaître
 *
 * Chaque bloc animable (.sidebar, .job, .edu-item, .skill-section,
 * .lang-item, .atout-item, et les blocs .tags isolés) part d'un état
 * légèrement réduit (scale 0.92) et transparent, puis "zoome" vers
 * sa taille normale dès qu'il entre dans le viewport.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. Sélecteurs des éléments à animer
  ------------------------------------------------------------------ */
  const SELECTORS = [
    '.sidebar',
    '.job',
    '.edu-item',
    '.skill-section',
    '.lang-item',
    '.atout-item',
    '.col-side > .tags',   // bloc centres d'intérêt
  ];

  /* ------------------------------------------------------------------
     2. Injection des styles CSS d'animation via JS
        (pas besoin de toucher style.css)
  ------------------------------------------------------------------ */
  const style = document.createElement('style');
  style.textContent = `
    .cv-animate {
      opacity: 0;
      transform: scale(0.92) translateY(12px);
      transition:
        opacity  0.55s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
      will-change: opacity, transform;
    }

    .cv-animate.cv-visible {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  `;
  document.head.appendChild(style);

  /* ------------------------------------------------------------------
     3. On récupère tous les éléments cibles et on leur ajoute
        la classe de départ .cv-animate
  ------------------------------------------------------------------ */
  const elements = [];

  SELECTORS.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add('cv-animate');
      elements.push(el);
    });
  });

  /* ------------------------------------------------------------------
     4. IntersectionObserver — déclenche le zoom quand l'élément
        entre dans le viewport (seuil 15 % visible)
  ------------------------------------------------------------------ */
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('cv-visible');
          /* On arrête d'observer une fois animé */
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,       /* déclenche à 15 % de visibilité */
      rootMargin: '0px 0px -40px 0px', /* un peu avant le bord bas */
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });

  /* ------------------------------------------------------------------
     5. Délai en cascade pour les éléments déjà visibles au chargement
        (ex : la sidebar et les premiers jobs)
  ------------------------------------------------------------------ */
  (function staggerVisible() {
    let delay = 0;
    elements.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        el.style.transitionDelay = delay + 'ms';
        delay += 80; /* 80 ms entre chaque élément déjà visible */
      }
    });
  })();

})();