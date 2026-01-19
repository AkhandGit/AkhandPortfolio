import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import Preloader from './components/Preloader'
import Header from './components/Header'
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
    <BrowserRouter>
      <main>
        <AnimatePresence mode='wait'>
          {isLoading && <Preloader />}
        </AnimatePresence>
        
        <Header />
        
        {!isLoading && (
          <div style={{ padding: '100px 20px', minHeight: '200vh', background: '#fff' }}>
            <h1 style={{ color: '#000' }}>Portfolio Content Goes Here</h1>
            <p style={{ color: '#000' }}>Scroll down to see the burger menu appear! ⬇️</p>
            
            <div style={{ marginTop: '150vh', color: '#000' }}>
              <h2>Keep scrolling...</h2>
              <p>Hello</p>
            </div>
          </div>
        )}
      </main>
    </BrowserRouter>
  )
}

export default App