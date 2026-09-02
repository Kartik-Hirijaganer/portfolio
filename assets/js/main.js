/**
* Template URL: https://bootstrapmade.com/easyfolio-bootstrap-portfolio-template/
* Updated: Feb 21 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  function initProjectPagination(layoutElement, isotopeInstance) {
    const pagination = layoutElement.querySelector('[data-project-pagination]');
    if (!pagination) return;

    const grid = layoutElement.querySelector('.isotope-container');
    const controls = pagination.querySelector('[data-project-pagination-controls]');
    const status = pagination.querySelector('[data-project-pagination-status]');
    const projectItems = Array.from(grid.querySelectorAll('.filter-projects'));
    let pageSize = window.matchMedia('(max-width: 767px)').matches ? 2 : 4;
    let currentPage = 1;
    let resizeTimer;

    function createPageButton(label, options = {}) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'project-page-button';
      button.textContent = label;

      if (options.ariaLabel) button.setAttribute('aria-label', options.ariaLabel);
      if (options.current) button.setAttribute('aria-current', 'page');
      if (options.page) button.dataset.page = options.page;
      button.disabled = Boolean(options.disabled);
      button.addEventListener('click', options.onClick);

      return button;
    }

    function renderPage({ moveFocus = false } = {}) {
      const totalPages = Math.max(1, Math.ceil(projectItems.length / pageSize));
      currentPage = Math.min(currentPage, totalPages);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, projectItems.length);

      isotopeInstance.arrange({
        filter: (itemElement) => {
          const itemIndex = projectItems.indexOf(itemElement);
          return itemIndex >= startIndex && itemIndex < endIndex;
        }
      });

      status.textContent = `Showing projects ${startIndex + 1}–${endIndex} of ${projectItems.length}`;
      controls.replaceChildren();

      controls.appendChild(createPageButton('Previous', {
        ariaLabel: 'Show previous project page',
        disabled: currentPage === 1,
        onClick: () => {
          currentPage -= 1;
          renderPage({ moveFocus: true });
        }
      }));

      for (let page = 1; page <= totalPages; page += 1) {
        controls.appendChild(createPageButton(String(page), {
          ariaLabel: `Show project page ${page}`,
          current: page === currentPage,
          page,
          onClick: () => {
            currentPage = page;
            renderPage({ moveFocus: true });
          }
        }));
      }

      controls.appendChild(createPageButton('Next', {
        ariaLabel: 'Show next project page',
        disabled: currentPage === totalPages,
        onClick: () => {
          currentPage += 1;
          renderPage({ moveFocus: true });
        }
      }));

      pagination.hidden = totalPages <= 1;

      if (moveFocus) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        requestAnimationFrame(() => {
          controls.querySelector(`[data-page="${currentPage}"]`)?.focus({ preventScroll: true });
        });
      }
    }

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const nextPageSize = window.matchMedia('(max-width: 767px)').matches ? 2 : 4;
        if (nextPageSize === pageSize) return;

        const firstVisibleItem = (currentPage - 1) * pageSize;
        pageSize = nextPageSize;
        currentPage = Math.floor(firstVisibleItem / pageSize) + 1;
        renderPage();
      }, 150);
    });

    renderPage();
  }

  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    const isotopeContainer = isotopeItem.querySelector('.isotope-container');
    const initIsotope = new Isotope(isotopeContainer, {
      itemSelector: '.isotope-item',
      layoutMode: layout,
      filter: filter,
      sortBy: sort
    });

    initProjectPagination(isotopeItem, initIsotope);

    imagesLoaded(isotopeContainer, function() {
      initIsotope.layout();
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  function scrollToHashTarget(behavior = 'smooth') {
    if (!window.location.hash || !document.querySelector(window.location.hash)) return;

    let section = document.querySelector(window.location.hash);
    let scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop) || 0;
    window.scrollTo({
      top: section.offsetTop - scrollMarginTop,
      behavior
    });
  }

  window.addEventListener('load', function(e) {
    setTimeout(() => scrollToHashTarget('smooth'), 100);
    setTimeout(() => scrollToHashTarget('auto'), 900);
  });

  window.addEventListener('hashchange', function() {
    setTimeout(() => scrollToHashTarget('smooth'), 50);
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hirijaganer.kartik.16ee1056@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.open(gmailUrl, '_blank');

      document.querySelector(".sent-message").style.display = "block";
    });
  }
});

// Skeleton reveal: keep skeletons visible >= MIN_MS, then fade in real content
(function () {
  const MIN_MS = 800, start = performance.now();
  function reveal() {
    const wait = Math.max(0, MIN_MS - (performance.now() - start));
    setTimeout(() => document.body.classList.add('loaded'), wait);
  }
  window.addEventListener('load', reveal);
  setTimeout(reveal, 3000);
})();
