// script.js (merged + more robust "Last updated")

document.addEventListener('DOMContentLoaded', function () {
  // -------------------------------
  // 1) Fixed header -> add body top padding
  // -------------------------------
  const header = document.querySelector('.sticky-top');

  function applyHeaderOffset() {
    if (!header) return;
    const h = header.getBoundingClientRect().height;
    document.body.style.paddingTop = h + 'px';
    // Expose height as a CSS var if you want to use scroll-margin-top in CSS
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }

  applyHeaderOffset();
  window.addEventListener('resize', applyHeaderOffset);

  // -------------------------------
  // 2) "+" dropdown menu
  // -------------------------------
  const dropdownMenu  = document.getElementById('myDropdown');
  const dropdownToggle = document.getElementById('dropdownMenuButton');

  if (dropdownMenu && dropdownToggle) {
    // open / close
    dropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const open = dropdownMenu.classList.toggle('show');
      dropdownToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // clicks inside menu should not close immediately
    dropdownMenu.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    // click outside -> close
    document.addEventListener('click', function () {
      dropdownMenu.classList.remove('show');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    });

    // ESC to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdownMenu.classList.remove('show');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -------------------------------
  // 3) "Last updated" date
  //    Prefer HTTP Last-Modified header; fallback to document.lastModified
  // -------------------------------
  (async function setLastUpdated() {
    const el = document.getElementById('lastUpdated');
    if (!el) return;

    function writeDate(d) {
      const iso = d.toISOString().slice(0, 10); // YYYY-MM-DD
      el.setAttribute('datetime', iso);
      el.textContent = iso;
    }

    try {
      // HEAD request to get Last-Modified (works well on GitHub Pages)
      const res = await fetch(location.href, { method: 'HEAD', cache: 'no-store' });
      const header = res.headers.get('last-modified');
      if (!header) throw new Error('No Last-Modified header');
      const d = new Date(header);
      if (isNaN(d)) throw new Error('Invalid Last-Modified');
      writeDate(d);
    } catch {
      // fallback
      const d = new Date(document.lastModified);
      writeDate(isNaN(d) ? new Date() : d);
    }
  })();
});
