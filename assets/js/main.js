document.addEventListener("DOMContentLoaded", function () {
  // === 1) Graph-like particle background using Jayant's particles.min.js ===
  if (typeof particlesJS === "function") {
    // his particles.min.js defines particlesJS.load(tagId) with built-in config
    particlesJS.load("particle-background");
  } else {
    console.warn("particlesJS is not defined. Check that assets/js/particles.min.js is loaded correctly.");
  }

  // === 2) Scroll-in animation for sections (your current effect) ===
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
