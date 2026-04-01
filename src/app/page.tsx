import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { RecordingDemo } from "@/components/recording-demo";
import { AiReport } from "@/components/ai-report";
import { DevContext } from "@/components/dev-context";
import { Integrations } from "@/components/integrations";
import { VideoPreviewCard } from "@/components/video-preview-card";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/ui/section";

export default function Home() {
  return (
    <>
      <Nav />
      <section id="hero">
        <Hero />
      </section>
      <SectionDivider />
      <section id="demo">
        <RecordingDemo />
      </section>
      <SectionDivider />
      <section id="ai-report">
        <AiReport />
      </section>
      <SectionDivider />
      <section id="dev-context">
        <DevContext />
      </section>
      <SectionDivider />
      <section id="integrations">
        <Integrations />
      </section>
      <section id="video" className="w-full px-6 py-12 md:py-24 max-w-[615px] mx-auto">
        <VideoPreviewCard />
      </section>
      <Footer />
    </>
  );
}
