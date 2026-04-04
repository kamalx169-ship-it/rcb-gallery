// imagecard.js
// Builds one card element and returns it

function createImageCard(image, index) {
  // Every 4th featured image becomes a big wide card
  const isBig = image.featured && index % 4 === 0;

  // Create the card element
  const card = document.createElement("article");
  card.className = "card" + (isBig ? " card--big" : "");

  // Fill in the card HTML
  card.innerHTML = `
    <div class="card-img">
      <img src="${image.url}" alt="${image.title}" loading="lazy" />
      <span class="badge">${image.category}</span>
      ${image.featured ? '<span class="badge badge--star">★ Featured</span>' : ""}
    </div>
    <div class="card-body">
      <div class="card-cat">${image.subtitle}</div>
      <h3 class="card-title">${image.title}</h3>
      <p class="card-desc">${image.desc}</p>
    </div>
  `;

  return card;
}