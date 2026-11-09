import PreviewFrame from '@/components/preview/PreviewFrame';
import PrototypeHeader from '@/components/preview/PrototypeHeader';
import PrototypeFooter from '@/components/preview/PrototypeFooter';
import { BusinessSplit, MlmIntroBand } from '@/components/preview/home/BusinessSections';
import { CategoryGrid, HomeHero, ProductSections, TrustStrip } from '@/components/preview/home/HomeSections';

export default function HomePrototypePage() {
  return (
    <PreviewFrame>
      <PrototypeHeader />
      <main id="main-content" className="flex-1">
        <HomeHero />
        <CategoryGrid />
        <ProductSections />
        <BusinessSplit />
        <MlmIntroBand />
        <TrustStrip />
      </main>
      <PrototypeFooter />
    </PreviewFrame>
  );
}
