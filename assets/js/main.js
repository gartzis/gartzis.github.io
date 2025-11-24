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

  // === 2) Supernode navigation + circular layout ===
  const body      = document.body;
  const panels    = document.querySelectorAll(".content-panel");
  const navNodes  = document.querySelectorAll(".nav-node[data-target]"); // orbit nodes only
  const backBtn   = document.querySelector(".back-button");
  const navHolder = document.querySelector(".nav-nodes");

  // Angles (degrees) for the 5 orbit nodes: top, upper-left, upper-right, lower-left, lower-right
  const angleMap = [-90, -150, -30, 210, 330];

  function layoutOrbitNodes() {
    if (!navHolder || navNodes.length === 0) return;

    const width  = navHolder.clientWidth;
    const height = navHolder.clientHeight;
    const cx = width / 2;
    const cy = height / 2;

    // Equal center-to-center radius for all orbit nodes
    const radius = Math.min(width, height) / 2 - 40;

    navNodes.forEach((node, index) => {
      const angleDeg = angleMap[index % angleMap.length];
      const angleRad = (angleDeg * Math.PI) / 180;

      const x = cx + radius * Math.cos(angleRad);
      const y = cy + radius * Math.sin(angleRad);

      node.style.left = `${x}px`;
      node.style.top  = `${y}px`;
    });
  }

  layoutOrbitNodes();
  window.addEventListener("resize", layoutOrbitNodes);

  function showPanel(id) {
    if (!id) return;

    // switch to "section" mode
    body.classList.add("show-section");

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

    // scroll to top so section feels like its own screen
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // click handlers for orbit nodes
  navNodes.forEach(node => {
    node.addEventListener("click", e => {
      e.preventDefault(); // prevent hash jump
      const targetId = node.dataset.target;
      showPanel(targetId);
    });
  });

  // back button → return to home (hero + circle)
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      body.classList.remove("show-section");

      // hide all panels
      panels.forEach(panel =>
        panel.classList.remove("content-panel--active")
      );

      // clear active highlight on nodes
      navNodes.forEach(node =>
        node.classList.remove("nav-node--active")
      );

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
