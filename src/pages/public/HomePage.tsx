import React from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { QuickServices } from '../../components/home/QuickServices';
import { StatsSection } from '../../components/home/StatsSection';
import { HowItWorks } from '../../components/home/HowItWorks';
import { PopularServices } from '../../components/home/PopularServices';
import { CitizenFaqSection } from '../../components/home/CitizenFaqSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <QuickServices />
      <StatsSection />
      <HowItWorks />
      <PopularServices />
      <CitizenFaqSection />
    </>
  );
};
