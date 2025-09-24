import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Users, Clock, TrendingUp, Zap } from "lucide-react";

export const DemoSection = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [statsRef, statsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [currentProblem, setCurrentProblem] = useState(0);

  const meetingProblems = [
    "verlorene Aktionspunkte",
    "vergessene Entscheidungen", 
    "unklare Verantwortlichkeiten",
    "wiederholte Diskussionen",
    "verschwendete Zeit",
    "verpasste Deadlines"
  ];

  const statistics = [
    {
      icon: Users,
      number: "500+",
      label: "Unternehmen vertrauen uns"
    },
    {
      icon: Clock,
      number: "23h",
      label: "Meeting-Zeit wöchentlich gespart"
    },
    {
      icon: TrendingUp,
      number: "180%",
      label: "Durchschnittlicher ROI"
    },
    {
      icon: Zap,
      number: "50%",
      label: "Weniger unproduktive Meetings"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProblem((prev) => (prev + 1) % meetingProblems.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        {/* Dynamic Text Section */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div className="mb-8">
            <h2 className="font-geist font-bold text-4xl md:text-6xl text-foreground mb-4">
              <span className="wave-hand">👋</span> Wave goodbye to
            </h2>
            <div className="relative h-20 flex items-center justify-center">
              {meetingProblems.map((problem, index) => (
                <div
                  key={problem}
                  className={`absolute transition-all duration-500 ${
                    index === currentProblem
                      ? 'opacity-100 transform translate-y-0'
                      : 'opacity-0 transform translate-y-4'
                  }`}
                >
                  <span className="font-geist font-bold text-3xl md:text-5xl text-destructive">
                    {problem}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="font-poppins font-medium text-xl text-foreground/70 max-w-3xl mx-auto">
            Mit MeetioAI verwandeln Sie chaotische Meetings in strukturierte Geschäftsintelligenz
          </p>
        </div>

        {/* Statistics Grid */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-700 ${
            statsInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          {statistics.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-hover transition-all duration-300 group"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-full bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                  <stat.icon className="h-6 w-6 text-brand-primary" />
                </div>
              </div>
              <div className="font-geist font-bold text-2xl md:text-3xl text-foreground mb-2">
                {stat.number}
              </div>
              <p className="font-poppins text-sm text-foreground/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};