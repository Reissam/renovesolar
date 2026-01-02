import { useState, useEffect } from 'react';
import Header from './components/Header';
import DynamicHero from './components/DynamicHero';
import Simulator from './components/Simulator';
import Features from './components/Features';
import DynamicCaseStudies from './components/DynamicCaseStudies';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import LeadForm from './components/LeadForm';
import ErrorBoundary from './components/ErrorBoundary';
import { updateMetaTags, addLocalBusinessData, addServiceData } from './utils/seo';
import { useAnalytics } from './utils/analytics';
import { OptimizedSection } from './components/PerformanceComponents';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [simulatorConsumption, setSimulatorConsumption] = useState<number | null>(null);
  const { trackEvent, trackConversion, isTracking } = useAnalytics();

  const handleSimulatorProposal = (consumption: number) => {
    setSimulatorConsumption(consumption);
    setShowForm(true);
    
    // Track simulator usage
    trackEvent('simulator_proposal_request', {
      consumption,
      timestamp: Date.now()
    });
  };

  // SEO and meta tags setup
  useEffect(() => {
    updateMetaTags({
      title: 'Renove Solar - Economize até 80% na conta de luz',
      description: 'Instalação de energia solar com economia de até 80%. Simulador gratuito, orçamento personalizado e instalação rápida em toda região Norte.',
      keywords: 'energia solar, painel solar, economia de energia, solar fotovoltaica, renove solar, pará, amapá'
    });

    addLocalBusinessData();
    addServiceData();

    // Track page view
    if (isTracking) {
      trackEvent('page_load', {
        page: 'home',
        timestamp: Date.now()
      });
    }
  }, [isTracking, trackEvent]);

  // Performance monitoring
  useEffect(() => {
    // Monitor page load performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          const loadTime = navEntry.loadEventEnd - navEntry.loadEventStart;
          
          if (isTracking) {
            trackEvent('performance_metric', {
              metric: 'page_load_time',
              value: loadTime
            });
          }
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['navigation'] });
    } catch (error) {
      console.warn('Performance observer not supported');
    }

    return () => observer.disconnect();
  }, [isTracking, trackEvent]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header onContactClick={() => setShowForm(!showForm)} />
        <main>
          <OptimizedSection id="inicio">
            <DynamicHero onSimulateClick={() => setShowForm(true)} />
          </OptimizedSection>
          
          <OptimizedSection id="simulador">
            <Simulator onProposalClick={handleSimulatorProposal} />
          </OptimizedSection>
          
          <OptimizedSection id="beneficios">
            <Features />
          </OptimizedSection>
          
          <OptimizedSection id="projetos">
            <DynamicCaseStudies />
          </OptimizedSection>
          
          <OptimizedSection id="faq">
            <FAQ />
          </OptimizedSection>
          
          <OptimizedSection id="contato">
            <CallToAction onContactClick={() => setShowForm(true)} />
          </OptimizedSection>
        </main>
        
        <Footer />
        
        {showForm && (
          <LeadForm 
            onClose={() => setShowForm(false)} 
            initialConsumption={simulatorConsumption || undefined}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
