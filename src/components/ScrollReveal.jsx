import { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({ children, animation = 'fade-in-up', delay = 0, duration = 0.6 }) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { 
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px' // fires slightly before entering viewport fully
      }
    )

    const currentRef = elementRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const styles = {
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }

  return (
    <div
      ref={elementRef}
      className={`reveal-element ${isVisible ? 'revealed' : ''} ${animation}`}
      style={styles}
    >
      {children}
    </div>
  )
}
