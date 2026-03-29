import React, { useState, useMemo } from "react";
import ImageCard from "./ImageCard";
import images from "../data/images";

const CATEGORIES = ["All", ...new Set(images.map((img) => img.category))];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let result = images.filter((img) => {
      const matchCat = activeFilter === "All" || img.category === activeFilter;
      const matchSearch =
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sortBy === "featured") result = [...result].sort((a, b) => b.featured - a.featured);
    if (sortBy === "alpha") result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <section className="gallery-section">

      {/* ── Controls bar ── */}
      <div className="gallery-controls">
        {/* Search */}
        <div className="search-wrap">
          <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search the gallery…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery("")}>✕</button>
          )}
        </div>

        {/* Sort */}
        <div className="sort-wrap">
          <span className="sort-label">Sort</span>
          <div className="sort-options">
            {[
              { v: "default", l: "Default" },
              { v: "featured", l: "Featured" },
              { v: "alpha", l: "A–Z" },
            ].map((opt) => (
              <button
                key={opt.v}
                className={`sort-btn ${sortBy === opt.v ? "active" : ""}`}
                onClick={() => setSortBy(opt.v)}
              >
                {opt.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category filters ── */}
      <div className="filter-row" role="tablist">
        {CATEGORIES.map((cat) => {
          const count = cat === "All" ? images.length : images.filter((i) => i.category === cat).length;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              <span className="pill-label">{cat}</span>
              <span className="pill-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ── Result bar ── */}
      <div className="result-row">
        <div className="result-line" />
        <span className="result-text">
          {filtered.length} <span>photo{filtered.length !== 1 ? "s" : ""}</span>
          {activeFilter !== "All" && <> · <em>{activeFilter}</em></>}
        </span>
        <div className="result-line" />
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="gallery-grid">
          {filtered.map((image, index) => (
            <React.Fragment key={image.id}>
              <ImageCard image={image} index={index} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-icon">[ NO RESULTS ]</p>
          <h3>Nothing found</h3>
          <p>Try a different keyword or filter.</p>
          <button onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}>
            Reset All
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;