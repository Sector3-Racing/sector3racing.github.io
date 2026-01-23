(function () {
  const header = document.getElementById("siteHeader");
  const overlay = document.getElementById("navOverlay");
  const toggle = document.querySelector(".nav-toggle");
  const closeBtn = document.querySelector(".nav-close");

  if (!header) return;

  // Header scroll state
  const SCROLL_THRESHOLD = 24;

  function updateHeaderState() {
    if (window.scrollY > SCROLL_THRESHOLD) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  // Mobile menu
  function openMenu() {
    if (!overlay || !toggle) return;
    overlay.hidden = false;
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");

    // Focus close button for accessibility
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    if (!overlay || !toggle) return;
    overlay.hidden = true;
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");

    // Return focus to toggle
    toggle.focus();
  }

  if (toggle && overlay) {
    toggle.addEventListener("click", openMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  // Close when clicking outside the inner panel area
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeMenu();
    });
  }

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay && overlay.hidden === false) closeMenu();
  });

  // Close menu when navigating via overlay links
  if (overlay) {
    overlay.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        closeMenu();
      });
    });
  }
})();

