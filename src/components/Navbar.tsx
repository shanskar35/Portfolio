import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import { Volume2, VolumeX, Shield, ShieldAlert, Cpu, Eye, EyeOff, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  matrixMode: boolean;
  setMatrixMode: (enabled: boolean) => void;
  performanceMode: boolean;
  setPerformanceMode: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  soundEnabled,
  setSoundEnabled,
  matrixMode,
  setMatrixMode,
  performanceMode,
  setPerformanceMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { id: 'home', label: 'HOME' },
    { id: 'profile', label: 'PROFILE' },
    { id: 'experience', label: 'TIMELINE' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'MISSIONS' },
    { id: 'achievements', label: 'METRICS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    audio.playBlip();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    audio.setMuted(!newSoundState);
    if (newSoundState) {
      audio.playSuccess();
    }
  };

  const playHoverSound = () => {
    audio.playHover();
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-mono ${
        scrolled ? 'py-3 bg-[#030508]/85 backdrop-blur-md border-b border-cyan-glow/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand / Logo Logo */}
        <div
          onClick={() => handleNavClick('home')}
          onMouseEnter={playHoverSound}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="relative w-8 h-8 rounded border border-cyan-glow/30 flex items-center justify-center bg-cyan-glow/5 overflow-hidden transition-all duration-300 group-hover:border-cyan-glow">
            <span className="text-sm font-black text-cyan-glow tracking-tighter font-orbitron group-hover:scale-110 transition-transform">
              SS
            </span>
          </div>
          <div className="text-left leading-none hidden sm:block">
            <span className="text-[10px] text-slate-400 block tracking-widest">NEURAL_CORE</span>
            <span className="text-xs font-bold text-white tracking-wider group-hover:text-cyan-glow transition-colors font-orbitron">
              SANTU.AI
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 bg-black/40 border border-slate-800 rounded-full px-2 py-1 relative">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={playHoverSound}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  isActive ? 'text-black font-bold z-10' : 'text-slate-400 hover:text-cyan-glow'
                }`}
              >
                {/* Slidable background pillow indicator */}
                {isActive && (
                  <span className="absolute inset-0 bg-cyan-glow shadow-[0_0_12px_#00f0ff] rounded-full -z-10" />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* HUD System Controls */}
        <div className="flex items-center gap-2">
          
          {/* Audio System Control Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={playHoverSound}
            title={soundEnabled ? 'Mute System Synthesizer' : 'Unmute System Synthesizer'}
            className={`p-2 rounded border transition-all duration-300 ${
              soundEnabled
                ? 'bg-cyan-glow/10 border-cyan-glow text-cyan-glow shadow-[0_0_8px_rgba(0,240,255,0.2)]'
                : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500'
            }`}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          {/* Matrix Mode Overlay Toggle */}
          <button
            onClick={() => {
              audio.playBlip();
              setMatrixMode(!matrixMode);
            }}
            onMouseEnter={playHoverSound}
            title={matrixMode ? 'Disable Matrix Rain Overlay' : 'Enable Matrix Rain Overlay'}
            className={`p-2 rounded border transition-all duration-300 ${
              matrixMode
                ? 'bg-green-500/10 border-green-500 text-green-500 shadow-[0_0_8px_rgba(34,197,94,0.2)]'
                : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500'
            }`}
          >
            {matrixMode ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>

          {/* Performance Mode Toggle */}
          <button
            onClick={() => {
              audio.playBlip();
              setPerformanceMode(!performanceMode);
            }}
            onMouseEnter={playHoverSound}
            title={performanceMode ? 'Particles Disabled (Performance Mode ON)' : 'Particles Enabled (Performance Mode OFF)'}
            className={`p-2 rounded border transition-all duration-300 ${
              performanceMode
                ? 'bg-purple-glow/10 border-purple-glow text-purple-glow shadow-[0_0_8px_rgba(188,19,254,0.2)]'
                : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500'
            }`}
          >
            {performanceMode ? <Cpu size={14} /> : <Cpu size={14} className="opacity-50" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => {
              audio.playBlip();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            onMouseEnter={playHoverSound}
            className="p-2 lg:hidden rounded border border-slate-700 text-slate-400 hover:border-cyan-glow hover:text-cyan-glow"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#030508]/95 border-b border-cyan-glow/20 px-6 py-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-cyan-glow/40 tracking-[0.2em] mb-1">SYSTEM_DIRECTORY</span>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={playHoverSound}
                className={`text-left py-2 px-3 rounded transition-colors text-xs font-semibold tracking-wider ${
                  activeSection === item.id
                    ? 'bg-cyan-glow/10 border-l-2 border-cyan-glow text-cyan-glow font-bold'
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-cyan-glow'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4 flex flex-col gap-2">
            <span className="text-[10px] text-purple-glow/40 tracking-[0.2em]">DIAGNOSTICS</span>
            <div className="flex justify-between text-xs text-slate-400 py-1">
              <span>AUDIO NODE COMPRESSED:</span>
              <span className={soundEnabled ? 'text-cyan-glow font-bold' : 'text-slate-500'}>
                {soundEnabled ? 'ACTIVE' : 'MUTE'}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 py-1">
              <span>MATRIX FIELD OVERLAY:</span>
              <span className={matrixMode ? 'text-green-500 font-bold' : 'text-slate-500'}>
                {matrixMode ? 'ENGAGED' : 'DISENGAGED'}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 py-1">
              <span>PARTICLE FLUID ENGINE:</span>
              <span className={performanceMode ? 'text-yellow-500 font-bold' : 'text-purple-glow font-bold'}>
                {performanceMode ? 'ECO_MODE' : 'MAX_STABILITY'}
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
