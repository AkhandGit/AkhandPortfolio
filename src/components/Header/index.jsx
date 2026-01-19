import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Nav from './nav';
import styles from './style.module.scss';
import Rounded from '../common/RoundedButton';
import Magnetic from '../common/Magnetic';

export default function Header() {
    const header = useRef(null);
    const button = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();

    // Close the navigation menu whenever the URL path changes
    useEffect(() => {
        if (isActive) setIsActive(false);
    }, [location.pathname]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Logic to hide the main navigation bar immediately upon scrolling
        gsap.to(header.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                // Disappears within the first 100px of scrolling down
                end: 100, 
                onLeave: () => {
                    gsap.to(header.current, { y: "-100%", duration: 0.2, ease: "power1.out" })
                },
                onEnterBack: () => {
                    gsap.to(header.current, { y: "0%", duration: 0.2, ease: "power1.out" })
                }
            }
        });

        // 2. Logic to scale in the burger button after reaching the second section (100vh)
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                // Appears exactly when the user has scrolled one full viewport height
                start: "window.innerHeight", 
                onEnter: () => {
                    gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" })
                },
                onLeaveBack: () => {
                    gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" })
                    // Safety check: close the nav if the user scrolls back to the hero section
                    setIsActive(false);
                }
            }
        });
    }, []);

    return (
        <>
            {/* Main Desktop Header */}
            <div ref={header} className={styles.header}>
                <div className={styles.logo}>
                    <p className={styles.copyright}>©</p>
                    <div className={styles.name}>
                        <p className={styles.codeBy}>Code by</p>
                        <p className={styles.akhand}>Akhand</p>
                    </div>
                </div>
                <div className={styles.nav}>
                    <Magnetic>
                        <div className={styles.el}>
                            <a href="#work">Work</a>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                    <Magnetic>
                        <div className={styles.el}>
                            <a href="#about">About</a>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                    <Magnetic>
                        <div className={styles.el}>
                            <a href="#contact">Contact</a>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                </div>
            </div>

            {/* Floating Burger Button (Appears on Scroll) */}
            <div ref={button} className={styles.headerButtonContainer}>
                <Rounded 
                    onClick={() => setIsActive(!isActive)} 
                    className={`${styles.button}`}
                >
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                </Rounded>
            </div>

            {/* Navigation Overlay */}
            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
        </>
    );
}