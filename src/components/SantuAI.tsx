import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import { Bot, MessageSquare, X, Play, HelpCircle, ArrowRight } from 'lucide-react';

interface SantuAIProps {
  onSectionSelect: (id: string) => void;
  soundEnabled: boolean;
}

export const SantuAI: React.FC<SantuAIProps> = ({ onSectionSelect, soundEnabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [speechText, setSpeechText] = useState<string>(
    "Greetings! I am S.A.N.T.U AI (System Assistant Neural Terminal Unit). How may I assist your engineering inquiry?"
  );
  const [typing, setTyping] = useState(false);

  const triggerDialogue = (text: string, action?: () => void) => {
    audio.playBlip();
    setTyping(true);
    setSpeechText('');
    
    // Simulate typing text
    let currentText = '';
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        setSpeechText(currentText);
        if (soundEnabled && index % 3 === 0) {
          audio.playKey();
        }
        index++;
      } else {
        clearInterval(interval);
        setTyping(false);
        if (action) action();
      }
    }, 15);
  };

  const handleChoice = (choice: string) => {
    if (typing) return;

    switch (choice) {
      case 'intro':
        triggerDialogue(
          "Shanskar Kumar Sarraf (also known as Santu) is a Computer Science Engineer specializing in backend scaling, WebSockets, and AWS data structures. He is currently looking for Software Engineering and Backend developer opportunities."
        );
        break;

      case 'skills':
        triggerDialogue(
          "Initiating skills constellation scan... Core stack resolved: Java, Spring Boot, PostgreSQL, WebSockets, Docker, Python, and AWS Cloud architectures. Let me scroll you to the telemetry galaxy.",
          () => {
            onSectionSelect('skills');
          }
        );
        break;

      case 'projects':
        triggerDialogue(
          "Accessing mission archives database... Let's review his multiplayer carrom network engine, PyTorch road segmentation models, and AWS serverless logging lakes.",
          () => {
            onSectionSelect('projects');
          }
        );
        break;

      case 'experience':
        triggerDialogue(
          "Scanning chronology timeline... Shanskar has completed full-stack backend internship work (WebSockets multiplayer scaling) and comprehensive AWS Data Engineering certifications.",
          () => {
            onSectionSelect('experience');
          }
        );
        break;

      case 'resume':
        triggerDialogue(
          "Unlocking credentials storage... Dispatching PDF resume download. Stand by.",
          () => {
            const event = new CustomEvent('ai-download-resume');
            window.dispatchEvent(event);
          }
        );
        break;

      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-mono">
      
      {/* Floating Holographic Speech Box */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 glass-panel border border-cyan-glow/30 rounded-xl p-5 shadow-[0_0_25px_rgba(0,240,255,0.15)] flex flex-col gap-4 animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-900 pb-2">
            <div className="flex items-center gap-1.5 text-[10px] text-cyan-glow font-bold uppercase tracking-wider">
              <Bot size={14} className="animate-bounce" />
              <span>S.A.N.T.U AI MODULE</span>
            </div>
            <button
              onClick={() => {
                audio.playBlip();
                setIsOpen(false);
              }}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* AI dialogue text output */}
          <div className="bg-black/40 border border-slate-900 rounded p-3 text-slate-300 text-[11px] leading-relaxed min-h-[70px] select-text">
            {speechText}
            {typing && <span className="w-1.5 h-3 bg-cyan-glow inline-block ml-0.5 animate-ping" />}
          </div>

          {/* Interactive choices menu */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[8px] text-slate-500 uppercase tracking-widest text-left">QUICK QUERY:</span>
            {[
              { id: 'intro', label: 'Who is Shanskar?' },
              { id: 'skills', label: 'Explore Core Skills' },
              { id: 'projects', label: 'Show Classified Missions' },
              { id: 'experience', label: 'Review Work Chronicles' },
              { id: 'resume', label: 'Download Credentials File' },
            ].map((choice) => (
              <button
                key={choice.id}
                disabled={typing}
                onClick={() => handleChoice(choice.id)}
                onMouseEnter={audio.playHover}
                className="w-full text-left py-1.5 px-2.5 rounded border border-slate-900 bg-slate-950/40 hover:border-cyan-glow/30 hover:bg-cyan-glow/5 text-[10px] text-slate-300 transition-all flex items-center justify-between group disabled:opacity-50"
              >
                <span>{choice.label}</span>
                <ArrowRight size={10} className="text-slate-600 group-hover:text-cyan-glow transition-colors" />
              </button>
            ))}
          </div>

        </div>
      )}

      {/* Main Holographic Orb Indicator */}
      <button
        onClick={() => {
          audio.playBlip();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={audio.playHover}
        className={`w-12 h-12 rounded-full border flex items-center justify-center relative shadow-lg transition-all duration-500 ${
          isOpen
            ? 'bg-cyan-glow border-cyan-glow text-black scale-110 shadow-[0_0_15px_#00f0ff]'
            : 'bg-black/80 border-cyan-glow/40 text-cyan-glow hover:border-cyan-glow hover:scale-105 hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] animate-bounce'
        }`}
      >
        {/* Animated outer ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-cyan-glow/40 animate-orbit-cw scale-125" />
        <div className="absolute inset-0 rounded-full border border-dashed border-purple-glow/30 animate-orbit-ccw scale-150" />
        
        {isOpen ? <X size={20} /> : <Bot size={20} />}
      </button>

    </div>
  );
};
