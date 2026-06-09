import React, { useEffect, useRef } from 'react';
import { audio } from '../utils/audio';
import { FileText, Github, Linkedin, Mail, MapPin, Zap, Brain, Terminal, Compass } from 'lucide-react';

interface HeroProps {
  performanceMode: boolean;
  soundEnabled: boolean;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ performanceMode, soundEnabled, onContactClick }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 650);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        height = canvas.height = 650;
      }
    };
    window.addEventListener('resize', handleResize);

    // 3D Nodes configuration
    const maxNodes = performanceMode ? 40 : 90;
    const nodes: Array<{
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      radius: number;
      color: string;
    }> = [];

    const colors = ['#00f0ff', '#0072ff', '#bc13fe'];

    for (let i = 0; i < maxNodes; i++) {
      const x = (Math.random() - 0.5) * width * 1.2;
      const y = (Math.random() - 0.5) * height * 1.2;
      const z = (Math.random() - 0.5) * 400;
      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      // Map mouse displacement to rotations
      targetRotY = (x / width) * 0.6;
      targetRotX = -(y / height) * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Projection variables
    const fov = 350; // Camera focal length

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Interpolate rotation towards target
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Project and store 2D coords
      const projectedNodes: Array<{ px: number; py: number; color: string; radius: number; depth: number }> = [];

      nodes.forEach((n) => {
        // Rotate around Y axis
        let x1 = n.baseX * cosY - n.baseZ * sinY;
        let z1 = n.baseX * sinY + n.baseZ * cosY;

        // Rotate around X axis
        let y2 = n.baseY * cosX - z1 * sinX;
        let z2 = n.baseY * sinX + z1 * cosX;

        // Perspective projection
        const scale = fov / (fov + z2);
        const px = x1 * scale + width / 2;
        const py = y2 * scale + height / 2;

        projectedNodes.push({
          px,
          py,
          color: n.color,
          radius: n.radius * scale,
          depth: z2,
        });
      });

      // Draw connections first
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          // Simple distance filter in 2D
          const dx = n1.px - n2.px;
          const dy = n1.py - n2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            // Faint lines, color blending
            ctx.globalAlpha = (1 - dist / 90) * 0.15;
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.stroke();
          }
        }
      }

      // Draw projected nodes
      projectedNodes.forEach((n) => {
        if (n.px >= 0 && n.px <= width && n.py >= 0 && n.py <= height) {
          ctx.beginPath();
          ctx.arc(n.px, n.py, Math.max(0.2, n.radius), 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          // Fade nodes that are far in the back depth
          const depthAlpha = Math.max(0.1, 1 - (n.depth + 200) / 400);
          ctx.globalAlpha = depthAlpha * 0.8;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [performanceMode]);

  const handleActionClick = () => {
    audio.playBlip();
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden cyber-grid"
    >
      {/* Background visual element */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-glow/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-purple-glow/5 filter blur-[80px] pointer-events-none" />

      {/* Interactive 3D Canvas */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none opacity-80">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Main Hero Layout */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left column: HUD widgets */}
        <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
          {/* Widget 1: Current Focus */}
          <div className="glass-panel border-l-2 border-l-cyan-glow rounded-lg p-5 hud-corner relative scanner-line">
            <div className="hud-inner-corner" />
            <div className="flex items-center gap-2 text-cyan-glow text-[10px] uppercase tracking-widest font-bold mb-3">
              <Brain size={12} />
              <span>CURRENT_FOCUS</span>
            </div>
            <ul className="text-xs space-y-2.5 font-mono text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-ping" />
                Backend Architectures
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow" />
                Microservices Systems
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow" />
                Cloud Engineering
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow" />
                AI Agents & Pipelines
              </li>
            </ul>
          </div>

          {/* Widget 2: Technologies */}
          <div className="glass-panel border-l-2 border-l-purple-glow rounded-lg p-5 hud-corner relative scanner-line">
            <div className="hud-inner-corner" />
            <div className="flex items-center gap-2 text-purple-glow text-[10px] uppercase tracking-widest font-bold mb-3">
              <Terminal size={12} />
              <span>CORE_TECH</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-center">
              <span className="bg-purple-glow/10 border border-purple-glow/20 rounded py-1 px-1.5 text-purple-glow font-bold">
                Java / Spring
              </span>
              <span className="bg-cyan-glow/10 border border-cyan-glow/20 rounded py-1 px-1.5 text-cyan-glow font-bold">
                React / TS
              </span>
              <span className="bg-blue-600/10 border border-blue-600/20 rounded py-1 px-1.5 text-blue-400 font-bold">
                AWS Cloud
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/20 rounded py-1 px-1.5 text-emerald-400 font-bold">
                PostgreSQL
              </span>
              <span className="bg-yellow-500/10 border border-yellow-500/20 rounded py-1 px-1.5 text-yellow-400 font-bold">
                Python / AI
              </span>
              <span className="bg-indigo-500/10 border border-indigo-500/20 rounded py-1 px-1.5 text-indigo-400 font-bold">
                Docker / Git
              </span>
            </div>
          </div>
        </div>

        {/* Center column: Central command panel */}
        <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2">
          
          {/* Identity Dossier holographic node card */}
          <div className="w-full glass-panel border border-cyan-glow/30 rounded-xl p-8 relative overflow-hidden scanner-line shadow-[0_0_50px_rgba(0,240,255,0.08)] text-center">
            
            {/* Corner Bracket decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-glow" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-glow" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-glow" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-glow" />
            
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-cyan-glow/10 border border-cyan-glow/30 rounded-full text-[10px] text-cyan-glow tracking-[0.2em] uppercase font-bold animate-pulse font-mono">
              <Zap size={10} />
              SYSTEM OVERVIEW ACTIVE
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-wider font-orbitron mb-2 uppercase text-white">
              SHANSKAR KUMAR <span className="text-cyan-glow text-glow-cyan">SARRAF</span>
            </h1>
            
            <p className="text-sm font-semibold text-purple-glow tracking-widest uppercase font-orbitron mb-6">
              Software Engineer // Cloud & Backend Architect
            </p>

            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-cyan-glow to-transparent mb-6 mx-auto" />

            <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-md mx-auto mb-8">
              Welcome back to the Command Dashboard. I design and build highly scalable backend engines, distributed cloud systems, and intelligent automation frameworks. Exploring the next frontier in developer engineering.
            </p>

            {/* Quick social CTAs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full font-mono max-w-lg mx-auto">
              
              {/* GitHub */}
              <a
                href="https://github.com/Santu-Sarraf"
                target="_blank"
                rel="noreferrer"
                onClick={handleActionClick}
                onMouseEnter={audio.playHover}
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-700 rounded bg-black/40 text-xs text-slate-300 hover:border-cyan-glow hover:text-cyan-glow transition-all duration-300"
              >
                <Github size={14} />
                <span>GITHUB</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/shanskarsarraf/"
                target="_blank"
                rel="noreferrer"
                onClick={handleActionClick}
                onMouseEnter={audio.playHover}
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-700 rounded bg-black/40 text-xs text-slate-300 hover:border-cyan-glow hover:text-cyan-glow transition-all duration-300"
              >
                <Linkedin size={14} />
                <span>LINKEDIN</span>
              </a>

              {/* Resume */}
              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault();
                  handleActionClick();
                  const event = new CustomEvent('ai-download-resume');
                  window.dispatchEvent(event);
                }}
                onMouseEnter={audio.playHover}
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-700 rounded bg-black/40 text-xs text-slate-300 hover:border-cyan-glow hover:text-cyan-glow transition-all duration-300"
              >
                <FileText size={14} />
                <span>RESUME</span>
              </a>

              {/* Contact */}
              <button
                onClick={() => {
                  handleActionClick();
                  onContactClick();
                }}
                onMouseEnter={audio.playHover}
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-cyan-glow/40 rounded bg-cyan-glow/10 text-xs text-cyan-glow hover:border-cyan-glow hover:bg-cyan-glow hover:text-black hover:shadow-[0_0_12px_#00f0ff] transition-all duration-300 font-bold"
              >
                <Mail size={14} />
                <span>CONTACT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right column: HUD widgets */}
        <div className="lg:col-span-3 flex flex-col gap-6 order-3">
          {/* Widget 3: Education */}
          <div className="glass-panel border-l-2 border-l-blue-glow rounded-lg p-5 hud-corner relative scanner-line">
            <div className="hud-inner-corner" />
            <div className="flex items-center gap-2 text-blue-glow text-[10px] uppercase tracking-widest font-bold mb-3 font-mono">
              <Compass size={12} />
              <span>EDUCATION</span>
            </div>
            <div className="text-xs space-y-1.5 font-mono text-slate-300">
              <p className="font-bold text-white">KIIT UNIVERSITY</p>
              <p className="text-[11px] text-slate-400">B.Tech (Computer Science Eng)</p>
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-800/80 pt-1.5">
                <span>YEARS: 2022 - 2026</span>
                <span className="text-cyan-glow">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Widget 4: Availability */}
          <div className="glass-panel border-l-2 border-l-emerald-500 rounded-lg p-5 hud-corner relative scanner-line">
            <div className="hud-inner-corner" />
            <div className="flex items-center gap-2 text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-3 font-mono">
              <MapPin size={12} />
              <span>STATUS_TELEMETRY</span>
            </div>
            <div className="text-xs space-y-2 font-mono text-slate-300">
              <div className="flex items-center justify-between text-[11px]">
                <span>LOCATION:</span>
                <span className="text-slate-100">Bhubaneswar, IN</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>OPEN_TO:</span>
                <span className="text-emerald-400 font-bold">CONTRACT / FULLTIME</span>
              </div>
              <div className="border-t border-slate-800/80 pt-1.5 text-[9px] text-slate-500 leading-tight">
                Software Engineering Roles, Backend Architectures, Internships.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
