import { useState, useEffect, useRef } from 'react';
import { audio } from './utils/audio';
import { IntroAnimation } from './components/IntroAnimation';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SystemProfile } from './components/SystemProfile';
import { CareerTimeline } from './components/CareerTimeline';
import { TechnologyConstellation } from './components/TechnologyConstellation';
import { MissionArchives } from './components/MissionArchives';
import { SystemMetrics } from './components/SystemMetrics';
import { CommandConsole } from './components/CommandConsole';
import { SantuAI } from './components/SantuAI';
import { MatrixBg } from './components/MatrixBg';
import { RocketDeploy } from './components/RocketDeploy';
import { Contact } from './components/Contact';
import { Bot, Terminal, Volume2, Shield } from 'lucide-react';
import './App.css';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [deployActive, setDeployActive] = useState(false);
  const [syncFlash, setSyncFlash] = useState(false);
  
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Resume Download Handler
  useEffect(() => {
    const handleDownload = () => {
      const dossierText = `====================================================================
SHANSKAR KUMAR SARRAF (SANTU SARRAF) - PROFESSIONAL ENGINEER DOSSIER
====================================================================
ROLE: Software Engineer / Backend Developer / Cloud Engineer
COORDINATES: Bhubaneswar, Odisha, India
EDUCATION: B.Tech in Computer Science Engineering, KIIT University (2026)
GITHUB: https://github.com/Santu-Sarraf
LINKEDIN: https://www.linkedin.com/in/shanskarsarraf/

SUMMARY:
Motivated software developer experienced in building real-time multiplayer systems,
WebSocket communication networks, transactional microservices, and automated
ETL cloud data pipelines. Passionate about system latency, microservices, and computer vision.

CORE TECHNOLOGY CONSTELLATIONS:
--------------------------------------------------------------------
[BACKEND SYSTEMS]   - Java, Spring Boot, REST APIs, Microservices, WebSockets, Node.js
[DATABASES & CACHE] - PostgreSQL, MongoDB, SQL Pool Tuning, Cache Layers
[CLOUD & DEVOPS]    - AWS Cloud, ECS, ECR, S3, IAM, CloudWatch, Lambda
[AI & COMPUTER VISION] - Python, PyTorch, Computer Vision, OpenCV, ResNet
[DEVELOPER TOOLS]   - Git, GitHub, Postman, Linux Command Shells, VS Code

CAREER CHRONOLOGY:
--------------------------------------------------------------------
1. Software Developer Intern (Backend Engineering)
   - Built WebSockets servers for real-time multiplayer board gameplay.
   - Designed priority queues for matchmaking services and tournament leaderboards.
   - Leveraged AWS ECS/ECR for secure cloud containers deployments.
   
2. AWS Data Engineering & Pipeline Training
   - Programmed Glue crawler schemas, Lambda scripts, and S3 data lake aggregations.
   - Automated serverless logs analysis via AWS Redshift arrays and Step Functions.

====================================================================
DOSSIER AUTHENTICATION STATUS: VERIFIED Payloads // OS-SECURE
====================================================================`;

      const blob = new Blob([dossierText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'shanskar_sarraf_dossier.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    window.addEventListener('ai-download-resume', handleDownload);
    return () => window.removeEventListener('ai-download-resume', handleDownload);
  }, []);

  // Section Tracking via Intersection Observer
  useEffect(() => {
    if (!introComplete) return;

    const sections = ['home', 'profile', 'experience', 'skills', 'projects', 'achievements', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [introComplete]);

  // Canvas Cursor Trail Animation
  useEffect(() => {
    const canvas = cursorCanvasRef.current;
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

    const sparks: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number; color: string }> = [];
    const colors = ['#00f0ff', '#bc13fe', '#0072ff'];

    const handleMouseMove = (e: MouseEvent) => {
      // Create trailing sparks
      const count = performanceMode ? 1 : 3;
      for (let i = 0; i < count; i++) {
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 2 + 1,
          alpha: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.02;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();
      }

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

  const handleContactOpen = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSectionSelect = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Sync Trigger Flash
  const triggerSyncFlash = () => {
    setSyncFlash(true);
    if (soundEnabled) audio.playSuccess();
    setTimeout(() => {
      setSyncFlash(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#030508] text-slate-100 overflow-x-hidden selection:bg-cyan-glow/30 selection:text-white">
      {/* Background visual components */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Floating Canvas Cursor Trail */}
      <canvas
        ref={cursorCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
      />

      {/* Active Matrix Overlay */}
      {matrixMode && <MatrixBg performanceMode={performanceMode} />}

      {/* Sync Flash Overlay */}
      {syncFlash && (
        <div className="fixed inset-0 bg-cyan-glow/15 z-[9998] pointer-events-none transition-all duration-1000 border-4 border-cyan-glow animate-pulse" />
      )}

      {/* Rocket Launch Overlay */}
      {deployActive && (
        <RocketDeploy
          soundEnabled={soundEnabled}
          onClose={() => setDeployActive(false)}
        />
      )}

      {/* cinematic intro animation or main content */}
      {!introComplete ? (
        <IntroAnimation
          soundEnabled={soundEnabled}
          onComplete={() => setIntroComplete(true)}
        />
      ) : (
        /* Full Portfolio Dashboard Layout */
        <div className="flex flex-col min-h-screen relative z-10">
          
          {/* Header Navigation HUD */}
          <Navbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            matrixMode={matrixMode}
            setMatrixMode={setMatrixMode}
            performanceMode={performanceMode}
            setPerformanceMode={setPerformanceMode}
          />

          {/* Main contents scroll layers */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6">
            
            {/* Hero Dashboard */}
            <Hero
              performanceMode={performanceMode}
              soundEnabled={soundEnabled}
              onContactClick={handleContactOpen}
            />

            {/* Profile Dossier */}
            <SystemProfile />

            {/* Career Chronology */}
            <CareerTimeline />

            {/* Technology galaxy */}
            <TechnologyConstellation />

            {/* Mission Dossiers */}
            <MissionArchives />

            {/* System analytics metrics */}
            <SystemMetrics />

            {/* Operations Console widget */}
            <section className="py-16">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6 font-mono text-xs">
                  <Terminal size={14} className="text-purple-glow" />
                  <span className="text-slate-500 uppercase tracking-widest">DIAGNOSTIC CORE COMMAND TERMINAL:</span>
                </div>
                <CommandConsole
                  onContactClick={handleContactOpen}
                  onSectionSelect={handleSectionSelect}
                  onDeployTrigger={() => setDeployActive(true)}
                  onSyncTrigger={triggerSyncFlash}
                />
              </div>
            </section>

            {/* Contact Portal */}
            <Contact />

          </main>

          {/* Assistant float orb bot */}
          <SantuAI
            onSectionSelect={handleSectionSelect}
            soundEnabled={soundEnabled}
          />

          {/* Page Footer */}
          <footer className="border-t border-slate-900 bg-slate-950/40 py-8 font-mono text-center text-[10px] text-slate-500 relative z-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-cyan-glow" />
                <span>SYS_STATUS: COMPILER_ONLINE // STABLE</span>
              </div>
              <div>
                <span>© 2026 SHANSKAR KUMAR SARRAF. ALL SYSTEMS DESIGNED AND VALIDATED.</span>
              </div>
            </div>
          </footer>

        </div>
      )}

      {/* Initial user voice interaction helper */}
      {!introComplete && !soundEnabled && (
        <button
          onClick={() => {
            setSoundEnabled(true);
            audio.setMuted(false);
            audio.playBlip();
          }}
          className="fixed bottom-4 left-4 z-[10000] flex items-center gap-2 py-2 px-3 bg-cyan-glow/10 border border-cyan-glow/30 hover:border-cyan-glow rounded font-mono text-[9px] text-cyan-glow hover:bg-cyan-glow/20 transition-all uppercase tracking-wider shadow-md font-bold"
        >
          <Volume2 size={12} />
          <span>ACTIVATE AUDIO SYNTHS</span>
        </button>
      )}
    </div>
  );
}

export default App;
