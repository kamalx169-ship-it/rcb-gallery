// app.js
// Starts everything when the page loads

// Wait until the full page HTML is ready
document.addEventListener("DOMContentLoaded", () => {

  // Draw the filter buttons
  renderFilters();

  // Draw the image grid
  renderGrid();

  // Smooth scroll when navbar or hero links are clicked
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Shrink navbar shadow on scroll
  window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 60) {
      nav.style.boxShadow = "0 6px 0 #a30008";
    } else {
      nav.style.boxShadow = "0 4px 0 #a30008";
    }
  });

});