import { useState } from 'react';
import Header from './components/Header';
import DynamicHero from './components/DynamicHero';
import Simulator from './components/Simulator';
import Features from './components/Features';
import DynamicCaseStudies from './components/DynamicCaseStudies';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import LeadForm from './components/LeadForm';

function AppAdmin() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onContactClick={() => setShowForm(!showForm)} />
      <main>
        <DynamicHero onSimulateClick={() => setShowForm(true)} />
        <Simulator />
        <Features />
        <DynamicCaseStudies />
        <FAQ />
        <CallToAction onContactClick={() => setShowForm(true)} />
      </main>
      <Footer />
      {showForm && <LeadForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default AppAdmin;
