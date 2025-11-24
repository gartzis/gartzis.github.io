document.addEventListener("DOMContentLoaded", function () {
  // === 1) Graph-like particle background using particles.js ===
  if (typeof particlesJS === "function") {
    particlesJS("particle-background", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#facc15" // warm yellow nodes
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.8,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.4,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.5,
            sync: false
          }
        },
        line_linked: {
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
          out_mode: "bounce",
          bounce: true,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"   // hover pulls edges towards the cursor
          },
          onclick: {
            enable: true,
            mode: "push"   // click creates new nodes
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 180,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      retina_detect: true
    });
  } else {
    console.warn("particlesJS is not defined; check particles.js script include.");
  }

  // === 2) Scroll-in animation for sections ===
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
    { threshold: 0.15 }
  );

  sections.forEach(section => {
    section.classList.add("section-fade");
    observer.observe(section);
  });

  // === 3) Smooth scroll for nav links ===
  document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
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
