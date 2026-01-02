import { useState, useEffect, useCallback } from 'react'

// Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  const [renderCount, setRenderCount] = useState(0)
  const [lastRender, setLastRender] = useState(Date.now())

  useEffect(() => {
    setRenderCount(prev => prev + 1)
    const now = Date.now()
    const timeSinceLastRender = now - lastRender
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 ${componentName} render #${renderCount + 1} (${timeSinceLastRender}ms ago)`)
    }
    
    setLastRender(now)
  })

  return { renderCount, lastRender }
}

// Debounce hook for performance optimization
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Intersection Observer for lazy loading
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isIntersecting
}

// Local storage hook with error handling
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

// Image optimization helper
export const optimizeImage = (src: string, width?: number, height?: number): string => {
  if (!src) return ''
  
  // If it's already an optimized URL, return as is
  if (src.includes('?')) return src
  
  // Add optimization parameters
  const params = new URLSearchParams()
  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  params.append('auto', 'format')
  params.append('q', '80') // Quality
  
  return `${src}?${params.toString()}`
}

// Form validation helper
export const validateForm = (formData: Record<string, any>, rules: Record<string, (value: any) => string | null>) => {
  const errors: Record<string, string> = {}
  
  for (const [field, rule] of Object.entries(rules)) {
    const error = rule(formData[field])
    if (error) errors[field] = error
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Common validation rules
export const validationRules = {
  required: (value: any) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'Este campo é obrigatório'
    }
    return null
  },
  
  email: (value: string) => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Email inválido'
    }
    return null
  },
  
  phone: (value: string) => {
    if (!value) return null
    const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/
    if (!phoneRegex.test(value)) {
      return 'Telefone inválido. Use o formato (11) 99999-9999'
    }
    return null
  },
  
  minLength: (min: number) => (value: string) => {
    if (!value) return null
    if (value.length < min) {
      return `Mínimo de ${min} caracteres`
    }
    return null
  }
}

// Format currency helper
export const formatCurrency = (value: number, currency = 'BRL'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Format number helper
export const formatNumber = (value: number, decimals = 0): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}

// Analytics helper (placeholder for future implementation)
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, properties)
  }
  
  // Future: Implement Google Analytics, Mixpanel, etc.
  // gtag('event', eventName, properties)
}

// Error boundary helper
export const logError = (error: Error, context?: string) => {
  console.error(`❌ Error${context ? ` in ${context}` : ''}:`, error)
  
  // Future: Send to error reporting service
  // Sentry.captureException(error, { context })
}

// Performance helper
export const measurePerformance = (name: string, fn: () => void | Promise<void>) => {
  const start = performance.now()
  
  const result = fn()
  
  if (result instanceof Promise) {
    return result.finally(() => {
      const end = performance.now()
      console.log(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`)
    })
  } else {
    const end = performance.now()
    console.log(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`)
    return result
  }
}
