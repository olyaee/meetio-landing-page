import { useState, useMemo, useEffect } from 'react';
import { Brain, Zap, Shield, Briefcase, Users, DollarSign, ArrowRight, BarChart, Download } from 'lucide-react';
import { InterestContactForm } from "./InterestContactForm";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- Konfigurationskonstanten (Einfach zu aktualisieren) ---
const ROLE_DATA = {
  consultant: { name: 'Unternehmensberater/in', avgSalary: 95000 },
  saas_pm: { name: 'Produktmanager/in (SaaS)', avgSalary: 85000 },
  saas_sales: { name: 'Sales Executive (SaaS)', avgSalary: 80000 },
  lawyer: { name: 'Anwalt/Anwältin / Partner/in', avgSalary: 120000 },
  manufacturing: { name: 'Betriebsleiter/in', avgSalary: 75000 },
  other: { name: 'Wissensarbeiter/in', avgSalary: 65000 },
};

const INDUSTRY_DATA = {
  consulting: { name: 'Unternehmensberatung' },
  saas: { name: 'Enterprise SaaS' },
  pe: { name: 'Private Equity' },
  law: { name: 'Anwaltskanzlei' },
  manufacturing: { name: 'Produzierendes Gewerbe' },
};

const ANNUAL_WORK_HOURS = 2080;
const WORK_WEEKS = 50;
const AVG_PRICE_PER_USER_MONTHLY = 45; // Preis in EUR
const TURNOVER_COST_MULTIPLIER = 1.5; // Kosten für Ersatz = 1.5x des Jahresgehalts
const KNOWLEDGE_RETENTION_SAVINGS_PERCENTAGE = 0.35; // Meetio spart 35% dieser Kosten

