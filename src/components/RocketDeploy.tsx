import React, { useEffect, useState } from 'react';
import { audio } from '../utils/audio';
import { Rocket, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RocketDeployProps {
  onClose: () => void;
  soundEnabled: boolean;
}

export const RocketDeploy: React.FC<RocketDeployProps> = ({ onClose, soundEnabled }) => {
  const [count, setCount] = useState(5);
  const [status, setStatus] = useState<'countdown' | 'ignition' | 'launch' | 'success'>('countdown');

  useEffect(() => {
    if (count > 0 && status === 'countdown') {
      const timer = setTimeout(() => {
        setCount((c) => c - 1);
        if (soundEnabled) {
          // Play a clean blip for countdown ticks
          audio.playBlip();
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 0 && status === 'countdown') {
      setStatus('ignition');
      if (soundEnabled) audio.playStartup(); // Powerful sound sweep
      
      const tIgnition = setTimeout(() => {
        setStatus('launch');
        // Confetti burst on launch launch
        const end = Date.now() + (2 * 1000);
        const interval = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval);
            return;
          }
          confetti({
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            colors: ['#00f0ff', '#0072ff', '#bc13fe'],
          });
        }, 200);

        const tClose = setTimeout(() => {
          setStatus('success');
          const tExit = setTimeout(() => {
            onClose();
          }, 1500);
          return () => clearTimeout(tExit);
        }, 2500);

        return () => {
          clearTimeout(tClose);
          clearInterval(interval);
        };
      }, 1200);

      return () => clearTimeout(tIgnition);
    }
  }, [count, status, onClose, soundEnabled]);

  return (
    <div className={`fixed inset-0 z-[10000] bg-black/90 flex flex-col items-center justify-center font-mono ${
      status === 'ignition' ? 'animate-bounce' : ''
    }`}>
      {/* Dynamic scanlines */}
      <div className="absolute inset-0 scanner-line opacity-20 pointer-events-none" />

      {/* Floating alert frames */}
      <div className="max-w-md w-full mx-6 p-8 border-2 border-red-500/40 rounded-xl bg-slate-950/80 text-center relative overflow-hidden shadow-[0_0_40px_rgba(239,68,68,0.15)]">
        
        {/* Warning panels */}
        <div className="flex items-center justify-center gap-2 text-red-500 font-bold mb-6 tracking-widest text-sm animate-pulse">
          <ShieldAlert size={18} />
          <span>MISSION_DEPLOYMENT_ACTIVE</span>
        </div>

        {status === 'countdown' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">AUTHENTICATING CRITICAL COMPILED PAYLOADS...</p>
            <div className="text-8xl font-black text-white font-orbitron animate-pulse">
              0{count}
            </div>
            <p className="text-[10px] text-red-500/80 uppercase tracking-widest font-bold">
              WARHEAD: ORBITAL_PROTOTYPE_SYNC
            </p>
          </div>
        )}

        {status === 'ignition' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">IGNITING CORE THRUSTERS...</p>
            <div className="text-4xl font-black text-cyan-glow font-orbitron tracking-widest animate-ping">
              IGNITION
            </div>
            <p className="text-[9px] text-cyan-glow/60 uppercase">
              GRID SHIELDING DEACTIVATING... OK
            </p>
          </div>
        )}

        {status === 'launch' && (
          <div className="space-y-4 flex flex-col items-center justify-center h-48">
            <p className="text-xs text-slate-400 animate-pulse">ESTABLISHING ORBITAL VELOCITY...</p>
            
            {/* Flying rocket animation */}
            <div className="relative animate-bounce duration-75">
              <Rocket size={48} className="text-cyan-glow transform -rotate-45 animate-bounce" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-red-500 to-yellow-500 blur-sm rounded-full animate-pulse" />
            </div>

            <div className="text-lg font-bold text-cyan-glow uppercase font-orbitron text-glow-cyan animate-pulse">
              DISPATCHING TO PRODUCTION
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <p className="text-xs text-green-400 font-bold uppercase tracking-widest">TRANSMISSION OK // DEPLOYMENT VERIFIED</p>
            <div className="text-3xl font-black text-white font-orbitron tracking-wider">
              SUCCESS
            </div>
            <p className="text-[9px] text-slate-500">
              Returning control panel to Engineer Sarraf...
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
