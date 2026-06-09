import React, { useEffect, useRef, useState } from 'react';
import { audio } from '../utils/audio';
import { Award, Compass, Search, Orbit } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // percentage
}

interface SkillCategory {
  id: string;
  name: string;
  color: string;
  skills: Skill[];
  description: string;
}

export const TechnologyConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('backend');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const categories: SkillCategory[] = [
    {
      id: 'backend',
      name: 'BACKEND SYSTEMS',
      color: '#00f0ff', // cyan
      description: 'Core engine development, microservices, and relational schemas.',
      skills: [
        { name: 'Java', level: 90 },
        { name: 'Spring Boot', level: 90 },
        { name: 'Node.js', level: 80 },
        { name: 'REST APIs', level: 95 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 75 },
        { name: 'Microservices', level: 85 },
      ],
    },
    {
      id: 'frontend',
      name: 'FRONTEND DEVELOPMENT',
      color: '#0072ff', // blue
      description: 'Creating high-fidelity, responsive user dashboards & portals.',
      skills: [
        { name: 'React', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 95 },
      ],
    },
    {
      id: 'cloud',
      name: 'CLOUD & DEVOPS',
      color: '#bc13fe', // purple
      description: 'Distributed pipelines, container registries, and serverless compute.',
      skills: [
        { name: 'AWS Cloud', level: 80 },
        { name: 'ECS / ECR', level: 75 },
        { name: 'S3 storage', level: 85 },
        { name: 'AWS IAM', level: 80 },
        { name: 'CloudWatch', level: 80 },
        { name: 'Lambda', level: 80 },
      ],
    },
    {
      id: 'ai',
      name: 'AI & COMPUTER VISION',
      color: '#10b981', // emerald
      description: 'Researching convolutional neural networks and real-time image segmentation.',
      skills: [
        { name: 'Python', level: 85 },
        { name: 'PyTorch', level: 85 },
        { name: 'Computer Vision', level: 80 },
        { name: 'OpenCV', level: 80 },
        { name: 'ResNet / CNNs', level: 75 },
      ],
    },
    {
      id: 'tools',
      name: 'SYSTEM TOOLS',
      color: '#eab308', // yellow
      description: 'Version control, development shells, and API testing suites.',
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'Postman', level: 85 },
        { name: 'Linux', level: 80 },
        { name: 'VS Code', level: 95 },
      ],
    },
  ];

  const activeCategoryData = categories.find((c) => c.id === selectedCategory)!;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 400);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.parentElement?.clientWidth || 600;
        height = canvas.height = 400;
      }
    };
    window.addEventListener('resize', handleResize);

    // Galaxy Star Coordinates Setup
    let angle = 0;
    const drawGalaxy = () => {
      ctx.clearRect(0, 0, width, height);

      // Central core coordinates
      const cx = width / 2;
      const cy = height / 2;

      // Draw Central Core Star
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Orbit Circles
      categories.forEach((cat, idx) => {
        const radius = 60 + idx * 30;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Calculate revolving positions (category planetary nodes)
        const speedMultiplier = 1 / (idx + 2);
        const rotAngle = angle * speedMultiplier + (idx * Math.PI) / 2.5;
        const px = cx + Math.cos(rotAngle) * radius;
        const py = cy + Math.sin(rotAngle) * radius;

        // Draw orbital planets
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = cat.color;
        ctx.fill();

        // Highlight selected category orbit
        if (cat.id === selectedCategory) {
          ctx.strokeStyle = `${cat.color}33`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
          
          // Draw connection to the planet
          ctx.strokeStyle = `${cat.color}66`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.stroke();
          
          // Draw constellation lines branching off selected planet
          const skillCount = cat.skills.length;
          cat.skills.forEach((skill, sIdx) => {
            const skillAngle = (sIdx / skillCount) * Math.PI * 2 + angle * 0.2;
            const skillDist = 45 + (skill.level / 100) * 25;
            const sx = px + Math.cos(skillAngle) * skillDist;
            const sy = py + Math.sin(skillAngle) * skillDist;

            // Draw line to sub-skill node
            ctx.strokeStyle = `${cat.color}44`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(sx, sy);
            ctx.stroke();

            // Draw sub-skill node star
            ctx.beginPath();
            ctx.arc(sx, sy, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            // Draw micro labels if near planet
            ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.font = '7px Fira Code';
            ctx.fillText(skill.name, sx + 5, sy + 3);
          });
        }
      });

      angle += 0.003;
      animationFrameId = requestAnimationFrame(drawGalaxy);
    };

    drawGalaxy();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedCategory]);

  const selectCat = (id: string) => {
    audio.playBlip();
    setSelectedCategory(id);
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden font-mono">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-glow/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section title */}
        <div className="flex items-center gap-4 mb-16 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 rounded">
            <Orbit className="text-emerald-400" size={20} />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-slate-500 block tracking-widest">MODULE: 04_KNOWLEDGE</span>
            <h2 className="text-2xl font-black text-white tracking-widest font-orbitron">
              TECH_CONSTELLATION
            </h2>
          </div>
          <div className="ml-auto text-right text-[10px] text-slate-500 hidden md:block">
            <span>UNIVERSE: SYSTEM_STRENGTH</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Interactive selector tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest text-left mb-2">SELECT CONSTELLATION:</span>
            
            {categories.map((cat) => {
              const isActive = cat.id === selectedCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => selectCat(cat.id)}
                  onMouseEnter={audio.playHover}
                  className={`w-full text-left py-3 px-4 rounded border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'bg-black/60 shadow-[0_0_15px_rgba(0,240,255,0.05)] border-l-4'
                      : 'bg-[#030508]/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                  }`}
                  style={{ borderLeftColor: isActive ? cat.color : undefined }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs font-semibold tracking-wider">{cat.name}</span>
                  </div>
                  <span className="text-[9px] text-slate-500">[{cat.skills.length} NODES]</span>
                </button>
              );
            })}
          </div>

          {/* Center panel: 2D galaxy mapping */}
          <div className="lg:col-span-5 flex flex-col bg-black/30 border border-slate-900 rounded-xl overflow-hidden relative min-h-[350px]">
            <div className="absolute top-2 left-3 text-[9px] text-slate-500 flex items-center gap-1">
              <Compass size={10} className="animate-spin" />
              <span>GALAXY_VIEWPORT [AUTOPILOT_ON]</span>
            </div>
            
            {/* Visual grid overlay */}
            <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

            <div className="flex-1 flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full max-w-sm h-[320px]" />
            </div>
          </div>

          {/* Right panel: Details of selected constellation */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="glass-panel rounded-xl p-6 flex-1 flex flex-col justify-between border-slate-800">
              
              <div className="text-left select-text">
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono tracking-widest inline-block mb-3"
                  style={{ backgroundColor: `${activeCategoryData.color}22`, color: activeCategoryData.color }}
                >
                  CORE DIRECTIVE
                </span>
                
                <h3 className="text-sm font-bold text-white tracking-widest uppercase font-orbitron mb-2">
                  {activeCategoryData.name}
                </h3>
                
                <p className="text-xs text-slate-400 font-sans leading-relaxed mb-6">
                  {activeCategoryData.description}
                </p>

                <div className="space-y-3.5 border-t border-slate-800/80 pt-5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-2">
                    NODE SPECIFICATIONS:
                  </span>
                  
                  {activeCategoryData.skills.map((skill, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => {
                        audio.playHover();
                        setHoveredSkill(skill);
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="group cursor-help"
                    >
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                        <span className="group-hover:text-cyan-glow transition-colors">{skill.name}</span>
                        <span style={{ color: activeCategoryData.color }}>{skill.level}%</span>
                      </div>
                      
                      {/* Sci-fi custom bars instead of boring plain bars */}
                      <div className="h-[4px] w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: activeCategoryData.color,
                            boxShadow: `0 0 8px ${activeCategoryData.color}`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill information details */}
              <div className="border-t border-slate-900 pt-4 mt-6 text-left">
                <span className="text-[9px] text-slate-500 block mb-1">HOVER_TELEMETRY:</span>
                <div className="text-[10px] text-slate-400 font-mono italic">
                  {hoveredSkill ? (
                    <span>
                      SYSTEM_ANALYSIS: Node "{hoveredSkill.name}" has validation grade of {hoveredSkill.level / 10}.0 / 10.0.
                    </span>
                  ) : (
                    <span>Hover over any skill node bar to check system telemetry grade...</span>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