// --- HILFSKOMPONENTEN FÜR DIE UI (KORRIGIERT) ---
const SliderInput = ({ label, value, onChange, name, ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="font-poppins text-sm text-foreground/80">{label}</label>
    <div className="flex items-center gap-4">
      <input
        type="range"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
        {...props}
      />
      <span className="font-geist font-semibold text-brand-primary text-lg w-16 text-right">{value}{props.unit || ''}</span>
    </div>
  </div>
);

const NumberInput = ({ label, value, onChange, name, icon: Icon, ...props }: any) => (
    <div className="flex flex-col gap-2">
        <label className="font-poppins text-sm text-foreground/80">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="w-5 h-5 text-foreground/50" />
            </div>
            <input
                type="number"
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-secondary border border-foreground/10 rounded-lg p-2.5 pl-10 focus:ring-brand-primary focus:border-brand-primary transition-colors"
                {...props}
            />
        </div>
    </div>
);

// --- HAUPTKOMPONENTE: ROI-RECHNER (VOLLSTÄNDIG KORRIGIERT) ---
export const ROICalculatorSection = () => {
  const [stage, setStage] = useState<'personal' | 'company'>('personal');
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formType, setFormType] = useState<'interest' | 'contact' | 'waitlist'>('interest');
  
  // Animation controls
  const titleControls = useAnimation();
  const calculatorControls = useAnimation();
  const resultsControls = useAnimation();
  const [sectionRef, sectionInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  // Sequential animations
  useEffect(() => {
    if (sectionInView) {
      const runAnimations = async () => {
        await titleControls.start({ opacity: 1, y: 0 });
        await Promise.all([
          calculatorControls.start({ opacity: 1, x: 0 }),
          resultsControls.start({ opacity: 1, x: 0 })
        ]);
      };
      runAnimations();
    }
  }, [sectionInView, titleControls, calculatorControls, resultsControls]);

  const [personalInputs, setPersonalInputs] = useState({
    role: 'saas_pm',
    meetings: 10,
    followUp: 4,
  });

  const [companyInputs, setCompanyInputs] = useState({
    industry: 'saas',
    employees: 50,
    avgSalary: 70000,
    salesVelocity: true,
    knowledgeRetention: true,
    numSalesReps: 10,
    turnoverRate: 12,
  });

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalInputs(prev => ({ 
        ...prev, 
        [name]: name === 'role' ? value : Number(value) 
    }));
  };
  
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setCompanyInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'industry' ? value : Number(value)),
    }));
  };

  const personalResults = useMemo(() => {
    const roleData = ROLE_DATA[personalInputs.role as keyof typeof ROLE_DATA];
    const hourlyRate = roleData.avgSalary / ANNUAL_WORK_HOURS;
    const prepSavings = 2 * WORK_WEEKS;
    const inMeetingSavings = (personalInputs.meetings * 0.25) * WORK_WEEKS;
    const postMeetingSavings = (personalInputs.followUp * 0.9) * WORK_WEEKS;
    const totalHours = prepSavings + inMeetingSavings + postMeetingSavings;
    const totalValue = totalHours * hourlyRate;
    return {
      totalHours: totalHours.toFixed(0),
      totalValue: totalValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }),
      breakdown: { prep: prepSavings.toFixed(0), inMeeting: inMeetingSavings.toFixed(0), postMeeting: postMeetingSavings.toFixed(0) }
    };
  }, [personalInputs]);

  const companyResults = useMemo(() => {
    const { industry, employees, avgSalary, salesVelocity, knowledgeRetention, numSalesReps, turnoverRate } = companyInputs;
    const baselineProductivity = employees * 5000;
    let industryGains = 0;
    let knowledgeSavings = 0;
    if (knowledgeRetention) {
        const totalTurnoverCost = (employees * (turnoverRate / 100)) * (avgSalary * TURNOVER_COST_MULTIPLIER);
        knowledgeSavings = totalTurnoverCost * KNOWLEDGE_RETENTION_SAVINGS_PERCENTAGE;
    }
    switch (industry) {
        case 'saas': if (salesVelocity) industryGains = numSalesReps * 350000; break;
        case 'consulting': industryGains = (employees * 0.15) * 350000; break;
        case 'manufacturing': industryGains = 1800000; break;
        case 'law': industryGains = (employees * 0.15) * 360000; break;
        case 'pe': industryGains = (employees * 0.20) * 90000 + 900000; break;
    }
    const totalValue = baselineProductivity + industryGains + knowledgeSavings;
    const investment = employees * AVG_PRICE_PER_USER_MONTHLY * 12;
    const roi = investment > 0 ? ((totalValue - investment) / investment) * 100 : 0;
    const paybackMonths = totalValue > 0 ? (investment / totalValue) * 12 : 0;
    return {
      totalValue: totalValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }),
      investment: investment.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }),
      roi: roi.toLocaleString('de-DE', { maximumFractionDigits: 0 }),
      payback: paybackMonths < 1 ? '< 1 Monat' : `${paybackMonths.toFixed(1)} Monate`,
    };
  }, [companyInputs]);

  const handleInterestClick = () => {
    setFormType('interest');
    setFormModalOpen(true);
  };

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Animated Title */}
        <motion.div 
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={titleControls}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-geist font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 sm:mb-8">
            Höre auf, deine besten Ideen zu verlieren
          </h2>
          <p className="font-poppins font-medium text-lg sm:text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            Eure Meetings enthalten das wertvollste, unausgesprochene Wissen Ihres Unternehmens. Sie aufzuzeichnen dient der Sicherung und Skalierung eurer kollektiven Intelligenz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Calculator Form */}
          <motion.div 
            className="bg-card p-8 sm:p-10 rounded-2xl shadow-lg border border-foreground/10"
            initial={{ opacity: 0, x: -30 }}
            animate={calculatorControls}
            transition={{ duration: 0.8 }}
          >
            <div className="flex border-b border-foreground/10 mb-6">
              <button onClick={() => setStage('personal')} className={`flex-1 font-geist font-semibold p-3 transition-colors ${stage === 'personal' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-foreground/60 hover:text-foreground'}`}>
                Mein persönlicher ROI
              </button>
              <button onClick={() => setStage('company')} className={`flex-1 font-geist font-semibold p-3 transition-colors ${stage === 'company' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-foreground/60 hover:text-foreground'}`}>
                ROI für die Firma
              </button>
            </div>

            {stage === 'personal' && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h3 className="font-geist font-bold text-xl text-foreground">Berechne deine persönliche Zeitersparnis</h3>
                <div>
                  <label className="font-poppins text-sm text-foreground/80 mb-2 block">Was ist deine primäre Rolle?</label>
                  <select name="role" value={personalInputs.role} onChange={handlePersonalChange} className="w-full bg-secondary border border-foreground/10 rounded-lg p-2.5">
                    {Object.entries(ROLE_DATA).map(([key, { name }]) => (<option key={key} value={key}>{name}</option>))}
                  </select>
                </div>
                <SliderInput label="Stunden in Meetings pro Woche:" name="meetings" value={personalInputs.meetings} min={1} max={40} onChange={handlePersonalChange} unit="h" />
                <SliderInput label="Wöchentlicher Zeitaufwand für Follow-ups:" name="followUp" value={personalInputs.followUp} min={0} max={10} onChange={handlePersonalChange} unit="h" />
              </div>
            )}

            {stage === 'company' && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h3 className="font-geist font-bold text-xl text-foreground">Erstelle deinen Business Case</h3>
                <div>
                  <label className="font-poppins text-sm text-foreground/80 mb-2 block">Was ist deine Branche?</label>
                  <select name="industry" value={companyInputs.industry} onChange={handleCompanyChange} className="w-full bg-secondary border border-foreground/10 rounded-lg p-2.5">
                    {Object.entries(INDUSTRY_DATA).map(([key, { name }]) => (<option key={key} value={key}>{name}</option>))}
                  </select>
                </div>
                <NumberInput label="Anzahl Mitarbeiter in Meetings" name="employees" value={companyInputs.employees} onChange={handleCompanyChange} placeholder="z.B. 50" icon={Users} />
                <NumberInput label="Durchschnittliches Jahresgehalt" name="avgSalary" value={companyInputs.avgSalary} onChange={handleCompanyChange} placeholder="z.B. 70000" icon={DollarSign} />
                <div className="border-t border-foreground/10 pt-4 flex flex-col gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="salesVelocity" checked={companyInputs.salesVelocity} onChange={handleCompanyChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-primary"></div>
                    <span className="ml-3 font-poppins text-sm text-foreground/80">Vertriebs-/Projektgeschwindigkeit erhöhen?</span>
                  </label>
                  {companyInputs.salesVelocity && (
                    <div className="pl-6 animate-fade-in-down">
                      <NumberInput label="Anzahl Vertriebler/Projektpartner" name="numSalesReps" value={companyInputs.numSalesReps} onChange={handleCompanyChange} placeholder="z.B. 10" icon={Briefcase} />
                    </div>
                  )}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="knowledgeRetention" checked={companyInputs.knowledgeRetention} onChange={handleCompanyChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-primary"></div>
                    <span className="ml-3 font-poppins text-sm text-foreground/80">Wissensverlust durch Fluktuation mindern?</span>
                  </label>
                  {companyInputs.knowledgeRetention && (
                    <div className="pl-6 animate-fade-in-down">
                      <SliderInput label="Jährliche Fluktuationsrate (%):" name="turnoverRate" value={companyInputs.turnoverRate} min={1} max={40} onChange={handleCompanyChange} unit="%" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Results Panel */}
          <motion.div 
            className="bg-gradient-to-br from-brand-primary/10 to-secondary/10 p-8 sm:p-10 rounded-2xl border-2 border-brand-primary/20 sticky top-24"
            initial={{ opacity: 0, x: 30 }}
            animate={resultsControls}
            transition={{ duration: 0.8 }}
          >
            {stage === 'personal' && (
              <div className="text-center animate-fade-in">
                <p className="font-poppins text-foreground/80 mb-2">Du kannst schätzungsweise</p>
                <div className="font-geist font-bold text-5xl md:text-6xl text-brand-primary mb-4">{personalResults.totalHours} Stunden/Jahr</div>
                <div className="font-poppins font-semibold text-xl text-foreground mb-6">im Wert von {personalResults.totalValue} zurückgewinnen</div>
                <div className="text-left font-poppins text-sm space-y-3 bg-secondary/50 p-4 rounded-lg mb-6">
                  <p className="flex justify-between"><span>Smartere Meeting-Vorbereitung:</span> <strong>{personalResults.breakdown.prep} Std.</strong></p>
                  <p className="flex justify-between"><span>Automatisierte Notizen:</span> <strong>{personalResults.breakdown.inMeeting} Std.</strong></p>
                  <p className="flex justify-between"><span>Sofortige Follow-ups:</span> <strong>{personalResults.breakdown.postMeeting} Std.</strong></p>
                </div>
                <button onClick={() => setStage('company')} className="w-full bg-brand-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  ROI für die Firma berechnen <ArrowRight size={20} />
                </button>
              </div>
            )}

            {stage === 'company' && (
              <div className="text-center animate-fade-in">
                <p className="font-poppins text-foreground/80 mb-2">Geschätzter jährlicher Mehrwert für Ihre Firma</p>
                <div className="font-geist font-bold text-5xl md:text-6xl text-brand-primary mb-4">{companyResults.totalValue}</div>
                <div className="grid grid-cols-2 gap-4 text-center my-6">
                  <div>
                    <p className="font-poppins text-sm text-foreground/70">Potenzieller ROI</p>
                    <p className="font-geist font-bold text-2xl text-foreground">{companyResults.roi}%</p>
                  </div>
                  <div>
                    <p className="font-poppins text-sm text-foreground/70">Amortisationszeit</p>
                    <p className="font-geist font-bold text-2xl text-foreground">{companyResults.payback}</p>
                  </div>
                </div>
                <div className="text-left font-poppins text-sm space-y-2 mb-6">
                  <p>Diese Schätzung basiert auf eurer Branche, Teamgröße und Zielen. Sie berücksichtigt Gewinne aus Produktivität, Effizienz und Wissenssicherung. Die Zahlen scheinen nicht korrekt? Lasse uns das gemeinsam validieren.</p>
                </div>
                <Button 
                    onClick={handleInterestClick}
                    className="w-full bg-brand-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Zahlen mit uns validieren <BarChart size={20} />
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Form Modal */}
      <InterestContactForm
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        formType={formType}
      />
    </section>
  );
};