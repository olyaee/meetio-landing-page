import Image from "next/image";

type TeamMember = {
  name: string;
  desc: string;
  linkedin: string;
  image: string;
};

const FOUNDERS: TeamMember[] = [
  {
    name: "Ehsan Olyaee",
    desc: "Got mass-reported for debugging a bug before lunch. Talks to AI more than humans. Previously built AI systems at enterprise scale, now building meetio so no one ever has to say \"works on my machine\" again.",
    linkedin: "https://www.linkedin.com/in/ehsanolyaee/",
    image: "/team/ehsan.jpg",
  },
];

const ADVISORS: TeamMember[] = [
  {
    name: "Bergen Helms",
    desc: "Co-founded Soley – pioneering Product Mining and helping manufacturers like Bosch and Viessmann save millions. Now building P2M at encoway, an AI-powered sales empowerment solution for variant manufacturers. PhD from TU Munich, 15+ years at the intersection of data, AI, and product.",
    linkedin: "https://www.linkedin.com/in/helmsbergen/",
    image: "/team/bergen.jpg",
  },
  {
    name: "Kian Rogerdi",
    desc: "Product-driven technology leader with deep technical roots and pragmatic product strategy. Built customer-centric products that solve real problems.",
    linkedin: "https://www.linkedin.com/in/kianrogerdi/",
    image: "/team/kian.jpg",
  },
];

function Avatar({ person, size = "lg" }: { person: TeamMember; size?: "lg" | "sm" }) {
  const px = size === "lg" ? 96 : 72;
  const cls = size === "lg" ? "w-24 h-24" : "w-[72px] h-[72px]";
  return <Image src={person.image} alt={person.name} width={px} height={px} className={`${cls} rounded-full object-cover`} />;
}

function LinkedInIcon({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    </a>
  );
}

export function About() {
  return (
    <div className="max-w-[800px] mx-auto px-6">
      {/* Hero */}
      <section className="text-center pt-12 pb-16 md:pt-20 md:pb-24">
        <h1 className="text-3xl md:text-[56px] font-extrabold leading-[1.15] md:leading-[1.1] tracking-tight mb-4 md:mb-5">
          The people behind{" "}
          <span className="text-muted">meetio</span>
        </h1>
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-[520px] mx-auto">
          We talked to 40+ teams and found the same problem everywhere: engineers
          burn hours reproducing bugs that users can&apos;t explain. So we built meetio.
        </p>
      </section>

      {/* Founder */}
      <section className="pb-16 md:pb-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-8">Founder</p>
        {FOUNDERS.map((f) => (
          <div key={f.name} className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar person={f} size="lg" />
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h2 className="text-xl font-bold">{f.name}</h2>
                <LinkedInIcon href={f.linkedin} />
              </div>
              <p className="text-sm text-muted leading-relaxed max-w-[400px] mt-1">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Advisors */}
      <section className="border-t border-border pt-12 pb-16 md:pt-16 md:pb-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-8">Advisors</p>
        <div className="grid sm:grid-cols-2 gap-10">
          {ADVISORS.map((a) => (
            <div key={a.name} className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Avatar person={a} size="sm" />
              <div className="flex items-center gap-2 mt-4 justify-center sm:justify-start">
                <h3 className="font-semibold text-base">{a.name}</h3>
                <LinkedInIcon href={a.linkedin} />
              </div>
              <p className="text-sm text-muted leading-relaxed mt-1">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
