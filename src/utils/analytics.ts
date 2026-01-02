import { useState, useEffect, useCallback } from 'react'

// Analytics and tracking utilities
export const analytics = {
  // Track page views
  trackPageView: (path: string, title?: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Page View:', { path, title })
    }
    
    // Future: Implement Google Analytics
    // gtag('config', 'GA_MEASUREMENT_ID', {
    //   page_path: path,
    //   page_title: title
    // })
  },

  // Track custom events
  trackEvent: (eventName: string, properties?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Event:', eventName, properties)
    }
    
    // Future: Implement analytics service
    // gtag('event', eventName, properties)
    // or mixpanel.track(eventName, properties)
  },

  // Track form submissions
  trackFormSubmission: (formName: string, success: boolean, errors?: string[]) => {
    analytics.trackEvent('form_submission', {
      form_name: formName,
      success,
      error_count: errors?.length || 0,
      errors
    })
  },

  // Track user interactions
  trackInteraction: (element: string, action: string, context?: Record<string, any>) => {
    analytics.trackEvent('user_interaction', {
      element,
      action,
      ...context
    })
  },

  // Track performance metrics
  trackPerformance: (metric: string, value: number) => {
    analytics.trackEvent('performance_metric', {
      metric,
      value
    })
  }
}

// A/B Testing utilities
export const abTesting = {
  // Get variant for user
  getVariant: (_testName: string, variants: string[]): string => {
    // Simple hash-based assignment for consistent results
    const userId = sessionManager.getUserId()
    const hash = userId.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)
    const variantIndex = hash % variants.length
    return variants[variantIndex]
  },

  // Track A/B test exposure
  trackExposure: (testName: string, variant: string) => {
    analytics.trackEvent('ab_test_exposure', {
      test_name: testName,
      variant
    })
  },

  // Track A/B test conversion
  trackConversion: (testName: string, variant: string, conversionType: string) => {
    analytics.trackEvent('ab_test_conversion', {
      test_name: testName,
      variant,
      conversion_type: conversionType
    })
  }
}

// User session management
export const sessionManager = {
  // Get or generate user ID
  getUserId: (): string => {
    let userId = sessionStorage.getItem('user_id')
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      sessionStorage.setItem('user_id', userId)
    }
    return userId
  },

  // Track session start
  trackSessionStart: () => {
    const sessionId = sessionManager.getSessionId()
    const userId = sessionManager.getUserId()
    
    analytics.trackEvent('session_start', {
      session_id: sessionId,
      user_id: userId,
      timestamp: Date.now(),
      referrer: document.referrer,
      landing_page: window.location.pathname
    })
  },

  // Get session ID
  getSessionId: (): string => {
    let sessionId = sessionStorage.getItem('session_id')
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      sessionStorage.setItem('session_id', sessionId)
    }
    return sessionId
  },

  // Track session end
  trackSessionEnd: () => {
    const sessionId = sessionManager.getSessionId()
    const sessionStart = sessionStorage.getItem('session_start')
    const duration = sessionStart ? Date.now() - parseInt(sessionStart) : 0
    
    analytics.trackEvent('session_end', {
      session_id: sessionId,
      duration,
      page_views: parseInt(sessionStorage.getItem('page_views') || '0')
    })
  }
}

// Lead scoring utilities
export const leadScoring = {
  // Calculate lead score based on behavior
  calculateScore: (interactions: Array<{
    type: string
    timestamp: number
    value?: number
  }>): number => {
    let score = 0
    
    interactions.forEach(interaction => {
      switch (interaction.type) {
        case 'simulator_use':
          score += 10
          break
        case 'form_view':
          score += 5
          break
        case 'page_view':
          score += 1
          break
        case 'time_on_page':
          if (interaction.value && interaction.value > 60000) { // More than 1 minute
            score += 3
          }
          break
        case 'scroll_depth':
          if (interaction.value && interaction.value > 0.8) { // Scrolled 80% or more
            score += 5
          }
          break
      }
    })
    
    return Math.min(score, 100) // Cap at 100
  },

  // Track lead interaction
  trackInteraction: (userId: string, interaction: {
    type: string
    value?: number
  }) => {
    const interactions = JSON.parse(localStorage.getItem(`lead_interactions_${userId}`) || '[]')
    interactions.push({
      ...interaction,
      timestamp: Date.now()
    })
    
    // Keep only last 50 interactions
    if (interactions.length > 50) {
      interactions.splice(0, interactions.length - 50)
    }
    
    localStorage.setItem(`lead_interactions_${userId}`, JSON.stringify(interactions))
    
    // Update lead score
    const score = leadScoring.calculateScore(interactions)
    analytics.trackEvent('lead_score_updated', {
      user_id: userId,
      score,
      interaction_type: interaction.type
    })
  }
}

