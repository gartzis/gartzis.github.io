document.addEventListener("DOMContentLoaded", () => {
  // Initialize tsParticles for the moving graph-style background
  if (window.tsParticles) {
    tsParticles.load("particle-background", {
      fpsLimit: 60,
      background: {
        color: "#020617"
      },
      particles: {
        number: {
          value: 70,
          density: {
            enable: true,
            area: 900
          }
        },
        color: {
          value: "#8be9fd"
        },
        links: {
          enable: true,
          distance: 130,
          color: "#64748b",
          opacity: 0.7,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.1,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "bounce"
          }
        },
        opacity: {
          value: 0.7
        },
        size: {
          value: { min: 1.4, max: 3.4 }
        }
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse"
          },
          onClick: {
            enable: true,
            mode: "push" // click creates new nodes
          },
          resize: true
        },
        modes: {
          repulse: {
            distance: 140,
            duration: 0.25
          },
          push: {
            quantity: 4
          }
        }
      },
      detectRetina: true
    });
  }

  // Simple scroll-in animation for sections (Varad-style movement)
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

  // Smooth scroll for nav links (extra, even though CSS has smooth scroll)
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
