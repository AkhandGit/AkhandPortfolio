import { motion } from 'framer-motion'
import styles from './style.module.scss'
import { links, footerLinks } from './data'


const menuVariants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0]
    }
  },
  exit: {
    scaleY: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const linkVariants = {
  initial: {
    opacity: 0,
    y: 50
  },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3 + (i * 0.1),
      ease: [0.12, 0, 0.39, 0]
    }
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
}

const footerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.8
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
}

const STAGGER = 0.035

function TextRoll({ children, className, center = false }) {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={className}
      style={{ lineHeight: 0.75 }}
    >
      <div className={styles.textRollContainer}>
        {children.split("").map((letter, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i
          
          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" }
              }}
              transition={{
                ease: "easeInOut",
                delay
              }}
              className={styles.letter}
              key={`top_${i}`}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          )
        })}
      </div>
      
      <div className={styles.textRollContainerAbsolute}>
        {children.split("").map((letter, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i
          
          return (
            <motion.span
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 }
              }}
              transition={{
                ease: "easeInOut",
                delay
              }}
              className={styles.letter}
              key={`bottom_${i}`}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          )
        })}
      </div>
    </motion.span>
  )
}

export default function Nav() {
  return (
    <motion.div 
      className={styles.nav}
      variants={menuVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ originY: 0 }}
    >
      <div className={styles.body}>
        <ul className={styles.linksContainer}>
          {links.map((link, i) => (
            <motion.li 
              key={i} 
              className={styles.linkItem}
              custom={i}
              variants={linkVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <a href={link.href}>
                <TextRoll center className={styles.linkText}>
                  {link.title}
                </TextRoll>
              </a>
              <span className={styles.description}>[{i}]</span>
            </motion.li>
          ))}
        </ul>
        
        <motion.div 
          className={styles.footer}
          variants={footerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {footerLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={styles.footerLink}
            >
              {link.title}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}