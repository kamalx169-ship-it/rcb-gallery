import React, { useState, useRef } from "react";

const ImageCard = ({ image, index }) => {
  const [loaded, setLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const isLarge = image.featured && index % 3 === 0;

  return (
    <article
      ref={cardRef}
      className={`img-card ${isLarge ? "img-card--large" : ""}`}
      style={{
        animationDelay: `${index * 0.07}s`,
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: tilt.x === 0 ? "transform 0.6s cubic-bezier(0.23,1,0.32,1)" : "transform 0.1s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="img-card__media">
        {!loaded && <div className="img-card__skeleton" />}
        <img
          src={image.url}
          alt={image.title}
          onLoad={() => setLoaded(true)}
          className={loaded ? "loaded" : ""}
          loading="lazy"
        />
        {/* Liquid gradient overlay */}
        <div className="img-card__liquid" />
        <div className="img-card__vignette" />
      </div>

      {/* Top row */}
      <div className="img-card__top">
        <span className="img-card__index">
          {String(image.id).padStart(2, "0")}
        </span>
        {image.featured && (
          <span className="img-card__star">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            FEATURED
          </span>
        )}
        <span className="img-card__cat">{image.category}</span>
      </div>

      {/* Bottom content */}
      <div className="img-card__body">
        <div className="img-card__meta">
          <span className="img-card__subtitle">{image.subtitle}</span>
          <span className="img-card__year">{image.year}</span>
        </div>
        <h3 className="img-card__title">{image.title}</h3>

        {/* Hover reveal */}
        <div className="img-card__hover-content">
          <p className="img-card__desc">{image.description}</p>
          <div className="img-card__action">
            <span>View</span>
            <div className="action-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Corner glow */}
      <div className="img-card__glow" />
    </article>
  );
};

export default ImageCard;