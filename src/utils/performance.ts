// Cache management for better performance
class CacheManager {
  private static instance: CacheManager
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager()
    }
    return CacheManager.instance
  }

  set(key: string, data: any, ttl: number = 300000): void { // 5 minutes default TTL
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  size(): number {
    return this.cache.size
  }
}

// Image optimization and lazy loading
export const imageOptimizer = {
  // Generate responsive image sizes
  generateSrcSet: (baseUrl: string, sizes: number[]): string => {
    return sizes
      .map(size => `${baseUrl}?w=${size}&q=80 ${size}w`)
      .join(', ')
  },

  // Generate WebP format
  generateWebPUrl: (url: string): string => {
    return `${url}?format=webp&q=80`
  },

  // Placeholder generation (blur effect)
  generatePlaceholder: (width: number, height: number): string => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Create a gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#f3f4f6')
      gradient.addColorStop(1, '#e5e7eb')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }
    
    return canvas.toDataURL()
  }
}

// Performance monitoring
export const performanceMonitor = {
  // Measure component render time
  measureRender: (componentName: string, renderFn: () => void): number => {
    const start = performance.now()
    renderFn()
    const end = performance.now()
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ ${componentName} render: ${(end - start).toFixed(2)}ms`)
    }
    
    return end - start
  },

  // Track user interactions
  trackInteraction: (eventType: string, element: string): void => {
    const timestamp = Date.now()
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`👆 ${eventType} on ${element} at ${new Date(timestamp).toISOString()}`)
    }
    
    // Future: Send to analytics
    // analytics.track('user_interaction', { eventType, element, timestamp })
  },

  // Monitor page load performance
  getPageLoadMetrics: (): {
    domContentLoaded: number
    loadComplete: number
    firstPaint: number
    firstContentfulPaint: number
  } => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
    }
  }
}

// Resource optimization
export const resourceOptimizer = {
  // Preload critical resources
  preloadResource: (url: string, type: 'script' | 'style' | 'image'): void => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    
    switch (type) {
      case 'script':
        link.as = 'script'
        break
      case 'style':
        link.as = 'style'
        break
      case 'image':
        link.as = 'image'
        break
    }
    
    document.head.appendChild(link)
  },

  // Prefetch non-critical resources
  prefetchResource: (url: string): void => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    document.head.appendChild(link)
  },

  // DNS prefetch for external domains
  dnsPrefetch: (domain: string): void => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = domain
    document.head.appendChild(link)
  }
}

// Memory management
export const memoryManager = {
  // Clean up event listeners
  cleanupEventListeners: (element: Element): void => {
    const clonedElement = element.cloneNode(true)
    element.parentNode?.replaceChild(clonedElement, element)
  },

  // Dispose large objects
  disposeObject: (obj: any): void => {
    Object.keys(obj).forEach(key => {
      delete obj[key]
    })
  },

  // Monitor memory usage
  getMemoryUsage: (): {
    used: number
    total: number
    percentage: number
  } => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
      }
    }
    
    return { used: 0, total: 0, percentage: 0 }
  }
}

// Network optimization
export const networkOptimizer = {
  // Debounce network requests
  debounceRequest: <T extends (...args: any[]) => any>(
    fn: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  },

  // Throttle network requests
  throttleRequest: <T extends (...args: any[]) => any>(
    fn: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        fn(...args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  },

  // Retry failed requests
  retryRequest: async <T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    try {
      return await fn()
    } catch (error) {
      if (retries <= 0) throw error
      
      await new Promise(resolve => setTimeout(resolve, delay))
      return networkOptimizer.retryRequest(fn, retries - 1, delay * 2)
    }
  }
}

// Bundle optimization utilities
export const bundleOptimizer = {
  // Dynamic import with loading state
  lazyLoad: async <T>(
    importFn: () => Promise<T>,
    fallback?: () => void
  ): Promise<T> => {
    try {
      fallback?.()
      return await importFn()
    } catch (error) {
      console.error('Failed to load module:', error)
      throw error
    }
  },

  // Code splitting helper
  splitCode: (componentName: string) => {
    return () => import(`../components/${componentName}`)
  },

  // Tree shaking helper
  treeShake: <T extends Record<string, any>>(module: T, usedExports: (keyof T)[]): Partial<T> => {
    const result: Partial<T> = {}
    usedExports.forEach(key => {
      if (key in module) {
        result[key] = module[key]
      }
    })
    return result
  }
}

export default CacheManager
