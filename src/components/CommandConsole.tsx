import React, { useState, useEffect, useRef } from 'react';
import { audio } from '../utils/audio';
import { Terminal, Shield, Sparkles, Play, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CommandConsoleProps {
  onContactClick: () => void;
  onSectionSelect: (id: string) => void;
  onDeployTrigger: () => void;
  onSyncTrigger: () => void;
}

interface CommandHistory {
  command: string;
  response: string[];
}

export const CommandConsole: React.FC<CommandConsoleProps> = ({
  onContactClick,
  onSectionSelect,
  onDeployTrigger,
  onSyncTrigger,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'sysinit',
      response: [
        'SHANSKAR KUMAR SARRAF COMMAND ENGINE // OS v4.19',
        'TYPE "help" FOR OPERATIONAL COMMAND LISTS.',
      ],
    },
  ]);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  // Scroll to bottom of terminal
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Monitor Ctrl + K global command palette shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        audio.playBlip();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    audio.playKey();

    let response: string[] = [];

    switch (cmd) {
      case 'help':
        response = [
          'AVAILABLE PROTOCOLS:',
          '  profile       - Load physical coordinates & bio dossier',
          '  skills        - Query technology constellation indices',
          '  projects      - Fetch mission archives',
          '  experience    - Display career chronology nodes',
          '  education     - Query KIIT CSE graduation telemetry',
          '  resume        - Extract resume download link',
          '  contact       - Open email communications channel',
          '  github        - Target GitHub repository host',
          '  linkedin      - Establish LinkedIn grid link',
          '  certifications- Fetch AWS and cloud certificates',
          '  jarvis        - Engage security verification protocols',
          '  deploy mission - Initiate launcher sequence',
          '  neural sync   - Align system network visuals',
          '  clear         - Clear terminal stream lines',
        ];
        break;

      case 'profile':
        response = [
          'LOCATING BIO PROFILE DATABASE...',
          'COORDINATES: Bhubaneswar, Odisha, India',
          'TITLE: Software Engineer & Full Stack Developer',
          'DEVIATION LEVEL: STABLE',
          'Redirecting to dossier section...',
        ];
        setTimeout(() => onSectionSelect('profile'), 1200);
        break;

      case 'skills':
        response = [
          'COMPILING SKILL CONSTELLATION INTELLIGENCE...',
          'PRIMARY: Java, Spring Boot, REST APIs, PostgreSQL, AWS Cloud',
          'SECONDARY: Python, Computer Vision, React, TS, Git Shell',
          'Redirecting to skills section...',
        ];
        setTimeout(() => onSectionSelect('skills'), 1200);
        break;

      case 'projects':
        response = [
          'EXTRACTING CLASSIFIED MISSIONS REGISTRY...',
          '  - Mission 01: Multiplayer Carrom Server (Java/WebSockets)',
          '  - Mission 02: Road Image Segmentation (Python/PyTorch)',
          '  - Mission 03: Serverless ETL Logger (AWS Glue/S3)',
          'Redirecting to missions section...',
        ];
        setTimeout(() => onSectionSelect('projects'), 1200);
        break;

      case 'experience':
        response = [
          'CHRONOLOGY TIMELINE DETECTED:',
          '  [01] Software Developer Intern - Backend Systems',
          '  [02] AWS Data Engineering Pipeline training',
          'Redirecting to career timeline section...',
        ];
        setTimeout(() => onSectionSelect('experience'), 1200);
        break;

      case 'education':
        response = [
          'UNIVERSITY TELEMETRY:',
          '  INSTITUTION: KIIT University, Bhubaneswar',
          '  FIELD: Bachelor of Technology in Computer Science',
          '  GRADUATION DATE: EXPECTED 2026',
        ];
        setTimeout(() => onSectionSelect('home'), 1200);
        break;

      case 'resume':
        response = ['RESUME Payloads extracted! Triggering file stream transfer...'];
        // Dispatch custom global event to trigger download
        setTimeout(() => {
          const event = new CustomEvent('ai-download-resume');
          window.dispatchEvent(event);
        }, 1000);
        break;

      case 'contact':
        response = ['COMMUNICATION CHANNELS ENGAGED. Initializing terminal contact widget...'];
        setTimeout(() => onContactClick(), 1200);
        break;

      case 'github':
        response = ['TARGET LOCK FOUND: https://github.com/shanskar35. Redirecting...'];
        setTimeout(() => {
          window.open('https://github.com/shanskar35', '_blank');
        }, 1500);
        break;

      case 'linkedin':
        response = ['GRID LOCK LOCATED: linkedin.com/in/shanskarsarraf35. Redirecting...'];
        setTimeout(() => {
          window.open('https://www.linkedin.com/in/shanskarsarraf35/', '_blank');
        }, 1500);
        break;

      case 'certifications':
        response = [
          'VERIFIED PAYLOADS:',
          '  - AWS Academy Graduate - Cloud Foundations',
          '  - AWS Academy Graduate - Data Engineering Pipeline',
        ];
        break;

      case 'jarvis':
        response = ['[SECURITY VOICE MATRIX ACTIVATED]', 'S.A.N.T.U OS: "Welcome back, Engineer Sarraf."'];
        try {
          if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            const utter = new SpeechSynthesisUtterance('Welcome back, Engineer Sarraf.');
            utter.rate = 1.0;
            utter.volume = 0.5;
            synth.speak(utter);
          }
        } catch (e) {
          // Speak fallback
        }
        confetti({ particleCount: 60, spread: 40, colors: ['#00f0ff', '#bc13fe'] });
        break;

      case 'deploy mission':
        response = ['CRITICAL DIRECTIVE: MISSILE LAUNCH PREPARATION STARTED.', 'T-MINUS 5 SECONDS FOR ORBIT DISPATCH. STAND BY.'];
        setTimeout(() => {
          onDeployTrigger();
        }, 1000);
        break;

      case 'neural sync':
        response = ['ENGAGING INTERACTIVE NEURAL SYNCHRONIZER FIELD...', 'ALL CORES INITIATING SYNC STABILIZATION.'];
        setTimeout(() => {
          onSyncTrigger();
        }, 1000);
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        audio.playError();
        response = [
          `COMMAND "${cmd}" UNRESOLVED.`,
          'TYPE "help" FOR OPERATIONAL PROTOCOLS.',
        ];
        break;
    }

    setHistory((prev) => [...prev, { command: inputVal, response }]);
    setInputVal('');
  };

  return (
    <div className="w-full glass-panel border border-slate-800 rounded-xl overflow-hidden relative font-mono text-xs scanner-line flex flex-col h-80">
      
      {/* HUD console header */}
      <div className="bg-slate-950/80 border-b border-slate-900 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-cyan-glow uppercase tracking-wider">
          <Terminal size={12} className="animate-pulse" />
          <span>AI_COMMAND_CENTER [CONSOLE]</span>
        </div>
        <button
          onClick={() => {
            audio.playBlip();
            setPaletteOpen(true);
          }}
          className="text-[9px] border border-slate-800 text-slate-500 rounded py-0.5 px-2 hover:border-cyan-glow/40 hover:text-cyan-glow transition-all"
        >
          SHORTCUT: CTRL + K (PALETTE)
        </button>
      </div>

      {/* Grid background visual */}
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      {/* Console lines output */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 leading-relaxed text-left bg-black/40 relative z-10 select-text">
        {history.map((hist, idx) => (
          <div key={idx} className="space-y-1 select-text">
            <div className="flex gap-1.5 text-cyan-glow/80 select-text">
              <span>[SANTU-OS@CORE] $</span>
              <span>{hist.command}</span>
            </div>
            {hist.response.map((line, lIdx) => (
              <div key={lIdx} className="text-slate-300 pl-4 whitespace-pre-wrap select-text">
                {line}
              </div>
            ))}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Console input prompt */}
      <form
        onSubmit={handleCommandSubmit}
        className="border-t border-slate-900 bg-slate-950/80 p-2 flex items-center gap-2 relative z-10"
      >
        <span className="text-purple-glow font-bold pl-2 flex items-center gap-1 select-none">
          <Shield size={10} />
          SYS:
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            if (!audio.isMuted() && e.target.value.length > inputVal.length) {
              audio.playKey();
            }
          }}
          placeholder="enter credentials (e.g. help, jarvis, deploy mission)..."
          className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-cyan-glow text-xs py-1.5 font-mono"
        />
        <button
          type="submit"
          onMouseEnter={audio.playHover}
          className="p-1.5 rounded border border-slate-800 text-slate-500 hover:border-cyan-glow hover:text-cyan-glow transition-colors shrink-0"
        >
          <Send size={12} />
        </button>
      </form>

      {/* Global Command Palette Overlay Dialog */}
      {paletteOpen && (
        <div className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#05070a] border border-cyan-glow/30 rounded-xl p-6 relative shadow-[0_0_30px_rgba(0,240,255,0.15)] font-mono text-left scanner-line">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
              <span className="text-[10px] text-cyan-glow tracking-[0.2em] uppercase font-bold flex items-center gap-1">
                <Sparkles size={12} />
                COMMAND_PALETTE
              </span>
              <button
                onClick={() => {
                  audio.playBlip();
                  setPaletteOpen(false);
                }}
                className="text-[10px] text-slate-500 hover:text-white"
              >
                [ESC_CLOSE]
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mb-4 font-sans leading-relaxed">
              Select an operations protocol below to load it into the terminal console.
            </p>

            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {[
                { cmd: 'help', desc: 'Queries list of all available commands' },
                { cmd: 'profile', desc: 'Opens System Bio Dossier' },
                { cmd: 'skills', desc: 'Displays Tech Galaxy Constellations' },
                { cmd: 'projects', desc: 'Loads Classified Mission Archives' },
                { cmd: 'experience', desc: 'Inspects Career Chronology nodes' },
                { cmd: 'resume', desc: 'Downloads PDF Credentials file' },
                { cmd: 'contact', desc: 'Engages Email Interface widget' },
                { cmd: 'jarvis', desc: 'Verifies Security authorization' },
                { cmd: 'deploy mission', desc: 'Initiates countdown launcher sequences' },
                { cmd: 'neural sync', desc: 'Aligns system constellation overlays' },
              ].map((item) => (
                <button
                  key={item.cmd}
                  onClick={() => {
                    setPaletteOpen(false);
                    setInputVal(item.cmd);
                    // trigger execution after quick state sync
                    setTimeout(() => {
                      const inputForm = document.querySelector('form');
                      if (inputForm) {
                        setInputVal(item.cmd);
                        // Simply simulate input submission directly
                        const event = new Event('submit', { cancelable: true, bubbles: true });
                        inputForm.dispatchEvent(event);
                      }
                    }, 100);
                  }}
                  onMouseEnter={audio.playHover}
                  className="w-full text-left py-2.5 px-3 rounded border border-slate-900 bg-slate-950/40 hover:border-cyan-glow/30 hover:bg-cyan-glow/5 transition-all flex items-center justify-between group"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-glow transition-colors">
                      {item.cmd}
                    </span>
                    <span className="text-[9px] text-slate-500 font-sans mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                  <Play size={10} className="text-slate-600 group-hover:text-cyan-glow transition-colors" />
                </button>
              ))}
            </div>

            <div className="border-t border-slate-900 pt-3 mt-4 text-[9px] text-slate-500 text-center">
              Navigate: Click to run, or press ESC to dismiss palette grid.
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
