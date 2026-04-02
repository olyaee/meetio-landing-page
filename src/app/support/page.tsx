import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SupportForm } from "@/components/support-form";

export default function SupportPage() {
  return (
    <>
      <Nav />
      <div className="max-w-lg mx-auto px-6 py-24 md:py-32">
        <h1 className="text-3xl font-bold mb-2">Contact support</h1>
        <p className="text-muted text-sm mb-8">Have a question or need help? Send us a message.</p>
        <SupportForm />
      </div>
      <Footer />
    </>
  );
}
