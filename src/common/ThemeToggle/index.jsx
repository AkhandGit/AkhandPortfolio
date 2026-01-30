import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../../context/ThemeContext'
import styles from './style.module.scss'

const GIF_URL = "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s"

const createGifAnimation = (gifUrl) => {
  return {
    name: 'gif-transition',
    css: `
      ::view-transition-group(root) {
        animation-timing-function: var(--expo-in);
      }

      ::view-transition-new(root) {
        mask: url('${gifUrl}') center / 0 no-repeat;
        animation: scale 3s;
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale 3s;
      }

      @keyframes scale {
        0% {
          mask-size: 0;
        }
        10% {
          mask-size: 50vmax;
        }
        90% {
          mask-size: 50vmax;
        }
        100% {
          mask-size: 2000vmax;
        }
      }
    `
  }
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(theme === 'dark')
  }, [theme])

  const updateStyles = useCallback((css) => {
    const styleId = 'theme-transition-styles'
    let styleElement = document.getElementById(styleId)

    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = css
  }, [])

  const handleToggle = useCallback(() => {
    const animation = createGifAnimation(GIF_URL)
    updateStyles(animation.css)

    if (!document.startViewTransition) {
      toggleTheme()
      return
    }

    document.startViewTransition(() => {
      toggleTheme()
    })
  }, [toggleTheme, updateStyles])

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
      >
        <clipPath id="theme-clip">
          <motion.path
            animate={{ y: isDark ? 10 : 0, x: isDark ? -12 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
          />
        </clipPath>
        <g clipPath="url(#theme-clip)">
          <motion.circle
            animate={{ r: isDark ? 10 : 8 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            cx="16"
            cy="16"
          />
          <motion.g
            animate={{
              rotate: isDark ? -100 : 0,
              scale: isDark ? 0.5 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </motion.g>
        </g>
      </svg>
    </button>
  )
}