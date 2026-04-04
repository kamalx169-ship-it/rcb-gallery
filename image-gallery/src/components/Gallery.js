// gallery.js
// Handles filter buttons and drawing the grid of cards

let activeFilter = "All";

// Get all unique category names from the images array
const categories = ["All", ...new Set(images.map((img) => img.category))];

// Grab the HTML elements we need
const filterContainer = document.getElementById("filters");
const gridContainer   = document.getElementById("grid");

// ── Draw the filter buttons ──
function renderFilters() {
  filterContainer.innerHTML = "";

  categories.forEach((cat) => {
    // Count how many images belong to this category
    const count =
      cat === "All"
        ? images.length
        : images.filter((img) => img.category === cat).length;

    const btn = document.createElement("button");
    btn.className = "filter-btn" + (cat === activeFilter ? " active" : "");
    btn.textContent = `${cat} (${count})`;

    // When clicked, update the active filter and redraw
    btn.onclick = () => {
      activeFilter = cat;
      renderFilters();
      renderGrid();
    };

    filterContainer.appendChild(btn);
  });
}

// ── Draw the image grid ──
function renderGrid() {
  gridContainer.innerHTML = "";

  // Keep only images that match the active filter
  const filtered =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  // Show a message if nothing matches
  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="empty">
        <h3>🧱 No bricks here!</h3>
        <p>Try a different category.</p>
        <button onclick="activeFilter='All'; renderFilters(); renderGrid();">
          Show All
        </button>
      </div>`;
    return;
  }

  // Build and add each card using imagecard.js
  filtered.forEach((image, index) => {
    const card = createImageCard(image, index);
    gridContainer.appendChild(card);
  });
}