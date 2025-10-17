import { useState, useMemo, useEffect } from 'react';
import { Brain, Zap, Shield, Briefcase, Users, DollarSign, ArrowRight, BarChart, Download } from 'lucide-react';
import { InterestContactForm } from "./InterestContactForm";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

// --- Configuration constants ---
const ROLE_SALARY_DATA = {
  consultant: 95000,
  saas_pm: 85000,
  saas_sales: 80000,
  lawyer: 120000,
  manufacturing: 75000,
  other: 65000,
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

// --- MAIN COMPONENT: ROI CALCULATOR ---
export const ROICalculatorSection = () => {
  const { t, i18n } = useTranslation('pages');
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
    const salary = ROLE_SALARY_DATA[personalInputs.role as keyof typeof ROLE_SALARY_DATA];
    const hourlyRate = salary / ANNUAL_WORK_HOURS;
    const prepSavings = 2 * WORK_WEEKS;
    const inMeetingSavings = (personalInputs.meetings * 0.25) * WORK_WEEKS;
    const postMeetingSavings = (personalInputs.followUp * 0.9) * WORK_WEEKS;
    const totalHours = prepSavings + inMeetingSavings + postMeetingSavings;
    const totalValue = totalHours * hourlyRate;
    
    const currency = i18n.language === 'de' ? 'EUR' : 'USD';
    const locale = i18n.language === 'de' ? 'de-DE' : 'en-US';
    
    return {
      totalHours: totalHours.toFixed(0),
      totalValue: totalValue.toLocaleString(locale, { style: 'currency', currency, minimumFractionDigits: 0 }),
      breakdown: { prep: prepSavings.toFixed(0), inMeeting: inMeetingSavings.toFixed(0), postMeeting: postMeetingSavings.toFixed(0) }
    };
  }, [personalInputs, i18n.language]);

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
    
    const currency = i18n.language === 'de' ? 'EUR' : 'USD';
    const locale = i18n.language === 'de' ? 'de-DE' : 'en-US';
    const monthText = i18n.language === 'de' ? 'Monat' : 'Month';
    const monthsText = i18n.language === 'de' ? 'Monate' : 'Months';
    
    return {
      totalValue: totalValue.toLocaleString(locale, { style: 'currency', currency, minimumFractionDigits: 0 }),
      investment: investment.toLocaleString(locale, { style: 'currency', currency, minimumFractionDigits: 0 }),
      roi: roi.toLocaleString(locale, { maximumFractionDigits: 0 }),
      payback: paybackMonths < 1 ? `< 1 ${monthText}` : `${paybackMonths.toFixed(1)} ${monthsText}`,
    };
  }, [companyInputs, i18n.language]);

  const handleInterestClick = () => {
    setFormType('interest');
    setFormModalOpen(true);
  };

  return (
    <section id="roi" ref={sectionRef} className="py-20 sm:py-24 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Animated Title */}
        <motion.div 
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={titleControls}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-geist font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 sm:mb-8">
            {t('roi.title')}
          </h2>
          <p className="font-poppins font-medium text-lg sm:text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            {t('roi.subtitle')}
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
                {t('roi.personalTab')}
              </button>
              <button onClick={() => setStage('company')} className={`flex-1 font-geist font-semibold p-3 transition-colors ${stage === 'company' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-foreground/60 hover:text-foreground'}`}>
                {t('roi.companyTab')}
              </button>
            </div>

            {stage === 'personal' && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h3 className="font-geist font-bold text-xl text-foreground">{t('roi.personalTitle')}</h3>
                <div>
                  <label className="font-poppins text-sm text-foreground/80 mb-2 block">{t('roi.inputs.role')}</label>
                  <select name="role" value={personalInputs.role} onChange={handlePersonalChange} className="w-full bg-secondary border border-foreground/10 rounded-lg p-2.5">
                    {Object.entries(ROLE_SALARY_DATA).map(([key]) => (<option key={key} value={key}>{t(`roi.roles.${key}`)}</option>))}
                  </select>
                </div>
                <SliderInput label={t('roi.inputs.meetings')} name="meetings" value={personalInputs.meetings} min={1} max={40} onChange={handlePersonalChange} unit="h" />
                <SliderInput label={t('roi.inputs.followUp')} name="followUp" value={personalInputs.followUp} min={0} max={10} onChange={handlePersonalChange} unit="h" />
              </div>
            )}

            {stage === 'company' && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h3 className="font-geist font-bold text-xl text-foreground">{t('roi.companyTitle')}</h3>
                <div>
                  <label className="font-poppins text-sm text-foreground/80 mb-2 block">{t('roi.inputs.industry')}</label>
                  <select name="industry" value={companyInputs.industry} onChange={handleCompanyChange} className="w-full bg-secondary border border-foreground/10 rounded-lg p-2.5">
                    {Object.keys({consulting: '', saas: '', pe: '', law: '', manufacturing: ''}).map((key) => (<option key={key} value={key}>{t(`roi.industries.${key}`)}</option>))}
                  </select>
                </div>
                <NumberInput label={t('roi.inputs.employees')} name="employees" value={companyInputs.employees} onChange={handleCompanyChange} placeholder="50" icon={Users} />
                <NumberInput label={t('roi.inputs.avgSalary')} name="avgSalary" value={companyInputs.avgSalary} onChange={handleCompanyChange} placeholder="70000" icon={DollarSign} />
                <div className="border-t border-foreground/10 pt-4 flex flex-col gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="salesVelocity" checked={companyInputs.salesVelocity} onChange={handleCompanyChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-primary"></div>
                    <span className="ml-3 font-poppins text-sm text-foreground/80">{t('roi.inputs.salesVelocity')}</span>
                  </label>
                  {companyInputs.salesVelocity && (
                    <div className="pl-6 animate-fade-in-down">
                      <NumberInput label={t('roi.inputs.numSalesReps')} name="numSalesReps" value={companyInputs.numSalesReps} onChange={handleCompanyChange} placeholder="10" icon={Briefcase} />
                    </div>
                  )}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="knowledgeRetention" checked={companyInputs.knowledgeRetention} onChange={handleCompanyChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-primary"></div>
                    <span className="ml-3 font-poppins text-sm text-foreground/80">{t('roi.inputs.knowledgeRetention')}</span>
                  </label>
                  {companyInputs.knowledgeRetention && (
                    <div className="pl-6 animate-fade-in-down">
                      <SliderInput label={t('roi.inputs.turnoverRate')} name="turnoverRate" value={companyInputs.turnoverRate} min={1} max={40} onChange={handleCompanyChange} unit="%" />
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
                <p className="font-poppins text-foreground/80 mb-2">{t('roi.results.personalPrefix')}</p>
                <div className="font-geist font-bold text-5xl md:text-6xl text-brand-primary mb-4"><span>{personalResults.totalHours}</span> <span className="text-3xl md:text-4xl text-brand-primary">{t('roi.results.personalSuffix')}</span></div>
                <div className="font-poppins font-semibold text-xl text-foreground mb-6">{t('roi.results.personalValue')} {personalResults.totalValue}</div>
                <div className="text-left font-poppins text-sm space-y-3 bg-secondary/50 p-4 rounded-lg mb-6">
                  <p className="flex justify-between"><span>{t('roi.breakdown.prep')}</span> <strong>{personalResults.breakdown.prep} {i18n.language === 'de' ? 'Std.' : 'hrs'}</strong></p>
                  <p className="flex justify-between"><span>{t('roi.breakdown.notes')}</span> <strong>{personalResults.breakdown.inMeeting} {i18n.language === 'de' ? 'Std.' : 'hrs'}</strong></p>
                  <p className="flex justify-between"><span>{t('roi.breakdown.followup')}</span> <strong>{personalResults.breakdown.postMeeting} {i18n.language === 'de' ? 'Std.' : 'hrs'}</strong></p>
                </div>
                <button onClick={() => setStage('company')} className="w-full bg-brand-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  {t('roi.calculate')} <ArrowRight size={20} />
                </button>
              </div>
            )}

            {stage === 'company' && (
              <div className="text-center animate-fade-in">
                <p className="font-poppins text-foreground/80 mb-2">{t('roi.results.companyPrefix')}</p>
                <div className="font-geist font-bold text-5xl md:text-6xl text-brand-primary mb-4">{companyResults.totalValue}</div>
                <div className="grid grid-cols-2 gap-4 text-center my-6">
                  <div>
                    <p className="font-poppins text-sm text-foreground/70">{t('roi.results.potentialROI')}</p>
                    <p className="font-geist font-bold text-2xl text-foreground">{companyResults.roi}%</p>
                  </div>
                  <div>
                    <p className="font-poppins text-sm text-foreground/70">{t('roi.results.paybackTime')}</p>
                    <p className="font-geist font-bold text-2xl text-foreground">{companyResults.payback}</p>
                  </div>
                </div>
                <div className="text-left font-poppins text-sm space-y-2 mb-6">
                  <p>{t('roi.results.disclaimer')}</p>
                </div>
                <Button 
                    onClick={handleInterestClick}
                    className="w-full bg-brand-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  {t('roi.results.validateButton')} <BarChart size={20} />
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