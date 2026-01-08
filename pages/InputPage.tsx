
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading, SubHeading, Input, TextArea, Button } from '../components/UI';
import { PersonaType, UserInput } from '../types';
import { 
  Briefcase, 
  User, 
  Sparkles, 
  Image as ImageIcon, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Target, 
  Fingerprint, 
  AtSign, 
  TextQuote, 
  Plus, 
  FileText
} from 'lucide-react';

interface InputPageProps {
  onSubmit: (data: UserInput) => void;
}

const InputPage: React.FC<InputPageProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<UserInput>({
    bio: '',
    username: '',
    posts: ['', ''],
    images: [],
    desiredPerception: '',
    persona: PersonaType.RECRUITER
  });

  const handlePostChange = (index: number, value: string) => {
    const newPosts = [...formData.posts];
    newPosts[index] = value;
    setFormData({ ...formData, posts: newPosts });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files) as File[];
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          const base64String = result.split(',')[1];
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, { data: base64String, mimeType: file.type }]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const isStepValid = () => {
    if (activeStep === 0) return formData.bio.trim().length > 5;
    if (activeStep === 1) return true;
    return formData.persona !== undefined;
  };

  const handleNext = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (activeStep < 2 && isStepValid()) {
      setActiveStep(activeStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      if (activeStep < 2) {
        handleNext(e);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep === 2 && isStepValid()) {
      onSubmit(formData);
      navigate('/reflection');
    }
  };

  const personas = [
    { 
      type: PersonaType.RECRUITER, 
      icon: <Briefcase size={22} strokeWidth={1} />, 
      desc: "Analyzes stability, professional trajectory, and soft-skill signals.",
      color: "bg-blue-50/10"
    },
    { 
      type: PersonaType.BRAND, 
      icon: <Target size={22} strokeWidth={1} />, 
      desc: "Evaluates aesthetic coherence, value-alignment, and niche positioning.",
      color: "bg-purple-50/10"
    },
    { 
      type: PersonaType.CREATOR, 
      icon: <Sparkles size={22} strokeWidth={1} />, 
      desc: "Focuses on technical craft, peer-authenticity, and creative edge.",
      color: "bg-orange-50/10"
    }
  ];

  const steps = [
    { 
      id: 'identity', 
      title: 'Foundation', 
      content: (
        <div className="space-y-20 pt-8">
          <div className="space-y-4">
            <SubHeading>Direct Identity</SubHeading>
            <Input 
              icon={<AtSign size={18} strokeWidth={1} />}
              placeholder="Username / Public Identifier" 
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="space-y-4">
            <SubHeading>Primary Narrative</SubHeading>
            <TextArea 
              icon={<User size={18} strokeWidth={1} />}
              placeholder="Paste your primary public biography or 'About' section..." 
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              required
            />
            <p className="text-[10px] text-gray-300 uppercase tracking-widest pl-10">This is the lens through which your story begins.</p>
          </div>
        </div>
      )
    },
    { 
      id: 'signals', 
      title: 'Signals', 
      content: (
        <div className="space-y-20 pt-8">
          <div className="space-y-8">
            <SubHeading>Linguistic Fragments</SubHeading>
            <div className="space-y-12">
              {formData.posts.map((post, idx) => (
                <TextArea 
                  key={idx}
                  icon={<TextQuote size={18} strokeWidth={1} />}
                  placeholder={`Recent transmission or snippet ${idx + 1}...`} 
                  value={post}
                  onChange={(e) => handlePostChange(idx, e.target.value)}
                  className="min-h-[100px]"
                />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <SubHeading>Visual Artifacts</SubHeading>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <AnimatePresence>
                {formData.images.map((img, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative aspect-[4/5] bg-gray-50 rounded-[48px] overflow-hidden border border-gray-100 group shadow-sm"
                  >
                    <img src={`data:${img.mimeType};base64,${img.data}`} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                    <button 
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-6 right-6 bg-black text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-xl"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[4/5] rounded-[48px] border border-dashed border-gray-100 hover:border-black hover:bg-black/5 flex flex-col items-center justify-center gap-6 transition-all group overflow-hidden relative"
              >
                <div className="p-5 bg-white rounded-full border border-gray-50 shadow-sm group-hover:shadow-lg transition-all group-hover:-translate-y-1">
                  <Plus size={24} className="text-gray-300 group-hover:text-black transition-colors" strokeWidth={1} />
                </div>
                <div className="text-center px-6">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 group-hover:text-black block mb-2 transition-colors">Append Visuals</span>
                  <span className="text-[8px] text-gray-200 uppercase tracking-widest block transition-colors group-hover:text-gray-400">Profile photos or feed shots</span>
                </div>
              </button>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" multiple />
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'persona', 
      title: 'Calibration', 
      content: (
        <div className="space-y-20 pt-8">
           <div className="space-y-4">
            <SubHeading>Intentionality</SubHeading>
            <Input 
              icon={<Fingerprint size={18} strokeWidth={1} />}
              placeholder="What is your intended impression? (e.g. 'Highly technical')" 
              value={formData.desiredPerception}
              onChange={(e) => setFormData({...formData, desiredPerception: e.target.value})}
              onKeyDown={handleKeyDown}
            />
           </div>
          
          <div className="space-y-8 pt-4">
            <SubHeading>Observer Calibration</SubHeading>
            <div className="grid grid-cols-1 gap-6">
              {personas.map((p) => (
                <button
                  key={p.type}
                  type="button"
                  onClick={() => setFormData({ ...formData, persona: p.type })}
                  className={`relative p-12 text-left transition-all duration-700 flex items-center gap-10 rounded-[64px] group overflow-hidden ${
                    formData.persona === p.type 
                    ? 'bg-[#0A0A0A] text-white shadow-2xl scale-[1.02]' 
                    : 'bg-white border border-gray-100 hover:border-black/20 hover:bg-gray-50/50'
                  }`}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700 ${formData.persona === p.type ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-300 group-hover:bg-gray-100 group-hover:text-black'}`}>
                    {p.icon}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className={`text-[12px] font-black uppercase tracking-[0.4em] ${formData.persona === p.type ? 'text-white' : 'text-gray-400'}`}>{p.type}</div>
                    <div className={`text-sm font-light leading-relaxed max-w-sm ${formData.persona === p.type ? 'text-gray-400' : 'text-gray-500'}`}>{p.desc}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${formData.persona === p.type ? 'border-white/20' : 'border-gray-100'}`}>
                    <motion.div 
                      animate={{ scale: formData.persona === p.type ? 1 : 0 }}
                      className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto py-12 w-full px-6">
      {/* Visual Step Indicator */}
      <div className="mb-40 flex justify-between items-center px-4 relative max-w-2xl mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -z-10" />
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-5 bg-white px-8">
            <div className={`w-14 h-14 rounded-full border flex items-center justify-center text-[13px] font-black transition-all duration-1000 ${activeStep === i ? 'border-black bg-black text-white scale-110 shadow-2xl' : activeStep > i ? 'border-black bg-white text-black' : 'border-gray-100 text-gray-200'}`}>
              0{i + 1}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-1000 ${activeStep === i ? 'text-black' : 'text-gray-200'}`}>{s.title}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-[500px]"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-black/10" />
              <SubHeading className="mb-0 text-black">Section 0{activeStep + 1}</SubHeading>
            </div>
            {steps[activeStep].content}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center pt-24 border-t border-gray-50">
          <button 
            type="button" 
            onClick={handleBack} 
            className={`flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] transition-all group ${activeStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-300 hover:text-black'}`}
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> Retract
          </button>
          
          {activeStep < 2 ? (
            <Button 
              type="button" 
              onClick={handleNext} 
              disabled={!isStepValid()} 
              className="px-20 py-7 shadow-xl"
            >
              Next Phase: {steps[activeStep + 1].title} <ArrowRight size={20} />
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={!isStepValid()}
              className="px-28 py-8 rounded-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95"
            >
              Analyze Footprint <ArrowRight size={20} />
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default InputPage;
