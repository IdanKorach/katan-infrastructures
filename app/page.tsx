import FeaturedServices from '@/components/landing-page/featured-services';
import HeroSection from '@/components/landing-page/hero-section';
import RecentlyLunchedProjects from '@/components/landing-page/recently-lunched-projects';

export default function Home() {
  return (
    <div>
      <HeroSection />

      <FeaturedServices />

      <RecentlyLunchedProjects/>
    </div>
  );
}
