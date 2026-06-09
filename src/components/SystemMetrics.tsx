import React, { useEffect, useState } from 'react';
import { audio } from '../utils/audio';
import { BarChart3, Database, ShieldAlert, Zap, Cpu } from 'lucide-react';

export const SystemMetrics: React.FC = () => {
  const [metricPulse, setMetricPulse] = useState(0);

  // Counters parameters
  const stats = [
    { label: 'PROJECTS_BUILT', value: 3, unit: 'UNITS' },
    { label: 'TECHS_DEPLOYED', value: 15, unit: 'NODES' },
    { label: 'APIS_INTEGRATED', value: 10, unit: 'PIPES' },
    { label: 'AWS_SERVICES', value: 8, unit: 'LAKES' },
    { label: 'DEV_CHRONICLES', value: 4, unit: 'YEARS' },
    { label: 'AI_AGENT_SYSTEMS', value: 5, unit: 'CORES' },
  ];

  // Active chart pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricPulse((prev) => (prev + 1) % 100);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="achievements" className="py-24 relative overflow-hidden font-mono">
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-cyan-glow/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section title */}
        <div className="flex items-center gap-4 mb-16 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 border border-purple-glow/30 flex items-center justify-center bg-purple-glow/5 rounded">
            <BarChart3 className="text-purple-glow" size={20} />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-slate-500 block tracking-widest">MODULE: 06_ANALYTICS</span>
            <h2 className="text-2xl font-black text-white tracking-widest font-orbitron">
              SYSTEM_METRICS
            </h2>
          </div>
          <div className="ml-auto text-right text-[10px] text-slate-500 hidden md:block">
            <span>DIAGNOSTICS: STABLE_LOOP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Counter Metrics Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                onMouseEnter={audio.playHover}
                className="glass-panel border-l-2 border-l-purple-glow rounded-lg p-5 flex flex-col justify-between relative scanner-line"
              >
                <span className="text-[9px] text-slate-500 font-bold block text-left">
                  {stat.label}
                </span>
                
                {/* Visual grid ticks */}
                <div className="absolute top-2 right-3 flex gap-0.5 opacity-30">
                  <div className="w-1 h-2 bg-purple-glow" />
                  <div className="w-1 h-2 bg-purple-glow" />
                  <div className="w-1 h-2 bg-purple-glow" />
                </div>

                <div className="text-left mt-4 mb-1">
                  <span className="text-3xl font-black text-white tracking-widest font-orbitron text-glow-purple">
                    {stat.value}
                  </span>
                  <span className="text-[9px] text-purple-glow font-bold ml-1">
                    {stat.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Visual Holographic Graphs */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="glass-panel border border-slate-800 rounded-xl p-6 flex-1 flex flex-col justify-between min-h-[350px]">
              
              <div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-900 pb-3 mb-6">
                  <span>TELEMETRY GRAPHICS: SYS_ANALYTICS</span>
                  <span className="flex items-center gap-1 text-cyan-glow">
                    <Zap size={10} className="animate-pulse" />
                    LIVE STREAM
                  </span>
                </div>

                {/* Grid chart visualization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  {/* Chart 1: Active Radar Constellation */}
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-2">RADAR_CAPACITY</span>
                    <div className="w-40 h-40 border border-slate-900 rounded-full flex items-center justify-center relative bg-black/20">
                      {/* Grid Radar Rings */}
                      <div className="absolute w-32 h-32 border border-slate-800/60 rounded-full" />
                      <div className="absolute w-20 h-20 border border-slate-800/40 rounded-full" />
                      <div className="absolute w-8 h-8 border border-slate-800/20 rounded-full" />
                      
                      {/* Radar sweep laser */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-glow/10 to-transparent rounded-full animate-orbit-cw origin-center" />
                      
                      {/* Radar capacity SVG nodes mapping */}
                      <svg viewBox="0 0 100 100" className="absolute w-full h-full text-cyan-glow">
                        {/* Radar Axes */}
                        <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                        
                        {/* Selected capacity polygon (Backend, AI, Cloud, Frontend, Tools) */}
                        <polygon
                          points="50,15 85,35 70,80 30,80 15,35"
                          fill="rgba(0, 240, 255, 0.05)"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="2 1"
                        />
                        <circle cx="50" cy="15" r="2" fill="currentColor" />
                        <circle cx="85" cy="35" r="2" fill="currentColor" />
                        <circle cx="70" cy="80" r="2" fill="currentColor" />
                        <circle cx="30" cy="80" r="2" fill="currentColor" />
                        <circle cx="15" cy="35" r="2" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  {/* Chart 2: Telemetry Bandwidth Line */}
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-2">IO_STREAM_CAPACITY</span>
                    <div className="w-full h-40 border border-slate-900 rounded bg-black/30 p-2 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute inset-0 cyber-grid opacity-10" />
                      
                      {/* Graph lines SVG */}
                      <svg viewBox="0 0 100 50" className="w-full h-28 text-purple-glow">
                        <path
                          d={`M 0,40 Q 20,${10 + (metricPulse % 20)} 40,30 T 80,${20 + (metricPulse % 10)} T 100,25 L 100,50 L 0,50 Z`}
                          fill="rgba(188, 19, 254, 0.04)"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        <path
                          d={`M 0,35 Q 20,${25 - (metricPulse % 10)} 40,20 T 80,${15 - (metricPulse % 15)} T 100,10`}
                          fill="none"
                          stroke="#00f0ff"
                          strokeWidth="0.8"
                          strokeDasharray="3 2"
                        />
                      </svg>

                      {/* Diagnostic tags */}
                      <div className="flex justify-between text-[8px] text-slate-500 border-t border-slate-900 pt-1">
                        <span>DATA_RATE: STABLE</span>
                        <span className="text-cyan-glow">CAP: 92.4%</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Status bar description */}
              <div className="border-t border-slate-900 pt-4 mt-6 text-left">
                <span className="text-[9px] text-slate-500 block mb-1">SYSTEM_TELEMETRY_LOGS:</span>
                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                  <span>ALL SYSTEMS OPERATIONAL: CPU TEMP 42°C | MEM USAGE 12.8% | BUFFERED LAKES: COMPLETED</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
