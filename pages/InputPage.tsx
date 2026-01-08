
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading, SubHeading, Input as UIInput, TextArea, Button } from '../components/UI.tsx';
import { PersonaType, UserInput } from '../types.ts';
import { 
  Briefcase, 
  Sparkles, 
  Image as ImageIcon, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Target, 
  AtSign, 
  TextQuote, 
  Plus
} from 'lucide-react';

interface InputPageProps {
  onSubmit: (data: UserInput) => void;
}

const InputPage: React.FC<InputPageProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<UserInput>({
    username: '',
    bio: '',
    posts: [''],
    images: [],
    desiredPerception: '',
    persona: PersonaType.BRAND
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePostChange = (index: number, value: string) => {
    const newPosts = [...formData.posts];
    newPosts[index] = value;
    setFormData(prev => ({ ...prev, posts: newPosts }));
  };

  const addPost = () => {
    setFormData(prev => ({ ...prev, posts: [...prev.posts, ''] }));
  };

  const removePost = (index: number) => {
    const newPosts = formData.posts.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, posts: newPosts.length ? newPosts : [''] }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Fix: Explicitly type the files array as File[] to prevent 'unknown' type errors when passing to readAsDataURL.
    (Array.from(files) as File[]).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (base64String) {
          const [header, data] = base64String.split(';base64,');
          const mimeType = header.split(':')[1];
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, { data, mimeType }]
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/reflection');
  };

  const nextStep = () => {
    setDirection(1);
    setStep(s => Math.min(s + 1, 3));
  };
  
  const prevStep = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 1));
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(10px)'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(10px)'
    })
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-20">
      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <SubHeading>Step {step} of 3</SubHeading>
          <Heading className="text-5xl md:text-6xl mb-0">
            {step === 1 && "Identity Fragments."}
            {step === 2 && "The Observer."}
            {step === 3 && "Desired Intent."}
          </Heading>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-1 w-12 rounded-full transition-all duration-700 ${s === step ? 'bg-black w-24' : 'bg-gray-100'}`} 
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-16"
            >
              <div className="space-y-8">
                <UIInput 
                  icon={<AtSign size={18} />}
                  placeholder="Digital Handle (e.g. @username)"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <TextArea 
                  icon={<TextQuote size={18} />}
                  placeholder="Paste your current bio or self-description..."
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Recent Signals (Text Posts)</span>
                  <button type="button" onClick={addPost} className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-black transition-colors">
                    <Plus size={14} /> Add Snippet
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.posts.map((post, idx) => (
                    <div key={idx} className="relative group">
                      <UIInput 
                        placeholder={`Post snippet ${idx + 1}...`}
                        value={post}
                        onChange={(e) => handlePostChange(idx, e.target.value)}
                      />
                      {formData.posts.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removePost(idx)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-300 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Visual Artifacts (Images)</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="aspect-square relative rounded-3xl overflow-hidden border border-gray-100 group">
                      <img src={`data:${img.mimeType};base64,${img.data}`} alt="Upload" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 text-gray-300 hover:border-black hover:text-black transition-all group"
                  >
                    <ImageIcon size={24} strokeWidth={1} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Upload</span>
                  </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  multiple 
                  accept="image/*" 
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              <p className="text-2xl font-extralight text-gray-400 leading-relaxed mb-12 italic text-balance">
                Who is looking into the mirror? The reflection changes depending on the eyes of the observer.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { type: PersonaType.RECRUITER, icon: <Briefcase size={24} />, desc: "Focuses on professional reliability, skill signals, and culture fit." },
                  { type: PersonaType.BRAND, icon: <Target size={24} />, desc: "Analyzes consistency, aesthetic value, and partnership potential." },
                  { type: PersonaType.CREATOR, icon: <Sparkles size={24} />, desc: "Looks for voice originality, community resonance, and vision." }
                ].map((p) => (
                  <button
                    key={p.type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, persona: p.type }))}
                    className={`p-10 rounded-[48px] border text-left space-y-8 transition-all duration-700 ${formData.persona === p.type ? 'border-black bg-black text-white shadow-2xl scale-[1.02]' : 'border-gray-100 hover:border-black text-gray-400'}`}
                  >
                    <div className={`${formData.persona === p.type ? 'text-white' : 'text-gray-300'}`}>{p.icon}</div>
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">{p.type}</h4>
                      <p className="text-sm font-light leading-snug">{p.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
               <p className="text-2xl font-extralight text-gray-400 leading-relaxed mb-12 italic text-balance">
                What do you want the world to feel when they see you? Defining your intent helps us measure the gap.
              </p>
              <UIInput 
                icon={<Target size={18} />}
                placeholder="e.g. 'Highly technical but approachable', 'Avant-garde artist'"
                name="desiredPerception"
                value={formData.desiredPerception}
                onChange={handleInputChange}
              />
              <div className="pt-12 flex flex-col items-center">
                <Button type="submit" className="w-full md:w-auto px-24 py-8 shadow-3xl">
                  Synthesize My Reality <ArrowRight size={18} />
                </Button>
                <p className="mt-8 text-[9px] font-black uppercase tracking-[0.5em] text-gray-300">Architecture secured by Gemini 3 Pro</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-20 border-t border-gray-50 flex justify-between items-center">
          {step > 1 ? (
            <button 
              type="button" 
              onClick={prevStep} 
              className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 text-gray-400 hover:text-black transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : <div />}
          
          {step < 3 && (
            <Button type="button" onClick={nextStep} className="px-16 py-6">
              Continue <ArrowRight size={16} />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InputPage;
