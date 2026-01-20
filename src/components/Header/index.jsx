import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import Nav from './nav'
import Magnetic from '../common/Magnetic' // Importing your magnetic component
import styles from './style.module.scss'

export default function Header() {
  const header = useRef(null)
  const button = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    if (isActive) setIsActive(false)
  }, [location])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // 1. Header disappears IMMEDIATELY on any scroll
    gsap.to(header.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "+=1", // Just 1px of scroll
        onLeave: () => {
          gsap.to(header.current, { y: "-100%", duration: 0.25, ease: "power1.out" })
        },
        onEnterBack: () => {
          gsap.to(header.current, { y: "0%", duration: 0.12, ease: "power3.out" })
        }
      }
    })

    // 2. Burger button appears ONLY after scrolling past first viewport
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: 250,
        onLeave: () => {
          gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" })
        },
        onEnterBack: () => {
          gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" })
          setIsActive(false)
        }
      }
    })
  }, [])

  return (
    <>
      <div ref={header} className={styles.header}>
        <div className={styles.logo}>
          <p className={styles.copyright}>©</p>
          <div className={styles.name}>
            <p className={styles.codeBy}>Code by Akhand</p>
          </div>
        </div>
        <div className={styles.nav}>
          <div className={styles.el}>
            <a>Work</a>
            <div className={styles.indicator}></div>
          </div>
          <div className={styles.el}>
            <a>About</a>
            <div className={styles.indicator}></div>
          </div>
          <div className={styles.el}>
            <a>Contact</a>
            <div className={styles.indicator}></div>
          </div>
        </div>
      </div>

      <div ref={button} className={styles.headerButtonContainer}>
        {/* Wrapping the button in your Magnetic component */}
        <Magnetic>
          <div onClick={() => setIsActive(!isActive)} className={styles.button}>
            <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
          </div>
        </Magnetic>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <Nav />}
      </AnimatePresence>
    </>
  )
}