// Conversion tracking
export const conversionTracking = {
  // Track form conversion
  trackFormConversion: (formData: Record<string, any>, formName: string) => {
    const userId = sessionManager.getUserId()
    
    analytics.trackEvent('conversion', {
      type: 'form_submission',
      form_name: formName,
      user_id: userId,
      timestamp: Date.now(),
      data: {
        has_consumption: !!formData.consumption,
        property_type: formData.propertyType,
        state: formData.state
      }
    })
    
    // Update lead scoring
    leadScoring.trackInteraction(userId, {
      type: 'form_submission',
      value: 20 // High value interaction
    })
  },

  // Track phone call conversion
  trackPhoneCall: (phoneNumber: string) => {
    analytics.trackEvent('conversion', {
      type: 'phone_call',
      phone_number: phoneNumber,
      timestamp: Date.now()
    })
  },

  // Track WhatsApp conversion
  trackWhatsApp: (phoneNumber: string) => {
    analytics.trackEvent('conversion', {
      type: 'whatsapp',
      phone_number: phoneNumber,
      timestamp: Date.now()
    })
  }
}

// Heatmap and user behavior tracking
export const behaviorTracking = {
  // Track clicks
  trackClick: (element: string, coordinates: { x: number; y: number }) => {
    analytics.trackEvent('click', {
      element,
      x: coordinates.x,
      y: coordinates.y,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight
    })
  },

  // Track scroll depth
  trackScrollDepth: () => {
    let maxScroll = 0
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const scrollPercentage = scrollPosition / scrollHeight
      
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage
        
        // Track milestones
        if (scrollPercentage >= 0.25 && scrollPercentage < 0.26) {
          analytics.trackEvent('scroll_milestone', { depth: '25%' })
        } else if (scrollPercentage >= 0.5 && scrollPercentage < 0.51) {
          analytics.trackEvent('scroll_milestone', { depth: '50%' })
        } else if (scrollPercentage >= 0.75 && scrollPercentage < 0.76) {
          analytics.trackEvent('scroll_milestone', { depth: '75%' })
        } else if (scrollPercentage >= 0.9 && scrollPercentage < 0.91) {
          analytics.trackEvent('scroll_milestone', { depth: '90%' })
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },

  // Track time on page
  trackTimeOnPage: () => {
    const startTime = Date.now()
    
    return () => {
      const timeSpent = Date.now() - startTime
      analytics.trackEvent('time_on_page', {
        duration: timeSpent,
        duration_seconds: Math.round(timeSpent / 1000)
      })
    }
  }
}

// Hook for analytics tracking
export const useAnalytics = () => {
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    // Start tracking
    sessionManager.trackSessionStart()
    setIsTracking(true)
    
    // Track page view
    analytics.trackPageView(window.location.pathname, document.title)
    
    // Setup behavior tracking
    const cleanupScroll = behaviorTracking.trackScrollDepth()
    const cleanupTime = behaviorTracking.trackTimeOnPage()
    
    // Track session end on page unload
    const handleUnload = () => {
      sessionManager.trackSessionEnd()
    }
    
    window.addEventListener('beforeunload', handleUnload)
    
    return () => {
      cleanupScroll()
      cleanupTime()
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [])

  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (isTracking) {
      analytics.trackEvent(eventName, properties)
    }
  }, [isTracking])

  const trackConversion = useCallback((type: string, data: Record<string, any>) => {
    if (isTracking) {
      conversionTracking.trackFormConversion(data, type)
    }
  }, [isTracking])

  return {
    trackEvent,
    trackConversion,
    isTracking
  }
}

export default analytics
