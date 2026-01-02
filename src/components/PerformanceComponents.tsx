import React, { useState, useEffect } from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`} />
  )
}

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  placeholder?: string
  onLoad?: () => void
  onError?: () => void
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = '/placeholder.jpg',
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    
    img.onload = () => {
      setImageSrc(src)
      setIsLoading(false)
      setHasError(false)
      onLoad?.()
    }
    
    img.onerror = () => {
      setIsLoading(false)
      setHasError(true)
      onError?.()
    }
  }, [src, onLoad, onError])

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Imagem não disponível</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        loading="lazy"
      />
    </div>
  )
}

// Optimized Section Component
interface OptimizedSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  threshold?: number
}

const OptimizedSection: React.FC<OptimizedSectionProps> = ({
  children,
  className = '',
  id,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!elementRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(elementRef)

    return () => observer.disconnect()
  }, [elementRef, threshold])

  return (
    <div
      ref={setElementRef}
      id={id}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    >
      {children}
    </div>
  )
}

// Performance Monitor Component
interface PerformanceMonitorProps {
  componentName: string
  children: React.ReactNode
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  componentName,
  children
}) => {
  const [renderCount, setRenderCount] = useState(0)
  const [lastRender, setLastRender] = useState(Date.now())

  useEffect(() => {
    const now = Date.now()
    const timeSinceLastRender = now - lastRender
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 ${componentName} render #${renderCount + 1} (${timeSinceLastRender}ms ago)`)
    }
    
    setRenderCount(prev => prev + 1)
    setLastRender(now)
  })

  return <>{children}</>
}

// Smooth Scroll Component
interface SmoothScrollProps {
  targetId: string
  children: React.ReactNode
  className?: string
  offset?: number
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({
  targetId,
  children,
  className = '',
  offset = 0
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    const target = document.getElementById(targetId)
    if (!target) return

    const targetPosition = target.offsetTop - offset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 1000
    let start: number | null = null

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
      
      window.scrollTo(0, run)
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

export {
  LoadingSpinner,
  LazyImage,
  OptimizedSection,
  PerformanceMonitor,
  SmoothScroll
}
