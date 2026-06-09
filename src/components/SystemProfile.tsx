import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { User, Shield, Target, Award, Command } from 'lucide-react';

export const SystemProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'core' | 'directives'>('mission');
  const [extraTelemetry, setExtraTelemetry] = useState<string>('');

  const playTabClick = (tabName: 'mission' | 'core' | 'directives') => {
    audio.playBlip();
    setActiveTab(tabName);
    if (tabName === 'mission') {
      setExtraTelemetry('MISSION LOADED: PRIMARY_OBJECTIVE_RESOLVE: "Construct stable microservice fabrics and reliable real-time gaming backends."');
    } else if (tabName === 'core') {
      setExtraTelemetry('SYSTEM RESOLUTION: COMPILING... Java JDK 21 | Spring WebFlux | PostgreSQL Pool Size: 200 | Docker Orchestration Level: 100%');
    } else {
      setExtraTelemetry('ENGINE DIRECTIVES: [1] Optimize memory footprint. [2] Enforce sub-100ms latency standard. [3] Automate CI/CD payload sync.');
    }
  };

  return (
    <section id="profile" className="py-24 relative overflow-hidden font-mono">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-purple-glow/5 filter blur-[90px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading with Telemetry Info */}
        <div className="flex items-center gap-4 mb-12 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 border border-purple-glow/30 flex items-center justify-center bg-purple-glow/5 rounded">
            <User className="text-purple-glow" size={20} />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-slate-500 block tracking-widest">MODULE: 02_DOSSIER</span>
            <h2 className="text-2xl font-black text-white tracking-widest font-orbitron">
              SYSTEM_PROFILE
            </h2>
          </div>
          <div className="ml-auto text-right text-[10px] text-slate-500 hidden md:block">
            <span>FILE: classified_profile.json</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Identity Dossier Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-panel-purple rounded-xl p-6 flex-1 flex flex-col justify-between relative overflow-hidden scanner-line">
              
              {/* Card top branding */}
              <div className="flex justify-between items-center text-[10px] text-purple-glow border-b border-purple-glow/20 pb-3 mb-6">
                <span>IDENTITY CARD #01</span>
                <span>SECURE ACCESS LEVEL 4</span>
              </div>

              {/* Central avatar mockup */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full border-2 border-purple-glow/40 bg-purple-glow/5 flex items-center justify-center p-1.5 relative overflow-hidden mb-4">
                  {/* Rotating orbital decoration */}
                  <div className="absolute inset-0 border border-dashed border-purple-glow/30 rounded-full animate-orbit-cw" />
                  <div className="w-full h-full rounded-full bg-black/60 flex items-center justify-center text-3xl font-black text-purple-glow tracking-tighter font-orbitron">
                    SK
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white tracking-widest font-orbitron uppercase text-glow-purple">
                  Shanskar K. Sarraf
                </h3>
                <p className="text-xs text-slate-400 font-mono tracking-wider mt-1">
                  Alias: Santu Sarraf
                </p>
              </div>

              {/* Physical specifications */}
              <div className="space-y-3 border-t border-slate-800/80 pt-6 text-xs text-slate-300 font-mono">
                <div className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span className="text-slate-500">ENGINE_CLASS:</span>
                  <span className="text-white">Full Stack & Cloud Developer</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span className="text-slate-500">OPERATIONAL_BASE:</span>
                  <span className="text-cyan-glow">Bhubaneswar, Odisha, India</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span className="text-slate-500">EDUCATIONAL_NODE:</span>
                  <span className="text-white">KIIT University</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-1.5">
                  <span className="text-slate-500">DEGREE_PATH:</span>
                  <span className="text-white">B.Tech (Computer Science CSE)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">COMMISSION_DATE:</span>
                  <span className="text-purple-glow font-bold">EXPECTED GRADUATION 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Dossier folders and descriptions */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="glass-panel border border-slate-800 rounded-xl p-6 flex-1 flex flex-col justify-between">
              
              <div>
                {/* Classified Dossier tabs */}
                <div className="flex border-b border-slate-800 gap-2 mb-6">
                  
                  <button
                    onClick={() => playTabClick('mission')}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest border-b-2 transition-all duration-300 ${
                      activeTab === 'mission'
                        ? 'border-purple-glow text-purple-glow font-bold'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Target size={12} />
                    <span>MISSION_PROFILE</span>
                  </button>

                  <button
                    onClick={() => playTabClick('core')}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest border-b-2 transition-all duration-300 ${
                      activeTab === 'core'
                        ? 'border-purple-glow text-purple-glow font-bold'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Shield size={12} />
                    <span>SYSTEM_CORE</span>
                  </button>

                  <button
                    onClick={() => playTabClick('directives')}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest border-b-2 transition-all duration-300 ${
                      activeTab === 'directives'
                        ? 'border-purple-glow text-purple-glow font-bold'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Command size={12} />
                    <span>DIRECTIVES</span>
                  </button>
                </div>

                {/* Tab content rendering */}
                <div className="text-sm text-slate-300 leading-relaxed font-sans min-h-[160px] select-text">
                  {activeTab === 'mission' && (
                    <div className="space-y-4">
                      <p>
                        A motivated software engineer focusing on full-stack systems, cloud engineering, backend scaling, and real-time networking. Passionate about engineering high-performance WebSockets pipelines, robust transaction pools, and microservices architecture.
                      </p>
                      <p>
                        Dedicated to constructing clean APIs, maintaining database integrity, and leveraging automation tools to reduce deployment latency. Seeking roles that push the boundary of backend performance and cloud infrastructure.
                      </p>
                    </div>
                  )}

                  {activeTab === 'core' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="bg-black/30 border border-slate-900 rounded p-3">
                        <span className="text-[10px] text-purple-glow font-bold block mb-1">BACKEND INTERNALS</span>
                        Java, Spring Boot, REST APIs, Microservices, WebSockets, Python, Node.js
                      </div>
                      <div className="bg-black/30 border border-slate-900 rounded p-3">
                        <span className="text-[10px] text-purple-glow font-bold block mb-1">DATABASES & CACHING</span>
                        PostgreSQL, MongoDB, Redis, SQL pools, relational schemas
                      </div>
                      <div className="bg-black/30 border border-slate-900 rounded p-3">
                        <span className="text-[10px] text-purple-glow font-bold block mb-1">CLOUD TELEMETRY</span>
                        Amazon Web Services (AWS), ECS, S3, IAM, CloudWatch, Data Pipelines
                      </div>
                      <div className="bg-black/30 border border-slate-900 rounded p-3">
                        <span className="text-[10px] text-purple-glow font-bold block mb-1">FRONTEND SYSTEMS</span>
                        React, TypeScript, Tailwind CSS, Framer Motion, GSAP, Responsive UI
                      </div>
                    </div>
                  )}

                  {activeTab === 'directives' && (
                    <div className="space-y-3 text-xs font-mono">
                      <div className="flex gap-2">
                        <span className="text-purple-glow font-bold">[01]</span>
                        <span>SCALABLE ARCHITECTURE: Focus on horizontal microservice scaling, load balancer integration, and lightweight network protocol stacks.</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-purple-glow font-bold">[02]</span>
                        <span>COMPUTER VISION RESEARCH: Build deep learning convolutional pipelines for road object detection and real-time image segmentation.</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-purple-glow font-bold">[03]</span>
                        <span>REAL-TIME CONNECTIVITY: Engineer ultra-low latency WebSocket gateways for multiplayer environments (e.g. Carrom Platform).</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic console log outputs */}
              <div className="border-t border-slate-900 pt-6 mt-6">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">DOSSIER_TELEMETRY:</div>
                <div className="w-full bg-black/60 border border-slate-900 rounded p-3 min-h-[48px] text-[10px] font-mono text-purple-glow/85 leading-normal">
                  <span className="text-purple-glow/30">&gt;&gt;</span> {extraTelemetry || 'SELECT Dossier folder tab for telemetry logs...'}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
