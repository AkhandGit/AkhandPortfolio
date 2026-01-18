import { useEffect, useState } from 'react'
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
      <h1>Awwwards Portfolio - Vite Setup</h1>
      <p>Ready to build! 🚀</p>
      
      {/* Components will go here */}
      {/* {isLoading && <Preloader />} */}
      {/* <Header /> */}
      {/* <Landing /> */}
      {/* <Description /> */}
      {/* <Projects /> */}
      {/* <SlidingImages /> */}
      {/* <Contact /> */}
    </main>
  )
}

export default App