import React, { useLayoutEffect, useRef } from 'react'
import styles from './style.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Landing() {
  const slider = useRef(null);
  let xPercent = 0;
  let direction = 1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // This handles the "Scroll Speed" interaction
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    })

    requestAnimationFrame(animate);
  }, [])

  const animate = () => {
    // We move the slider. Once it has moved 25% (one full set), we reset.
    if (xPercent <= -25) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -25;
    }

    gsap.set(slider.current, { xPercent: xPercent });
    xPercent += 0.010 * direction; // Your slow speed
    requestAnimationFrame(animate);
  }

  return (
    <main className={styles.landing}>
      <img src="/images/background.png" alt="background" />
      
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          {/* We repeat the pattern 4 times to ensure a seamless bridge */}
          <p>Akhand — MERN Developer — </p>
          <p>Akhand — MERN Developer — </p>
          <p>Akhand — MERN Developer — </p>
          <p>Akhand — MERN Developer — </p>
        </div>
      </div>
    </main>
  )
}