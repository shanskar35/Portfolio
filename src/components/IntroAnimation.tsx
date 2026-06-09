import React, { useEffect, useState, useRef } from 'react';
import { audio } from '../utils/audio';

interface IntroAnimationProps {
  onComplete: () => void;
  soundEnabled: boolean;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete, soundEnabled }) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sound triggering on mount / interaction
  useEffect(() => {
    if (soundEnabled) {
      // Small timeout to allow user interaction context registration
      setTimeout(() => {
        audio.playStartup();
      }, 500);
    }
  }, [soundEnabled]);

  // Phase scheduling
  useEffect(() => {
    // Phase 1: Glowing Pulse (0s - 1.2s)
    const t1 = setTimeout(() => {
      setPhase(2);
      addLog("SCANNING GLOBAL NETWORK [IP: 103.87.29.11]");
    }, 1200);

    // Phase 2: Neural Particles (1.2s - 2.8s)
    const t2 = setTimeout(() => {
      setPhase(3);
      addLog("PINGING DOMAIN NODES... OK");
      addLog("ESTABLISHING NEURAL CONVERGENCE...");
      addLog("LOCATING ENGINEER PROFILE ID: #98381-SARRAF");
    }, 2800);

    // Phase 3: Identity Verification (2.8s - 4.2s)
    const t3 = setTimeout(() => {
      setPhase(4);
      addLog("CRITICAL NODE SYNC: SUCCESS");
      addLog("IDENTITY VERIFIED: SHANSKAR KUMAR SARRAF");
      if (soundEnabled) audio.playSuccess();
    }, 4200);

    // Phase 4: Final Profile Summary Reveal (4.2s - 6.2s)
    const t4 = setTimeout(() => {
      setPhase(5);
    }, 6200);

    // Phase 5: Dashboard Expansion Complete (6.2s+)
    const t5 = setTimeout(() => {
      onComplete();
    }, 7200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  // Handle loading progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 2;
        return Math.min(prev + step, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const addLog = (msg: string) => {
    setConsoleLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  // Particle System Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Particles config
    const particleCount = 120;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ['#00f0ff', '#0072ff', '#bc13fe'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Phase 1: Drawing simple center pulse
      if (phase === 1) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, loadingProgress * 2.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Drawing neural nodes & connections
      if (phase >= 2) {
        particles.forEach((p, idx) => {
          // Update position
          p.x += p.vx;
          p.y += p.vy;

          // Boundary checks
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // In Phase 3: Particles start moving towards center (convergence)
          if (phase === 3) {
            const dx = width / 2 - p.x;
            const dy = height / 2 - p.y;
            p.x += dx * 0.02;
            p.y += dy * 0.02;
          }

          // In Phase 4: Particles lock in central shape
          if (phase === 4) {
            const angle = (idx / particleCount) * Math.PI * 2;
            const targetX = width / 2 + Math.cos(angle) * 120;
            const targetY = height / 2 + Math.sin(angle) * 120;
            p.x += (targetX - p.x) * 0.05;
            p.y += (targetY - p.y) * 0.05;
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(0, 114, 255, 0.12)';
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Connect if close enough
            if (dist < 100) {
              ctx.globalAlpha = (1 - dist / 100) * 0.25;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase, loadingProgress]);

  return (
    <div className="fixed inset-0 bg-[#030508] z-[9999] flex flex-col items-center justify-center overflow-hidden cyber-grid font-mono">
      {/* Background Particle Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Futuristic Scanline Layer */}
      <div className="absolute inset-0 pointer-events-none scanner-line opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(0,114,255,0.08)_0%,rgba(3,5,8,0.85)_80%)]" />

      {/* Cinematic Center Content */}
      <div className="z-10 flex flex-col items-center max-w-lg px-6 w-full text-center select-none">
        
        {/* Terminal Header */}
        <div className="mb-8 w-full flex items-center justify-between text-xs text-cyan-glow border-b border-cyan-glow/20 pb-2">
          <span>DEVICES: SHANSKAR_CORPUS_SECURE</span>
          <span className="animate-pulse">SYS_ON</span>
        </div>

        {/* Phase Text Status */}
        <div className="h-14 flex flex-col items-center justify-center">
          {phase === 1 && (
            <div className="text-sm tracking-[0.3em] text-cyan-glow uppercase text-glow-cyan animate-pulse">
              INITIALIZING ENGINE PORTAL
            </div>
          )}
          {phase === 2 && (
            <div className="text-sm tracking-[0.3em] text-cyan-glow uppercase text-glow-cyan animate-pulse">
              SCANNING GLOBAL NETWORK
            </div>
          )}
          {phase === 3 && (
            <div className="text-sm tracking-[0.3em] text-purple-glow uppercase text-glow-purple animate-pulse">
              LOCATING ENGINEER PROFILE
            </div>
          )}
          {phase === 4 && (
            <div className="text-sm tracking-[0.3em] text-green-400 uppercase font-bold text-glow-cyan animate-pulse">
              IDENTITY VERIFIED // ACCESSED
            </div>
          )}
          {phase === 5 && (
            <div className="text-sm tracking-[0.3em] text-cyan-glow uppercase text-glow-cyan animate-pulse">
              EXPANDING NEURAL INTERFACE
            </div>
          )}
        </div>

        {/* Console Log Feed */}
        <div className="w-full text-left bg-black/50 border border-cyan-glow/10 rounded-md p-4 h-36 overflow-y-auto mb-6 text-[10px] text-slate-400 leading-relaxed font-mono">
          <div className="text-cyan-glow/50 border-b border-cyan-glow/10 pb-1 mb-2 flex items-center justify-between">
            <span>CONSOLE STREAM:</span>
            <span>PORT: 8080</span>
          </div>
          {consoleLogs.map((log, index) => (
            <div key={index} className="truncate select-text select-all">
              <span className="text-cyan-glow">&gt;</span> {log}
            </div>
          ))}
          {phase === 1 && <div><span className="text-cyan-glow animate-pulse">&gt; _</span></div>}
        </div>

        {/* Interactive Hologram Card (Phase 4 Reveal) */}
        <div
          className={`w-full max-w-md transform transition-all duration-1000 ${
            phase >= 4 ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10'
          }`}
        >
          <div className="glass-panel border-glow-cyan rounded-lg p-6 relative overflow-hidden scanner-line">
            <div className="absolute top-0 right-0 bg-cyan-glow/10 text-cyan-glow text-[9px] px-2 py-1 uppercase rounded-bl border-l border-b border-cyan-glow/20">
              ENG-CORE-SECURE
            </div>
            
            {/* Identity details */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded border border-cyan-glow/30 flex items-center justify-center bg-cyan-glow/5 shrink-0 relative overflow-hidden">
                {/* Simulated scan line */}
                <div className="absolute w-full h-[2px] bg-cyan-glow shadow-[0_0_8px_#00f0ff] top-0 animate-bounce" />
                <span className="text-2xl font-black text-cyan-glow/70 font-orbitron">S</span>
              </div>
              <div className="text-left">
                <h2 className="text-lg font-bold text-white tracking-wider font-orbitron text-glow-cyan">
                  SHANSKAR K. SARRAF
                </h2>
                <p className="text-xs text-cyan-glow uppercase tracking-wider mb-2">
                  Software Engineer
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] text-slate-400 font-mono">
                  <div>CODE_ALIAS: <span className="text-purple-glow">Santu</span></div>
                  <div>LOC: <span className="text-cyan-glow">India</span></div>
                  <div>UNI: <span className="text-white">KIIT B.Tech</span></div>
                  <div>GRAD_YEAR: <span className="text-white">2026</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar (Phases 1-3) */}
        {phase < 4 && (
          <div className="w-full bg-slate-900 h-[3px] rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-cyan-glow h-full shadow-[0_0_8px_#00f0ff] transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        )}
      </div>
      
      {/* Footer system details */}
      <div className="absolute bottom-4 text-[9px] text-slate-500 flex justify-between w-full px-6">
        <span>ANTIGRAVITY SYSTEM OS v4.19</span>
        <span>© 2026 SHANSKAR KUMAR SARRAF. ALL SYSTEM DATA CLASSIFIED.</span>
      </div>
    </div>
  );
};
