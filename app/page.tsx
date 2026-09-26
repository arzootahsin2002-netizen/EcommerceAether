import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { FlashDeals } from '@/components/home/FlashDeals';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { LookbookSection } from '@/components/home/LookbookSection';
import { TrustSection } from '@/components/home/TrustSection';
import { CustomerReviewsSection } from '@/components/home/CustomerReviewsSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroBanner />
      <CategoryTiles />
      <FlashDeals />
      <FeaturedProducts />
      <LookbookSection />
      <TrustSection />
      <CustomerReviewsSection />
    </div>
  );
}
