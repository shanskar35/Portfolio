import React from 'react';
import { audio } from '../utils/audio';
import { Briefcase, Calendar, CheckSquare, Activity, Cpu } from 'lucide-react';

export const CareerTimeline: React.FC = () => {
  const experiences = [
    {
      role: 'Software Developer Intern',
      company: 'Backend Systems & Multiplayer Engine',
      duration: 'Operational Period',
      responsibilities: [
        'Real-Time Multiplayer Systems & WebSockets communication pipelines',
        'Advanced Matchmaking Services & queuing mechanisms',
        'Scalable Tournament & Leaderboard Systems with PostgreSQL storage',
        'AWS Cloud Infrastructure deployment & orchestration (ECS/ECR)',
        'Microservices integration & API gateway routing layers',
      ],
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'WebSockets', 'Microservices', 'AWS'],
      side: 'left',
    },
    {
      role: 'AWS Data Engineering Training',
      company: 'Data Pipelines & Analytics Architecture',
      duration: 'Operational Period',
      responsibilities: [
        'ETL pipeline constructions utilizing AWS Glue',
        'Serverless calculations with AWS Lambda functions',
        'Storage structures in S3 Data Lakes & querying via Redshift',
        'Workflow orchestration using Step Functions',
        'System logs consolidation using CloudWatch & IAM policies validation',
      ],
      tech: ['AWS Glue', 'Lambda', 'S3', 'Redshift', 'Step Functions', 'CloudWatch', 'IAM'],
      side: 'right',
    },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden font-mono">
      {/* Background radial overlays */}
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-glow/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-16 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 border border-cyan-glow/30 flex items-center justify-center bg-cyan-glow/5 rounded">
            <Cpu className="text-cyan-glow" size={20} />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-slate-500 block tracking-widest">MODULE: 03_CHRONOLOGY</span>
            <h2 className="text-2xl font-black text-white tracking-widest font-orbitron">
              CAREER_TIMELINE
            </h2>
          </div>
          <div className="ml-auto text-right text-[10px] text-slate-500 hidden md:block">
            <span>STATE: SEQUENCE_STABLE</span>
          </div>
        </div>

        {/* Timeline body Timeline */}
        <div className="relative max-w-4xl mx-auto mt-12">
          
          {/* Vertical central pathway line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-800 hidden md:block">
            {/* Pulsing indicator traveling along timeline */}
            <div className="absolute w-[6px] h-20 bg-gradient-to-b from-cyan-glow to-transparent left-1/2 -translate-x-1/2 animate-bounce" />
          </div>

          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => {
              const isLeft = exp.side === 'left';
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center justify-between relative ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* central node blip on the line */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-cyan-glow bg-black flex items-center justify-center shadow-[0_0_12px_#00f0ff] hidden md:flex">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-glow animate-pulse" />
                  </div>

                  {/* Left column spacer on desktop */}
                  <div className="w-full md:w-[45%] hidden md:block" />

                  {/* Event card module */}
                  <div
                    onMouseEnter={audio.playHover}
                    className="w-full md:w-[45%] glass-panel border border-slate-800 rounded-xl p-6 relative overflow-hidden scanner-line hover:border-cyan-glow/50 transition-colors duration-300"
                  >
                    {/* Header credentials */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-left">
                        <span className="text-[9px] text-purple-glow font-bold uppercase tracking-wider block mb-1">
                          MISSION_NODE_0{index + 1}
                        </span>
                        <h3 className="text-base font-bold text-white font-orbitron uppercase tracking-wide">
                          {exp.role}
                        </h3>
                        <p className="text-xs text-cyan-glow font-mono mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Timeline bullet points */}
                    <div className="text-xs text-slate-300 space-y-2 text-left mb-6 font-sans">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2">
                          <CheckSquare className="text-cyan-glow shrink-0 mt-0.5" size={12} />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology tags */}
                    <div className="border-t border-slate-800/80 pt-4 flex flex-wrap gap-1.5 justify-start">
                      {exp.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-cyan-glow/5 border border-cyan-glow/15 text-cyan-glow text-[9px] font-mono py-0.5 px-2 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
