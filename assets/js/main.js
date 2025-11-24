document.addEventListener("DOMContentLoaded", () => {
  // === 1) Graph-like particle background (nodes + edges + click to add) ===
  tsParticles.load("particle-background", {
    fullScreen: {
      enable: false // use our fixed #particle-background div, not full screen
    },
    background: {
      color: "#020617"
    },
    detectRetina: true,
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800
        }
      },
      // node color
      color: {
        value: "#facc15" // warm yellow, clearly visible on your dark bg
      },
      // edges between nodes
      links: {
        enable: true,
        distance: 130,
        color: "#fbbf24",
        opacity: 0.8,
        width: 1.2
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "bounce"
        }
      },
      opacity: {
        value: 0.8
      },
      size: {
        value: { min: 1.4, max: 3.4 }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab"      // pointer “pulls” edges like Jayant’s site
        },
        onClick: {
          enable: true,
          mode: "push"      // clicking creates new nodes
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 1
          }
        },
        push: {
          quantity: 4
        }
      }
    }
  });

  // === 2) Scroll-in animation for sections (Varad-style movement) ===
  const sections = document.querySelectorAll("main section");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  sections.forEach(section => {
    section.classList.add("section-fade");
    observer.observe(section);
  });

  // === 3) Smooth scroll for nav links ===
  document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const el = document.querySelector(targetId);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
});
