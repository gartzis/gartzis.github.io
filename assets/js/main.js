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
        color: { value: "#22c55e" },
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
  const navNodes  = document.querySelectorAll(".nav-node[data-target]");
  const backBtn   = document.querySelector(".back-button");
  const navHolder = document.querySelector(".nav-nodes");

  // DOM order: Education, Academic Experience, Publications, Honors, Contact
  // Angles in CSS coordinate system (y downwards):
  //  -90 : top
  // -150 : upper-left
  //  -30 : upper-right
  //  150 : lower-left
  //   30 : lower-right
  const angleMap = [-90, -150, -30, 150, 30];

  function layoutOrbitNodes() {
    if (!navHolder || navNodes.length === 0) return;

    const width  = navHolder.clientWidth;
    const height = navHolder.clientHeight;
    const cx = width / 2;
    const cy = height / 2;

    // Radius from the CV center to each section node
    const radius = Math.min(width, height) / 2 - 15;

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

    body.classList.add("show-section");

    panels.forEach(panel => {
      panel.classList.toggle("content-panel--active", panel.id === id);
    });

    navNodes.forEach(node => {
      const targetId = node.dataset.target;
      node.classList.toggle("nav-node--active", targetId === id);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navNodes.forEach(node => {
    node.addEventListener("click", e => {
      e.preventDefault();
      showPanel(node.dataset.target);
    });
  });

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      body.classList.remove("show-section");

      panels.forEach(panel =>
        panel.classList.remove("content-panel--active")
      );

      navNodes.forEach(node =>
        node.classList.remove("nav-node--active")
      );

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
