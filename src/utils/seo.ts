// SEO and Meta Tags Management
export const updateMetaTags = (config: {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}) => {
  const {
    title = 'Renove Solar - Economize até 80% na conta de luz',
    description = 'Instalação de energia solar com economia de até 80%. Simulador gratuito, orçamento personalizado e instalação rápida em toda região Norte.',
    keywords = 'energia solar, painel solar, economia de energia, solar fotovoltaica, renove solar',
    image = '/og-image.jpg',
    url = window.location.href,
    type = 'website'
  } = config

  // Update title
  document.title = title

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string) => {
    let tag = document.querySelector(`meta[name="${name}"]`) || 
              document.querySelector(`meta[property="${name}"]`)
    
    if (!tag) {
      tag = document.createElement('meta')
      if (name.startsWith('og:')) {
        tag.setAttribute('property', name)
      } else {
        tag.setAttribute('name', name)
      }
      document.head.appendChild(tag)
    }
    
    tag.setAttribute('content', content)
  }

  // Basic meta tags
  updateMetaTag('description', description)
  updateMetaTag('keywords', keywords)

  // Open Graph tags
  updateMetaTag('og:title', title)
  updateMetaTag('og:description', description)
  updateMetaTag('og:image', image)
  updateMetaTag('og:url', url)
  updateMetaTag('og:type', type)

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image')
  updateMetaTag('twitter:title', title)
  updateMetaTag('twitter:description', description)
  updateMetaTag('twitter:image', image)

  // Additional meta tags
  updateMetaTag('robots', 'index, follow')
  updateMetaTag('author', 'Renove Solar')
  updateMetaTag('language', 'pt-BR')
  updateMetaTag('geo.region', 'BR-PA')
  updateMetaTag('geo.placename', 'Belém, Pará')
  updateMetaTag('ICBM', '-1.4558,-48.4902')
}

// Structured Data (JSON-LD)
export const addStructuredData = (type: string, data: Record<string, any>) => {
  // Remove existing structured data of the same type
  const existingScript = document.querySelector(`script[type="application/ld+json"][data-type="${type}"]`)
  if (existingScript) {
    existingScript.remove()
  }

  // Create new structured data
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-type', type)
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  })

  document.head.appendChild(script)
}

// LocalBusiness structured data
export const addLocalBusinessData = () => {
  addStructuredData('LocalBusiness', {
    name: 'Renove Solar',
    description: 'Especializada em instalação de sistemas de energia solar fotovoltaica',
    url: window.location.origin,
    telephone: '(96) 2027-0750',
    email: 'contato@renovesolar.com.br',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Belém',
      addressRegion: 'PA',
      addressCountry: 'BR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-1.4558',
      longitude: '-48.4902'
    },
    openingHours: 'Mo-Fr 08:00-18:00',
    priceRange: '$$$',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    areaServed: 'Pará, Amapá, Maranhão',
    serviceType: 'Solar Energy Installation'
  })
}

// Service structured data
export const addServiceData = () => {
  addStructuredData('Service', {
    name: 'Instalação de Energia Solar',
    description: 'Instalação completa de sistemas fotovoltaicos residenciais e comerciais',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Renove Solar'
    },
    serviceType: 'Solar Energy Installation',
    areaServed: 'Região Norte do Brasil',
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'BRL',
        price: '15000'
      },
      availability: 'https://schema.org/InStock'
    }
  })
}

// FAQ structured data
export const addFAQData = (faqs: Array<{ question: string; answer: string }>) => {
  addStructuredData('FAQPage', {
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  })
}

// Breadcrumb structured data
export const addBreadcrumbData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  addStructuredData('BreadcrumbList', {
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url
    }))
  })
}

// Performance monitoring
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vitals:', metric)
  }
  
  // Future: Send to analytics service
  // gtag('event', metric.name, {
  //   value: Math.round(metric.value),
  //   event_category: 'Web Vitals'
  // })
}

// Sitemap generation helper
export const generateSitemap = (pages: Array<{ url: string; lastmod: string; changefreq: string; priority: number }>) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${window.location.origin}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`

  return sitemap
}

// Robots.txt generation
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /
Sitemap: ${window.location.origin}/sitemap.xml

# Block common bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /`
}

// Canonical URL management
export const setCanonicalUrl = (url?: string) => {
  const canonicalUrl = url || window.location.href
  
  // Remove existing canonical tag
  const existingCanonical = document.querySelector('link[rel="canonical"]')
  if (existingCanonical) {
    existingCanonical.remove()
  }
  
  // Add new canonical tag
  const canonical = document.createElement('link')
  canonical.rel = 'canonical'
  canonical.href = canonicalUrl
  document.head.appendChild(canonical)
}

// Alternative language links
export const addAlternateLinks = (alternates: Array<{ lang: string; url: string }>) => {
  // Remove existing alternate links
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove())
  
  // Add new alternate links
  alternates.forEach(alternate => {
    const link = document.createElement('link')
    link.rel = 'alternate'
    link.hreflang = alternate.lang
    link.href = alternate.url
    document.head.appendChild(link)
  })
}
