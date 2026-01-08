
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading, SubHeading, Button } from '../components/UI';
import { UserInput, ReflectionResult } from '../types';
import { reflectDigitalFootprint } from '../services/geminiService';
import { 
  Loader2, RefreshCw, ArrowRight, Eye, AlertCircle, Sparkles, 
  Fingerprint, Compass, Repeat, Zap, MessageCircle, ScanEye, 
  CircleDashed, Ghost, BrainCircuit, ShieldCheck, HelpCircle, 
  EyeOff, Lightbulb, UserCheck, Target, Layers, Binary, Search,
  MessageSquare, Wand2, Info, Scan
} from 'lucide-react';

interface ResponsePageProps { inputData: UserInput | null; }

const ResponsePage: React.FC<ResponsePageProps> = ({ inputData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reflection, setReflection] = useState<ReflectionResult | null>(null);

  useEffect(() => {
    const fetchReflection = async () => {
      if (!inputData) { navigate('/input'); return; }
      setLoading(true); setError(null);
      try {
        const result = await reflectDigitalFootprint(inputData);
        setReflection(result);
      } catch (err: any) {
        setError(err.message || "The mirror is temporarily clouded.");
      } finally { setLoading(false); }
    };
    fetchReflection();
  }, [inputData, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { 
      opacity: 1, y: 0, filter: 'blur(0px)', 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.02, 0.08, 0.02], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] border border-black rounded-full pointer-events-none blur-3xl"
        />
        <div className="relative z-10 space-y-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="space-y-8">
            <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-black/5 animate-[spin_10s_linear_infinite]" />
              <ScanEye className="text-black/30" size={72} strokeWidth={0.5} />
            </div>
            <div className="space-y-4">
              <Heading className="text-5xl font-extralight tracking-tight italic">Analyzing Signals.</Heading>
              <p className="text-[11px] uppercase tracking-[0.6em] text-gray-400 font-bold">Unveiling the latent perception</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error || !reflection) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-48 text-center">
        <AlertCircle className="text-gray-100 mb-8" size={64} strokeWidth={1} />
        <p className="text-3xl font-extralight text-gray-400 mb-12 max-w-md italic">{error}</p>
        <Button variant="secondary" onClick={() => navigate('/input')} className="rounded-full px-16 py-6">
          Reset Connection
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto py-12 w-full space-y-48 pb-64 px-6">
      <motion.header variants={itemVariants} className="text-center space-y-16 relative">
        <div className="flex flex-col items-center gap-6">
          <div className="h-24 w-px bg-black/10 mb-6" />
          <SubHeading>Synthesized Reflection</SubHeading>
        </div>
        <Heading className="text-7xl md:text-9xl leading-[0.85] tracking-tighter">
          Seen through <br/>
          <span className="italic font-light text-gray-400">the {inputData?.persona}.</span>
        </Heading>
        <div className="flex items-center justify-center gap-8 text-gray-300">
           <div className="h-px w-20 bg-gray-50" />
           <p className="text-[10px] uppercase tracking-[0.6em] font-black">Digital Shadow Mapping</p>
           <div className="h-px w-20 bg-gray-50" />
        </div>
      </motion.header>

      {/* Hero Insight Section */}
      <motion.section variants={itemVariants} className="relative py-24 px-12 md:px-24 bg-gray-50/20 rounded-[80px] border border-gray-100/50 group overflow-hidden">
        <div className="absolute top-10 right-10 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-1000">
          <BrainCircuit size={300} strokeWidth={0.5} />
        </div>
        <div className="relative z-10 space-y-12">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-white rounded-full border border-black shadow-xl">
                <MessageSquare size={24} strokeWidth={1.5} />
             </div>
             <SubHeading className="mb-0">Core Interpretation</SubHeading>
          </div>
          <p className="text-4xl md:text-6xl font-extralight leading-[1.1] tracking-tight text-[#0A0A0A] italic text-balance">
            "{reflection.likelyInterpretation}"
          </p>
        </div>
      </motion.section>

      {/* Broadcated Signals Grid */}
      <motion.section variants={itemVariants} className="space-y-20">
        <div className="flex items-center gap-8">
           <Binary size={28} strokeWidth={1} className="text-gray-400" />
           <SubHeading className="mb-0">Broadcasted Signals</SubHeading>
           <div className="h-px flex-grow bg-gray-100/50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {reflection.observedSignals.map((signal, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="space-y-6 group">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-black text-gray-100 group-hover:text-black transition-colors uppercase tracking-widest">Signal 0{idx + 1}</span>
                <Info size={14} className="text-gray-100 group-hover:text-black/20 transition-all" />
              </div>
              <p className="text-2xl font-light text-gray-400 leading-snug group-hover:text-black transition-all duration-500">{signal}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Intent Table Section */}
      <motion.section variants={itemVariants} className="space-y-20">
        <div className="flex items-center gap-8">
           <Scan size={28} strokeWidth={1} className="text-gray-400" />
           <SubHeading className="mb-0">Intent Convergence</SubHeading>
        </div>
        <div className="space-y-6">
          {reflection.intentVsPerception.map((item, idx) => (
            <div key={idx} className="group border border-gray-100 rounded-[60px] p-2 bg-white hover:bg-black transition-all duration-700 shadow-sm hover:shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className="bg-gray-50/50 group-hover:bg-white/10 rounded-[58px] p-12 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <Compass size={14} className="text-gray-400 group-hover:text-white/40" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-white/60">Latent Intent</span>
                  </div>
                  <p className="text-2xl font-light tracking-tight group-hover:text-white transition-colors">{item.intent}</p>
                </div>
                <div className="p-12 border-l border-gray-50 md:border-transparent group-hover:bg-white/5 rounded-[58px] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye size={14} className="text-gray-400 group-hover:text-white/40" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-white/60">Public Manifestation</span>
                  </div>
                  <p className="text-2xl font-light italic text-gray-500 group-hover:text-white/80 transition-colors tracking-tight">"{item.perception}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Gaps & Misreadings with distinctive icons */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <div className="space-y-12 group">
          <div className="flex items-center gap-6">
            <Ghost size={28} strokeWidth={1} className="text-gray-400" />
            <SubHeading className="mb-0">Potential Misreadings</SubHeading>
          </div>
          <div className="p-16 rounded-[70px] bg-white border border-gray-100 shadow-sm transition-all duration-1000 group-hover:shadow-3xl group-hover:border-transparent relative overflow-hidden group-hover:-translate-y-2">
            <div className="absolute -right-12 -bottom-12 text-black/[0.02] rotate-12 scale-150 transition-transform duration-1000 group-hover:rotate-0">
               <AlertCircle size={200} />
            </div>
            <p className="text-3xl font-extralight text-gray-400 leading-tight italic relative z-10 group-hover:text-black transition-colors">
              "{reflection.possibleMisreadings}"
            </p>
          </div>
        </div>
        <div className="space-y-12 group">
          <div className="flex items-center gap-6">
            <CircleDashed size={28} strokeWidth={1} className="text-gray-400" />
            <SubHeading className="mb-0">Perceptual Gaps</SubHeading>
          </div>
          <div className="p-16 rounded-[70px] bg-white border border-gray-100 shadow-sm transition-all duration-1000 group-hover:shadow-3xl group-hover:border-transparent relative overflow-hidden group-hover:-translate-y-2">
            <div className="absolute -right-12 -bottom-12 text-black/[0.02] rotate-12 scale-150 transition-transform duration-1000 group-hover:rotate-0">
               <Layers size={200} />
            </div>
            <p className="text-3xl font-extralight text-gray-400 leading-tight relative z-10 group-hover:text-black transition-colors">
              {reflection.whatsMissing}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Strategic Suggestions with high-impact icons */}
      <motion.section variants={itemVariants} className="space-y-20">
        <div className="flex items-center gap-8">
           <Wand2 size={28} strokeWidth={1} className="text-gray-400" />
           <SubHeading className="mb-0">Strategic Adjustments</SubHeading>
           <div className="h-px flex-grow bg-gray-100/50" />
        </div>
        <div className="grid grid-cols-1 gap-8">
          {reflection.smartSuggestions.map((suggestion, idx) => (
            <div key={idx} className="p-10 md:p-14 rounded-full border border-gray-50 bg-gray-50/10 flex items-center justify-between group cursor-default hover:bg-black hover:text-white transition-all duration-700 hover:px-20 hover:scale-[1.03] shadow-sm">
              <div className="flex items-center gap-10">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-white/10 group-hover:text-white transition-all shadow-sm">
                  <Zap size={22} strokeWidth={1} />
                </div>
                <p className="text-2xl md:text-3xl font-extralight tracking-tight leading-none">{suggestion}</p>
              </div>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-10 group-hover:translate-x-0" size={32} strokeWidth={0.5} />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Conclusion Section */}
      <motion.section variants={itemVariants} className="pt-64 text-center space-y-32">
        <div className="max-w-4xl mx-auto space-y-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 blur-[120px] opacity-[0.06] bg-black w-[500px] h-[500px] rounded-full" />
          <div className="flex flex-col items-center gap-8">
             <MessageCircle size={80} strokeWidth={0.3} className="text-gray-200" />
             <p className="text-5xl md:text-8xl font-extralight italic tracking-tighter text-gray-400 leading-[1] text-balance">
               "{reflection.reflectionQuestion}"
             </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <Button variant="primary" onClick={() => navigate('/input')} className="rounded-full px-20 py-8 text-[12px] shadow-3xl hover:scale-110">
            <RefreshCw size={20} strokeWidth={2.5} /> Recalibrate Lens
          </Button>
          <button 
            onClick={() => navigate('/')} 
            className="text-[12px] font-black uppercase tracking-[0.6em] text-gray-200 hover:text-black transition-all hover:tracking-[0.8em]"
          >
            Reset Reflection
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ResponsePage;
