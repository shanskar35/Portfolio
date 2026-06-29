import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { Shield, ExternalLink, Github, Filter, Target, Award, Database } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: 'backend' | 'ai' | 'cloud' | 'fullstack';
  overview: string;
  features: string[];
  tech: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  demoUrl?: string;
  architectureType: 'game' | 'cv' | 'etl';
}

export const MissionArchives: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'ALL_MISSIONS' },
    { id: 'backend', label: 'BACKEND' },
    { id: 'cloud', label: 'CLOUD_ENG' },
    { id: 'ai', label: 'AI_VISION' },
  ];

  const projects: Project[] = [
    {
      id: 'mission-01',
      name: 'Real-Time Multiplayer Carrom Platform',
      category: 'backend',
      overview: 'High-performance real-time multiplayer gaming server orchestrating state replication and pairing.',
      features: [
        'WebSockets real-time network propagation layer',
        'Stateful matchmaker engines with priority queues',
        'Global tournament schedules & transactional leaderboards',
        'Simulated AI engine for player-vs-bot practice mode',
      ],
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'WebSockets', 'Microservices', 'AWS'],
      metrics: [
        { label: 'SOCKET_PING', value: '<45ms' },
        { label: 'CONCURRENT_USERS', value: '10k+' },
      ],
      githubUrl: 'https://github.com/shanskar35',
      demoUrl: 'https://github.com/shanskar35',
      architectureType: 'game',
    },
    {
      id: 'mission-02',
      name: 'Image Segmentation for Autonomous Vehicles',
      category: 'ai',
      overview: 'Neural image segmentation processor built for instant identification of road objects.',
      features: [
        'ResNet encoder-decoder deep learning architecture',
        'Feature pyramid networks resolving small spatial boundaries',
        'Optimized TensorRT engine inference loops',
      ],
      tech: ['Python', 'PyTorch', 'Computer Vision', 'TensorRT', 'OpenCV'],
      metrics: [
        { label: 'MODEL_ACCURACY', value: '75% mIoU' },
        { label: 'INFERENCE_SPEED', value: '50 FPS' },
      ],
      githubUrl: 'https://github.com/shanskar35',
      architectureType: 'cv',
    },
    {
      id: 'mission-03',
      name: 'AWS Data Engineering Pipeline',
      category: 'cloud',
      overview: 'Serverless data lake ETL compiler for automated log aggregations and analytics querying.',
      features: [
        'Automated file schema resolving with AWS Glue Crawler',
        'Serverless event stream triggers with AWS Lambda',
        'Data transformations mapping files into Redshift arrays',
        'Audit loops using CloudWatch and Step Functions',
      ],
      tech: ['AWS Glue', 'Lambda', 'Redshift', 'S3', 'CloudWatch', 'Step Functions'],
      metrics: [
        { label: 'DATA_PROCESSED', value: '5 TB/Day' },
        { label: 'TRANSFORM_COST', value: '-40%' },
      ],
      githubUrl: 'https://github.com/shanskar35',
      architectureType: 'etl',
    },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  const handleFilterClick = (id: string) => {
    audio.playBlip();
    setFilter(id);
  };

  // SVG Architecture Schema Diagrams
  const renderArchitectureDiagram = (type: 'game' | 'cv' | 'etl') => {
    if (type === 'game') {
      return (
        <svg viewBox="0 0 240 100" className="w-full h-full text-cyan-glow opacity-80 font-mono">
          {/* Node 1 Client */}
          <rect x="10" y="35" width="45" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="1" />
          <text x="14" y="50" fontSize="6" fill="currentColor">CLIENTS</text>
          
          {/* WS Arrow */}
          <path d="M 60 42 L 95 42 M 95 53 L 60 53" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="68" y="38" fontSize="5" fill="currentColor">WS/TCP</text>

          {/* Core Server Node */}
          <rect x="100" y="15" width="60" height="65" rx="3" fill="rgba(0, 240, 255, 0.05)" stroke="currentColor" strokeWidth="1" />
          <text x="104" y="28" fontSize="6" fontWeight="bold" fill="currentColor">WS GATEWAY</text>
          <line x1="100" y1="35" x2="160" y2="35" stroke="currentColor" strokeWidth="0.5" />
          <text x="104" y="47" fontSize="5.5" fill="currentColor">MATCHMAKER</text>
          <text x="104" y="60" fontSize="5.5" fill="currentColor">GAME ENGINE</text>
          <text x="104" y="72" fontSize="5.5" fill="currentColor">REDIS CACHE</text>

          {/* Database Node */}
          <path d="M 215 35 Q 215 30 200 30 Q 185 30 185 35 L 185 65 Q 185 70 200 70 Q 215 70 215 65 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="200" cy="35" rx="15" ry="5" fill="none" stroke="currentColor" strokeWidth="1" />
          <text x="190" y="54" fontSize="6" fill="currentColor">POSTGRES</text>

          {/* Connection Core-Db */}
          <path d="M 165 48 L 180 48" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      );
    }
    if (type === 'cv') {
      return (
        <svg viewBox="0 0 240 100" className="w-full h-full text-purple-glow opacity-80 font-mono">
          {/* Input Image */}
          <rect x="10" y="25" width="35" height="45" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
          <text x="13" y="45" fontSize="6" fill="currentColor">IMG FEED</text>
          <text x="13" y="53" fontSize="5" fill="currentColor">[224x224]</text>

          {/* Connection */}
          <path d="M 50 48 L 65 48" fill="none" stroke="currentColor" strokeWidth="0.8" />

          {/* Encoder Block */}
          <polygon points="70,20 105,32 105,68 70,80" fill="rgba(188, 19, 254, 0.05)" stroke="currentColor" strokeWidth="1" />
          <text x="76" y="51" fontSize="6.5" fill="currentColor">RESNET</text>
          <text x="76" y="59" fontSize="5.5" fill="currentColor">ENCODER</text>

          {/* Connection */}
          <path d="M 110 48 L 125 48" fill="none" stroke="currentColor" strokeWidth="0.8" />

          {/* Decoder Block */}
          <polygon points="130,32 165,20 165,80 130,68" fill="rgba(188, 19, 254, 0.05)" stroke="currentColor" strokeWidth="1" />
          <text x="136" y="51" fontSize="6.5" fill="currentColor">PYRAMID</text>
          <text x="136" y="59" fontSize="5.5" fill="currentColor">DECODER</text>

          {/* Connection */}
          <path d="M 170 48 L 185 48" fill="none" stroke="currentColor" strokeWidth="0.8" />

          {/* Output Mask */}
          <rect x="190" y="25" width="35" height="45" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
          <text x="194" y="45" fontSize="6.5" fill="currentColor">SEG MASK</text>
          <text x="194" y="53" fontSize="5" fill="currentColor">75% mIoU</text>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 240 100" className="w-full h-full text-yellow-500 opacity-80 font-mono">
        {/* S3 Input */}
        <rect x="10" y="30" width="35" height="35" rx="3" fill="none" stroke="currentColor" strokeWidth="1" />
        <text x="14" y="46" fontSize="6.5" fill="currentColor">S3 IN</text>
        <text x="14" y="54" fontSize="5" fill="currentColor">RAW DATA</text>

        {/* Arrow */}
        <path d="M 50 48 L 65 48" fill="none" stroke="currentColor" strokeWidth="0.8" />

        {/* AWS Glue Transformer */}
        <rect x="70" y="20" width="55" height="55" rx="3" fill="rgba(234, 179, 8, 0.05)" stroke="currentColor" strokeWidth="1" />
        <text x="74" y="38" fontSize="6.5" fontWeight="bold" fill="currentColor">AWS GLUE</text>
        <text x="74" y="48" fontSize="5.5" fill="currentColor">ETL JOB</text>
        <text x="74" y="58" fontSize="5.5" fill="currentColor">SCHEMA COMPILER</text>

        {/* Arrow */}
        <path d="M 130 48 L 145 48" fill="none" stroke="currentColor" strokeWidth="0.8" />

        {/* AWS Lambda Node */}
        <rect x="150" y="35" width="40" height="25" rx="2" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <text x="154" y="50" fontSize="6" fill="currentColor">LAMBDA</text>

        {/* Arrow */}
        <path d="M 195 48 L 205 48" fill="none" stroke="currentColor" strokeWidth="0.8" />

        {/* Redshift Node */}
        <path d="M 235 38 Q 235 35 220 35 Q 205 35 205 38 L 205 60 Q 205 63 220 63 Q 235 63 235 60 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="220" cy="38" rx="15" ry="3" fill="none" stroke="currentColor" strokeWidth="1" />
        <text x="210" y="52" fontSize="5" fill="currentColor">REDSHIFT</text>
      </svg>
    );
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden font-mono">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-glow/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section title */}
        <div className="flex items-center gap-4 mb-12 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 border border-cyan-glow/30 flex items-center justify-center bg-cyan-glow/5 rounded">
            <Target className="text-cyan-glow" size={20} />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-slate-500 block tracking-widest">MODULE: 05_MISSIONS</span>
            <h2 className="text-2xl font-black text-white tracking-widest font-orbitron">
              MISSION_ARCHIVES
            </h2>
          </div>
          <div className="ml-auto text-right text-[10px] text-slate-500 hidden md:block">
            <span>REGISTRY: SECURE_CONTAINER</span>
          </div>
        </div>

        {/* Filtering HUD */}
        <div className="flex flex-wrap gap-2 items-center justify-start mb-10 bg-black/30 border border-slate-900 rounded-lg p-2 max-w-2xl">
          <div className="flex items-center gap-1.5 px-3 py-1 text-[10px] text-slate-500 uppercase border-r border-slate-800 mr-2">
            <Filter size={12} />
            <span>FILTER</span>
          </div>
          {filters.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleFilterClick(f.id)}
                onMouseEnter={audio.playHover}
                className={`py-1 px-3 rounded text-[10px] font-semibold tracking-widest transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-glow/15 border border-cyan-glow/35 text-cyan-glow shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Mission Dossier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="glass-panel border border-slate-800 rounded-xl overflow-hidden relative flex flex-col justify-between scanner-line hover:border-cyan-glow/30 transition-all duration-300 group"
            >
              <div>
                {/* Visual Header */}
                <div className="bg-slate-950/80 border-b border-slate-900 p-4 flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <Shield size={12} className="text-cyan-glow" />
                    <span className="text-[10px] text-cyan-glow font-bold tracking-widest uppercase">
                      {p.id}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-500 uppercase font-mono">
                    CAT: {p.category}
                  </span>
                </div>

                {/* Architecture Schematic Viewport */}
                <div className="bg-black/60 h-32 border-b border-slate-900 flex items-center justify-center p-3 relative overflow-hidden group-hover:bg-slate-950/30 transition-colors">
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 cyber-grid opacity-10" />
                  
                  {/* Render schematic */}
                  {renderArchitectureDiagram(p.architectureType)}
                </div>

                {/* Body Details */}
                <div className="p-5 text-left">
                  <h3 className="text-sm font-bold text-white font-orbitron tracking-wider mb-2 uppercase group-hover:text-cyan-glow transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-4 select-text">
                    {p.overview}
                  </p>
                  
                  <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-2 font-mono">
                    MISSION_DIRECTIVES:
                  </div>
                  <ul className="text-[10px] text-slate-300 font-mono space-y-1 mb-5">
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1">
                        <span className="text-cyan-glow">&gt;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer specs & actions */}
              <div className="p-5 border-t border-slate-900/80 bg-black/10">
                {/* Telemetry Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {p.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="bg-black/40 border border-slate-900 rounded p-1.5 text-center">
                      <span className="text-[8px] text-slate-500 block">{m.label}</span>
                      <span className="text-[10px] font-bold text-cyan-glow">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 border-t border-slate-900/50 pt-3">
                  <div className="flex flex-wrap gap-1 shrink">
                    {p.tech.slice(0, 3).map((t, tIdx) => (
                      <span key={tIdx} className="text-[8px] border border-slate-800 text-slate-400 rounded py-0.5 px-1 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 ml-auto">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => audio.playBlip()}
                      onMouseEnter={audio.playHover}
                      title="GitHub Mission Source"
                      className="p-1.5 rounded border border-slate-800 bg-slate-900/30 text-slate-400 hover:text-cyan-glow hover:border-cyan-glow transition-colors"
                    >
                      <Github size={12} />
                    </a>
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => audio.playBlip()}
                        onMouseEnter={audio.playHover}
                        title="Launch Mission Demo"
                        className="p-1.5 rounded border border-slate-800 bg-slate-900/30 text-slate-400 hover:text-cyan-glow hover:border-cyan-glow transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
