// Performance Configuration
export const PERFORMANCE_CONFIG = {
  // Image optimization
  IMAGE: {
    QUALITY: 80,
    FORMAT: 'auto',
    SIZES: [320, 640, 960, 1280, 1920],
    PLACEHOLDER_BLUR: 10,
    LAZY_LOADING_THRESHOLD: 200
  },

  // Animation and transitions
  ANIMATION: {
    DURATION: {
      FAST: 150,
      NORMAL: 300,
      SLOW: 500
    },
    EASING: {
      EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
      EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
      EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // Intersection Observer thresholds
  INTERSECTION: {
    THRESHOLD: 0.1,
    ROOT_MARGIN: '50px',
    DELAY: 100
  },

  // Debounce and throttle delays
  DELAYS: {
    SEARCH: 300,
    SCROLL: 16,
    RESIZE: 250,
    INPUT: 500
  },

  // Cache TTL in milliseconds
  CACHE_TTL: {
    API_RESPONSES: 300000, // 5 minutes
    IMAGES: 3600000, // 1 hour
    USER_PREFERENCES: 86400000, // 24 hours
    STATIC_DATA: 604800000 // 7 days
  },

  // Performance budgets
  BUDGETS: {
    FIRST_CONTENTFUL_PAINT: 1500, // 1.5s
    LARGEST_CONTENTFUL_PAINT: 2500, // 2.5s
    TIME_TO_INTERACTIVE: 3800, // 3.8s
    CUMULATIVE_LAYOUT_SHIFT: 0.1,
    FIRST_INPUT_DELAY: 100 // 100ms
  }
}

// SEO Configuration
export const SEO_CONFIG = {
  // Default meta tags
  DEFAULT_META: {
    title: 'Renove Solar - Economize até 80% na conta de luz',
    description: 'Instalação de energia solar com economia de até 80%. Simulador gratuito, orçamento personalizado e instalação rápida em toda região Norte.',
    keywords: 'energia solar, painel solar, economia de energia, solar fotovoltaica, renove solar, pará, amapá',
    author: 'Renove Solar',
    robots: 'index, follow',
    language: 'pt-BR'
  },

  // Open Graph configuration
  OPEN_GRAPH: {
    type: 'website',
    locale: 'pt_BR',
    site_name: 'Renove Solar'
  },

  // Twitter Card configuration
  TWITTER_CARD: {
    card: 'summary_large_image',
    site: '@renovesolar'
  },

  // Structured data types
  STRUCTURED_DATA: {
    ORGANIZATION: {
      name: 'Renove Solar',
      url: 'https://renovesolar.com.br',
      logo: 'https://renovesolar.com.br/logo.png',
      description: 'Especializada em instalação de sistemas de energia solar fotovoltaica',
      contactPoint: {
        telephone: '+55-96-2027-0750',
        contactType: 'customer service',
        availableLanguage: 'Portuguese'
      }
    },
    SERVICE: {
      name: 'Instalação de Energia Solar',
      description: 'Instalação completa de sistemas fotovoltaicos residenciais e comerciais',
      provider: {
        name: 'Renove Solar',
        url: 'https://renovesolar.com.br'
      }
    }
  },

  // Sitemap configuration
  SITEMAP: {
    CHANGEFREQ: {
      HOME: 'daily',
      SIMULATOR: 'weekly',
      CASE_STUDIES: 'monthly',
      FAQ: 'monthly'
    },
    PRIORITY: {
      HOME: 1.0,
      SIMULATOR: 0.9,
      CASE_STUDIES: 0.8,
      FAQ: 0.7
    }
  }
}

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  // Event tracking
  EVENTS: {
    PAGE_VIEW: 'page_view',
    FORM_SUBMISSION: 'form_submission',
    SIMULATOR_USE: 'simulator_use',
    WHATSAPP_CLICK: 'whatsapp_click',
    PHONE_CLICK: 'phone_click',
    SCROLL_DEPTH: 'scroll_depth',
    TIME_ON_PAGE: 'time_on_page'
  },

  // Custom dimensions
  DIMENSIONS: {
    USER_TYPE: 'dimension1',
    CONVERSION_SOURCE: 'dimension2',
    DEVICE_TYPE: 'dimension3'
  },

  // Conversion tracking
  CONVERSIONS: {
    LEAD_FORM: 'lead_form_submission',
    WHATSAPP_MESSAGE: 'whatsapp_message',
    PHONE_CALL: 'phone_call'
  },

  // A/B testing
  AB_TESTS: {
    HERO_CTA: {
      name: 'hero_cta_test',
      variants: ['current', 'variant_a', 'variant_b'],
      traffic_split: [0.6, 0.2, 0.2]
    },
    PRICING_DISPLAY: {
      name: 'pricing_display_test',
      variants: ['detailed', 'simplified'],
      traffic_split: [0.5, 0.5]
    }
  }
}

// Error handling configuration
export const ERROR_CONFIG = {
  // Error boundaries
  ERROR_BOUNDARY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
    LOG_ERRORS: true,
    SHOW_ERROR_UI: true
  },

  // API error handling
  API: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
    BACKOFF_MULTIPLIER: 2,
    TIMEOUT: 10000
  },

  // User feedback
  USER_FEEDBACK: {
    SHOW_TOAST: true,
    LOG_ERRORS: true,
    REPORT_TO_SERVICE: false // Future: Enable when error service is configured
  }
}

// Development configuration
export const DEV_CONFIG = {
  // Feature flags
  FEATURES: {
    ANALYTICS: process.env.NODE_ENV === 'production',
    PERFORMANCE_MONITORING: true,
    ERROR_BOUNDARY: true,
    LAZY_LOADING: true,
    SERVICE_WORKER: false // Future: Enable PWA features
  },

  // Debug options
  DEBUG: {
    CONSOLE_LOGS: process.env.NODE_ENV === 'development',
    PERFORMANCE_LOGS: process.env.NODE_ENV === 'development',
    NETWORK_LOGS: process.env.NODE_ENV === 'development',
    COMPONENT_LOGS: process.env.NODE_ENV === 'development'
  },

  // Mock data for development
  MOCK_DATA: {
    ENABLED: process.env.NODE_ENV === 'development',
    API_DELAY: 500, // Simulated network delay
    ERROR_RATE: 0.1 // 10% chance of simulated error
  }
}

// Production configuration
export const PROD_CONFIG = {
  // Optimization
  OPTIMIZATION: {
    MINIFY_JS: true,
    MINIFY_CSS: true,
    OPTIMIZE_IMAGES: true,
    GENERATE_SOURCEMAPS: false,
    BUNDLE_ANALYZER: false
  },

  // Security
  SECURITY: {
    CSP_ENABLED: true,
    HTTPS_ONLY: true,
    SRI_ENABLED: false // Future: Enable Subresource Integrity
  },

  // Caching
  CACHING: {
    STATIC_ASSETS: 31536000, // 1 year
    HTML_PAGES: 3600, // 1 hour
    API_RESPONSES: 300 // 5 minutes
  }
}

// Environment-specific configuration
export const getConfig = () => {
  const isDev = process.env.NODE_ENV === 'development'
  const isProd = process.env.NODE_ENV === 'production'
  
  return {
    performance: PERFORMANCE_CONFIG,
    seo: SEO_CONFIG,
    analytics: ANALYTICS_CONFIG,
    error: ERROR_CONFIG,
    ...(isDev && { dev: DEV_CONFIG }),
    ...(isProd && { prod: PROD_CONFIG }),
    isDev,
    isProd
  }
}

export default getConfig
