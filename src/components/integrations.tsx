import { Section } from "@/components/ui/section";
import { FeatureGrid, FeatureText, FeatureVisual } from "@/components/ui/feature-grid";

function JiraIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="#0052CC">
      <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z" />
    </svg>
  );
}

function LinearIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="#5E6AD2">
      <path d="M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="#181717">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A" />
      <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0" />
      <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D" />
      <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E" />
    </svg>
  );
}

function NotionIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="#000">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
    </svg>
  );
}

const ICON_CARDS: { icon: React.ReactNode; position: string; size: string }[] = [
  { icon: <JiraIcon />, position: "top-5 left-[30px]", size: "w-[90px] h-[90px]" },
  { icon: <LinearIcon />, position: "top-[100px] left-[160px]", size: "w-[100px] h-[100px]" },
  { icon: <GitHubIcon />, position: "top-[10px] right-[80px]", size: "w-[105px] h-[105px]" },
  { icon: <SlackIcon />, position: "top-[200px] left-[60px]", size: "w-[95px] h-[95px]" },
  { icon: <NotionIcon />, position: "top-[170px] right-[40px]", size: "w-[90px] h-[90px]" },
];

export function Integrations() {
  return (
    <Section>
      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <FeatureGrid>
          <FeatureText>
            <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight mb-4">
              Export to{" "}
              <span className="text-muted">where your team already works</span>
            </h2>
            <p className="text-base text-muted leading-relaxed">
              One-click export to your issue tracker. The full report, console logs,
              and replay link are included automatically.
            </p>
          </FeatureText>
          <FeatureVisual className="!bg-surface overflow-visible !p-0">
            <div className="relative h-[320px] w-full">
              {ICON_CARDS.map((card, i) => (
                <div
                  key={i}
                  className={`absolute ${card.position} ${card.size} bg-white border border-border rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:scale-110`}
                >
                  {card.icon}
                </div>
              ))}
            </div>
          </FeatureVisual>
        </FeatureGrid>
      </div>

      {/* Mobile: vertical with scattered icons */}
      <div className="md:hidden">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight mb-2">
            Export to{" "}
            <span className="text-muted">where your team already works</span>
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            One-click export to your issue tracker.
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl relative h-[240px] mx-2">
          <div className="absolute top-4 left-4 w-[70px] h-[70px] bg-white border border-border rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <JiraIcon />
          </div>
          <div className="absolute top-3 right-8 w-[75px] h-[75px] bg-white border border-border rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <GitHubIcon />
          </div>
          <div className="absolute top-[85px] left-[35%] w-[80px] h-[80px] bg-white border border-border rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <LinearIcon />
          </div>
          <div className="absolute bottom-4 left-5 w-[70px] h-[70px] bg-white border border-border rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <SlackIcon />
          </div>
          <div className="absolute bottom-5 right-6 w-[70px] h-[70px] bg-white border border-border rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <NotionIcon />
          </div>
        </div>
      </div>
    </Section>
  );
}
