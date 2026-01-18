import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      const locomotiveScroll = new LocomotiveScroll()

      setTimeout(() => {
        setIsLoading(false)
        document.body.style.cursor = 'default'
        window.scrollTo(0, 0)
      }, 2000)
    })()
  }, [])

  return (
    <main>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <div style={{ padding: '100px 20px', minHeight: '100vh' }}>
          <h1>Portfolio Content Goes Here</h1>
          <p>Preloader animation complete! ✅</p>
        </div>
      )}
    </main>
  )
}

export default App