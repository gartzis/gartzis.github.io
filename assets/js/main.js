document.addEventListener("DOMContentLoaded", () => {
  // === 1) tsParticles load (unchanged) ===
  tsParticles.load({
    id: "particle-background",
    options: { /* ... keep your existing options here ... */ }
  });

  // === 2) Scroll-in animation + active nav node ===
  const sections = document.querySelectorAll("main section");
  const navNodes = document.querySelectorAll('.navbar .nav-node');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // fade in
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

          // we no longer unobserve, so it can update as you scroll back up/down
        }
      });
    },
    { threshold: 0.4 } // a bit higher so it flips when section is more centered
  );

  sections.forEach(section => {
    section.classList.add("section-fade");
    observer.observe(section);
  });

  // === 3) Smooth scroll for nav links ===
  document.querySelectorAll('.navbar .nav-node[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const el = document.querySelector(targetId);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
