document.addEventListener("DOMContentLoaded", () => {
  // === 1) Graph-like particle background with particles.js (Jayant-style) ===
  if (window.particlesJS) {
    particlesJS("particle-background", {
      particles: {
        number: {
          value: 80,
          density: { enable: true, value_area: 800 }
        },
        color: { value: "#22c55e" },
        shape: { type: "circle" },
        opacity: {
          value: 0.8,
          random: false
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 130,
          color: "#4ade80",
          opacity: 0.8,
          width: 1.2
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "bounce"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover:  { enable: true, mode: "grab" },
          onclick:  { enable: true, mode: "push" },
          resize:   true
        },
        modes: {
          grab: { distance: 180, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }

  // === 2) Supernode navigation + symmetric, collision-free layout ===
  const body       = document.body;
  const panels     = document.querySelectorAll(".content-panel");
  const navNodes   = document.querySelectorAll(".nav-node[data-target]");
  const backBtn    = document.querySelector(".back-button");
  const navHolder  = document.querySelector(".nav-nodes");
  const centerNode = document.querySelector(".nav-node--center");

  // DOM order (matching your HTML):
  //   Education, Academic Experience, Publications, Honors & Awards, Contact
  // Symmetric angles around the center (in CSS coordinates, y downwards).
  const angleMap = [-90, -150, -30, 150, 30];

  function layoutOrbitNodes() {
    if (!navHolder || !centerNode || navNodes.length === 0) return;

    const width  = navHolder.clientWidth;
    const height = navHolder.clientHeight;
    const cx = width / 2;
    const cy = height / 2;

    // Radius of the center "Resume" node
    const centerRadius =
      Math.max(centerNode.offsetWidth, centerNode.offsetHeight) / 2;

    // Find the largest orbit-node half-diagonal (approximate each pill as a circle)
    let maxNodeRadius = 0;
    navNodes.forEach(node => {
      const halfW = node.offsetWidth / 2;
      const halfH = node.offsetHeight / 2;
      const r = Math.sqrt(halfW * halfW + halfH * halfH);
      if (r > maxNodeRadius) maxNodeRadius = r;
    });

    // Distance between the closest points of the center circle and any pill
    const gap = 8; // tweak if you want a bit more / less space

    // Single shared radius → all section nodes sit on the same circle
    const baseRadius = centerRadius + maxNodeRadius + gap;

    navNodes.forEach((node, index) => {
      const angleDeg = angleMap[index % angleMap.length];
      const angleRad = (angleDeg * Math.PI) / 180;

      const x = cx + baseRadius * Math.cos(angleRad);
      const y = cy + baseRadius * Math.sin(angleRad);

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

