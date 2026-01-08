
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Heading, SubHeading } from '../components/UI';
import { 
  ArrowRight, 
  Scan, 
  Fingerprint, 
  Eye, 
  Aperture, 
  Layers, 
  Ghost, 
  Compass, 
  Shield, 
  Activity,
  UserCheck
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center w-full max-w-7xl mx-auto px-4"
    >
      {/* Hero Section: The Mirror Aperture */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center relative w-full overflow-hidden">
        {/* Decorative Blueprint Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gray-50 -z-10" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-50 -z-10" />
        
        <motion.div 
          animate={{ 
            rotate: 360,
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-gray-100 rounded-full -z-10 opacity-50"
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12 flex flex-col items-center gap-6"
        >
          <Aperture size={20} strokeWidth={1} className="text-gray-300" />
          <div className="h-12 w-px bg-gray-100" />
        </motion.div>

        <Heading className="text-7xl md:text-[140px] leading-[0.75] tracking-tighter mb-12">
          Your digital <br/>
          <span className="italic font-extralight text-gray-200">shadow, </span>
          <span className="font-bold">illuminated.</span>
        </Heading>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xl md:text-3xl text-gray-400 font-extralight mb-16 leading-tight max-w-4xl text-balance"
        >
          A high-fidelity reflection interface that maps the gap between <br className="hidden md:block"/> 
          personal intent and public perception.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center gap-16"
        >
          <Button onClick={() => navigate('/input')} className="px-24 py-9 shadow-3xl hover:scale-105 rounded-full text-[11px]">
            Begin Reflection <ArrowRight size={18} strokeWidth={2.5} />
          </Button>
          
          <div className="grid grid-cols-3 gap-16 md:gap-32">
            {[
              { icon: <Shield size={16} />, label: "Privacy First" },
              { icon: <Activity size={16} />, label: "Signal Analysis" },
              { icon: <UserCheck size={16} />, label: "Observer Calibration" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4 opacity-30 group cursor-default">
                <div className="p-4 border border-black rounded-full group-hover:bg-black group-hover:text-white transition-all duration-500">{item.icon}</div>
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Perceptual Matrix Section */}
      <section className="py-64 w-full grid grid-cols-1 md:grid-cols-2 gap-32 items-center border-t border-gray-50">
        <div className="space-y-12">
          <div className="flex items-center gap-4">
            <Layers size={20} strokeWidth={1} />
            <SubHeading className="mb-0">The Perceptual Matrix</SubHeading>
          </div>
          <h2 className="text-6xl md:text-8xl font-extralight tracking-tighter leading-[1] text-balance">
            We are more than <br/> 
            <span className="italic text-gray-300">the sum of our </span>
            <br/> <span className="font-medium">broadcasts.</span>
          </h2>
          <p className="text-2xl font-extralight text-gray-400 leading-relaxed max-w-md">
            The Digital Footprint Mirror doesn't just read words—it synthesizes visual consistency, linguistic tone, and unspoken signals.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {[
            { icon: <Ghost size={24} />, title: "The Ghost", desc: "Identification of the unsaid." },
            { icon: <Compass size={24} />, title: "The Vector", desc: "The trajectory of your intent." },
            { icon: <Scan size={24} />, title: "The Surface", desc: "Immediate visual impressions." },
            { icon: <Fingerprint size={24} />, title: "The ID", desc: "Your unique digital signature." }
          ].map((feat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ backgroundColor: '#F9F9F9', scale: 1.02 }}
              className="p-12 border border-gray-100 rounded-[56px] space-y-8 transition-all duration-700"
            >
              <div className="text-gray-300 transition-colors group-hover:text-black">{feat.icon}</div>
              <div className="space-y-3">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">{feat.title}</h4>
                <p className="text-base font-light text-gray-400 leading-snug">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Methodology Section (Process) */}
      <section className="w-full pb-64 border-t border-gray-50 pt-32">
        <div className="mb-32 flex flex-col items-center text-center space-y-8">
          <SubHeading>Methodology</SubHeading>
          <Heading className="text-6xl md:text-8xl italic font-extralight tracking-tighter">Structured Reflection.</Heading>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-[80px] overflow-hidden shadow-2xl">
          {[
            { 
              num: "PHASE 01", 
              title: "Signal Capture", 
              icon: <Fingerprint size={28} strokeWidth={1} />,
              desc: "Consolidate the fragments of your identity—bios, snippets, and artifacts." 
            },
            { 
              num: "PHASE 02", 
              title: "Lens Calibration", 
              icon: <Aperture size={28} strokeWidth={1} />,
              desc: "Select the observer. Recruiter, Brand, or Creator. Every lens sees a new truth." 
            },
            { 
              num: "PHASE 03", 
              title: "Synthesis", 
              icon: <Scan size={28} strokeWidth={1} />,
              desc: "A calm, intelligent report on your digital aura and how to align it with intent." 
            }
          ].map((item, i) => (
            <div 
              key={i}
              className="group p-24 bg-white space-y-16 transition-all duration-1000 hover:bg-gray-50 cursor-default"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black tracking-[0.5em] text-gray-200 group-hover:text-black transition-colors">{item.num}</span>
                <div className="text-gray-100 group-hover:text-black transition-all duration-700">{item.icon}</div>
              </div>
              <div className="space-y-8">
                <h3 className="text-4xl font-light tracking-tight">{item.title}</h3>
                <p className="text-xl font-extralight text-gray-400 leading-relaxed group-hover:text-gray-600 transition-colors">
                  {item.desc}
                </p>
              </div>
              <div className="pt-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                <ArrowRight size={32} strokeWidth={0.5} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Callout: Optimized sizing */}
      <section className="py-32 w-full max-w-5xl mx-auto text-center space-y-16 bg-[#0A0A0A] text-white rounded-[64px] mb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <motion.div 
            animate={{ x: [-150, 150] }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border-l border-white/10 skew-x-12"
          />
        </div>
        <SubHeading className="text-gray-500">The Philosophy</SubHeading>
        <Heading className="text-4xl md:text-7xl leading-[0.9] tracking-tighter max-w-4xl mx-auto px-8">
          Identity is the story you tell. <br className="hidden md:block"/>
          <span className="text-gray-500 italic font-extralight">Perception is the story they hear.</span>
        </Heading>
        <div className="flex justify-center pt-4">
           <Button variant="secondary" onClick={() => navigate('/input')} className="border-white/20 text-white hover:bg-white hover:text-black px-24 py-8 rounded-full text-xs">
             Bridge the Gap
           </Button>
        </div>
      </section>

      {/* Final Meta Section */}
      <section className="py-24 w-full flex flex-col md:flex-row justify-between items-center gap-12 opacity-30">
        <div className="flex items-center gap-6">
          <div className="w-16 h-[1px] bg-black" />
          <span className="text-[10px] font-black uppercase tracking-[0.8em]">Laboratory Preview</span>
        </div>
        <div className="flex items-center gap-16">
          <span className="text-[10px] font-black uppercase tracking-[0.6em] cursor-pointer hover:text-black transition-colors">Architecture</span>
          <span className="text-[10px] font-black uppercase tracking-[0.6em] cursor-pointer hover:text-black transition-colors">Integrity</span>
          <span className="text-[10px] font-black uppercase tracking-[0.6em] cursor-pointer hover:text-black transition-colors">Ethics</span>
        </div>
      </section>
    </motion.div>
  );
};

export default LandingPage;
