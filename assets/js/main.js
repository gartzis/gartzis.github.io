document.addEventListener("DOMContentLoaded", () => {
  // === 1) Graph background with tsParticles ===
  tsParticles.load({
    id: "particle-background",
    options: {
      background: {
        color: "#020617"
      },
      fullScreen: {
        enable: false // we use the fixed #particle-background div
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
        // node color (green)
        color: {
          value: "#22c55e"
        },
        // edges between nodes (lighter green)
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
            mode: "grab"      // edges grab towards cursor
          },
          onClick: {
            enable: true,
            mode: "push"      // click creates new nodes
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
    }
  });

  // === 2) Scroll-in animation + active nav node ===
  const sections = document.querySelectorAll("main section");
  const navNodes = document.querySelectorAll(".nav-node");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // fade in section
          entry.target.classList.add("visible");

          // highlight corresponding nav node
          const id = entry.target.id;
          navNodes.forEach(link => {
            const target = link.getAttribute("href"); // e.g. "#education"
            if (target === `#${id}`) {
              link.classList.add("nav-node--active");
            } else {
              link.classList.remove("nav-node--active");
            }
          });
        }
      });
    },
    {
      threshold: 0.4 // section is ~centered before switching
    }
  );

  sections.forEach(section => {
    section.classList.add("section-fade");
    observer.observe(section);
  });

  // === 3) Smooth scroll for nav nodes ===
  document.querySelectorAll('.nav-node[href^="#"]').forEach(anchor => {
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
