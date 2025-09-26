// Toggle Dropdown on SSP button click
const sspBtn = document.getElementById("sspBtn");
const sspMenu = document.getElementById("sspMenu");

sspBtn.addEventListener("click", function(event) {
  event.preventDefault();
  sspMenu.classList.toggle("show");
  // update aria-expanded
  const expanded = sspMenu.classList.contains('show');
  sspBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  // focus management: move focus into first menu item when opened, restore when closed
  if (expanded) {
    sspBtn._previousFocus = document.activeElement;
    const firstItem = sspMenu.querySelector('[role="menuitem"]');
    if (firstItem) firstItem.focus();
  } else if (sspBtn._previousFocus) {
    sspBtn._previousFocus.focus();
    delete sspBtn._previousFocus;
  }
});

      let navBar = document.querySelector(".nav-bar");
      document.addEventListener("click", (e) => {
        if (e.target.closest(".open") && !navBar.classList.contains("open")) {
          navBar.classList.add("open");
        } else {
          navBar.classList.remove("open");
        }
      });
const profileBtn = document.getElementById("profile-dropdown-btn");
const profileList = document.getElementById("profile-dropdown-list");

profileBtn.addEventListener("click", () => {
  profileList.classList.toggle("active");
  const icon = profileBtn.querySelector(".toggle-icon");
  icon.textContent = profileList.classList.contains("active") ? "expand_less" : "expand_more";
  // Reposition the fixed dropdown near the profile button
  if (profileList.classList.contains('active')) {
    const rect = profileBtn.getBoundingClientRect();
    // place the dropdown below the button with a small gap
    profileList.style.top = (rect.bottom + 8) + 'px';
    // align right edge of dropdown with right edge of button
    profileList.style.right = (window.innerWidth - rect.right + 8) + 'px';
  }
});

// Optional: Close dropdown if clicked outside
window.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !profileList.contains(e.target)) {
    profileList.classList.remove("active");
    profileBtn.querySelector(".toggle-icon").textContent = "expand_more";
  }
});

// Submenu toggle for touch and keyboard accessibility
document.addEventListener('DOMContentLoaded', () => {
  const submenuParents = document.querySelectorAll('.dropdown-menu .has-submenu');

  submenuParents.forEach(parent => {
    const toggle = parent.querySelector('a');
    const submenu = parent.querySelector('.dropdown-submenu');

    // make anchor focusable and handle click/tap
    toggle.addEventListener('click', (ev) => {
      ev.preventDefault();
      // close other open submenus
      submenuParents.forEach(p => { if (p !== parent) p.classList.remove('submenu-open'); });
      parent.classList.toggle('submenu-open');
      // update aria-expanded for the toggle anchor
      const isOpen = parent.classList.contains('submenu-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // focus management for submenu
      if (isOpen) {
        toggle._previousFocus = document.activeElement;
        const firstSub = submenu ? submenu.querySelector('[role="menuitem"]') : null;
        if (firstSub) firstSub.focus();
      } else if (toggle._previousFocus) {
        toggle._previousFocus.focus();
        delete toggle._previousFocus;
      }
    });

    // keyboard support (Enter / Space to toggle)
    toggle.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        toggle.click();
      }
    });
  });

  // Close submenus when clicking outside
  document.addEventListener('click', (ev) => {
    if (!ev.target.closest('.dropdown-menu')) {
      submenuParents.forEach(p => p.classList.remove('submenu-open'));
      // reset aria-expanded on submenu toggles
      submenuParents.forEach(p => { const a = p.querySelector('a'); if (a) a.setAttribute('aria-expanded', 'false'); });
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      submenuParents.forEach(p => p.classList.remove('submenu-open'));
      // also close SSP menu if open
      if (sspMenu.classList.contains('show')) sspMenu.classList.remove('show');
    }
  });
});

