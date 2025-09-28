import React from 'react';
import styles from './styles.module.css';

export default function HeroCarousel({images = heroScreens, interval = 5000}) {
  const [index, setIndex] = React.useState(0);
  const count = images.length;
  React.useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, interval]);
  const go = (d) => setIndex(i => (i + d + count) % count);
  return (
    <div className={styles.carousel} aria-roledescription="carousel">
      <div className={styles.carouselViewport}>
        <div className={styles.carouselTrack} style={{transition: 'transform 400ms ease', transform: `translateX(-${index * 100}%)`}}>
          {images.map((src, i) => (
            <div key={src + i} className={styles.slide} aria-hidden={i !== index}>
              <img src={src} alt="Cormas screenshot" className={styles.slideImg} loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={() => go(-1)} className={styles.navBtn} style={{left: 8}} aria-label="Previous screenshot">‹</button>
      <button type="button" onClick={() => go(1)} className={styles.navBtn} style={{right: 8}} aria-label="Next screenshot">›</button>
      <div className={styles.dots}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i+1}`} className={styles.dot} style={{opacity: i === index ? 1 : 0.4}} />
        ))}
      </div>
    </div>
  );
}

