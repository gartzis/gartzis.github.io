document.addEventListener("DOMContentLoaded", () => {
  // === 1) Graph-like particle background with tsParticles ===
  tsParticles.load({
    id: "particle-background",
    options: {
      background: {
        color: "#020617"
      },
      fullScreen: {
        enable: false
      },
      detectRetina: true,
      particles: {
        number: {
          value: 80,
          density: { enable: true, area: 800 }
        },
        // node color (green)
        color: { value: "#22c55e" },
        // edges between nodes
        links: {
          enable: true,
          distance: 130,
          color: "#4ade80",
          opacity: 0.8,
          width: 1.2
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none",
          random: false,
          straight: false,
          outModes: { default: "bounce" }
        },
        opacity: { value: 0.8 },
        size: { value: { min: 1.4, max: 3.4 } }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 180, links: { opacity: 1 } },
          push: { quantity: 4 }
        }
      }
    }
  });

  // === 2) Supernode navigation → home screen → section screen ===
  const hero    = document.querySelector(".hero");
  const main    = document.querySelector("main");
  const panels  = document.querySelectorAll(".content-panel");
  const navNodes = document.querySelectorAll(".nav-node[data-target]"); // orbit nodes only

  function showPanel(id) {
    if (!main || !hero) return;

    // hide hero (home), show main area
    hero.style.display = "none";
    main.classList.add("main--visible");

    // toggle panels
    panels.forEach(panel => {
      if (panel.id === id) {
        panel.classList.add("content-panel--active");
      } else {
        panel.classList.remove("content-panel--active");
      }
    });

    // toggle active state on orbit nodes
    navNodes.forEach(node => {
      const targetId = node.dataset.target;
      if (targetId === id) {
        node.classList.add("nav-node--active");
      } else {
        node.classList.remove("nav-node--active");
      }
    });

    // scroll to top so section feels like a new screen
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // click handlers for orbit nodes
  navNodes.forEach(node => {
    node.addEventListener("click", e => {
      e.preventDefault(); // prevent #hash jump
      const targetId = node.dataset.target;
      if (!targetId) return;
      showPanel(targetId);
    });
  });
});
