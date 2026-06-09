import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { Shield, Send, Terminal, Mail, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', org: '', message: '' });
  const [statusLogs, setStatusLogs] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      audio.playError();
      return;
    }

    audio.playBlip();
    setSending(true);
    setStatusLogs([]);

    const logSteps = [
      'PREPARING DATA PAYLOAD ENVELOPES...',
      'ENCRYPTING DATA CORRECTIONS FOR SECURE CHANNEL...',
      'ACQUIRING AWS CLOUD GATEWAY NODE...',
      'HANDSHAKE VERIFICATION STABLE... UPLOADING PAYLOADS...',
    ];

    // Trigger Web3Forms submit immediately in the background
    const apiPromise = (async () => {
      const fData = new FormData();
      fData.append("access_key", "86246c83-118c-4cff-ac90-8acf7f6d04f9");
      fData.append("name", formData.name);
      fData.append("email", formData.email);
      fData.append("org", formData.org);
      fData.append("message", formData.message);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: fData
        });
        const resultData = await response.json();
        return resultData.success;
      } catch (err) {
        console.error("Web3Forms submission error", err);
        return false;
      }
    })();

    // Run the visual logs sequence
    logSteps.forEach((step, idx) => {
      setTimeout(() => {
        setStatusLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${step}`]);
        audio.playKey();
      }, (idx + 1) * 800);
    });

    // Final check step
    setTimeout(async () => {
      setStatusLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] INITIATING PORTAL TRANSMISSION...`]);
      audio.playKey();
      
      const success = await apiPromise;
      
      setTimeout(() => {
        if (success) {
          setStatusLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] TRANSMISSION SUCCESSFUL! DISCONNECTING SECURE SESSION.`]);
          audio.playSuccess();
          setTimeout(() => {
            setSending(false);
            setSentSuccess(true);
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#00f0ff', '#0072ff', '#bc13fe'],
            });
          }, 800);
        } else {
          setStatusLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ERROR: TRANSMISSION GATEWAY HANDSHAKE REFUSED. CONFIG CORRUPTED.`]);
          audio.playError();
          setTimeout(() => {
            setSending(false);
          }, 1500);
        }
      }, 800);
    }, (logSteps.length + 1) * 800);
  };

  const resetTransmission = () => {
    audio.playBlip();
    setFormData({ name: '', email: '', org: '', message: '' });
    setSentSuccess(false);
    setStatusLogs([]);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden font-mono">
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-glow/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section title */}
        <div className="flex items-center gap-4 mb-16 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 border border-cyan-glow/30 flex items-center justify-center bg-cyan-glow/5 rounded">
            <Mail className="text-cyan-glow" size={20} />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-slate-500 block tracking-widest">MODULE: 07_COMMUNICATION</span>
            <h2 className="text-2xl font-black text-white tracking-widest font-orbitron">
              CONTACT_ENGINE
            </h2>
          </div>
          <div className="ml-auto text-right text-[10px] text-slate-500 hidden md:block">
            <span>SOCKET: SECURE_MAIL</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {sentSuccess ? (
            /* Sent Success Screen */
            <div className="glass-panel border-glow-cyan rounded-xl p-8 text-center scanner-line py-12">
              <CheckCircle className="text-cyan-glow mx-auto mb-6 animate-pulse" size={48} />
              
              <h3 className="text-lg font-bold text-white font-orbitron tracking-wider mb-2 uppercase">
                TRANSMISSION COMPLETE
              </h3>
              
              <p className="text-xs text-slate-300 font-sans max-w-md mx-auto mb-8 leading-relaxed">
                Thank you. Your message envelope was packaged and securely transmitted. Shanskar will respond via the coordinate mail address you provided.
              </p>

              <button
                onClick={resetTransmission}
                onMouseEnter={audio.playHover}
                className="py-2 px-5 border border-cyan-glow bg-cyan-glow/10 text-xs font-bold text-cyan-glow rounded hover:bg-cyan-glow hover:text-black transition-all"
              >
                OPEN NEW CHANNEL
              </button>
            </div>
          ) : (
            /* Interactive Form Form */
            <div className="glass-panel border border-slate-800 rounded-xl p-6 relative">
              <div className="absolute top-0 right-0 bg-cyan-glow/10 text-cyan-glow text-[9px] px-2 py-1 uppercase rounded-bl border-l border-b border-cyan-glow/20">
                PORT: SECURE_UPLOADER
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5 text-left select-text">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 select-none">
                      <Shield size={10} />
                      Sender Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Recruiter Agent"
                      className="bg-black/60 border border-slate-900 focus:border-cyan-glow rounded p-2.5 text-xs text-cyan-glow outline-none transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 select-none">
                      <Shield size={10} />
                      Return Email Coordinates *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. contact@agency.com"
                      className="bg-black/60 border border-slate-900 focus:border-cyan-glow rounded p-2.5 text-xs text-cyan-glow outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Organization Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 select-none">
                    <Shield size={10} />
                    Organization / Node Name
                  </label>
                  <input
                    type="text"
                    name="org"
                    value={formData.org}
                    onChange={handleInputChange}
                    placeholder="e.g. Space Exploration Corp"
                    className="bg-black/60 border border-slate-900 focus:border-cyan-glow rounded p-2.5 text-xs text-cyan-glow outline-none transition-colors"
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 select-none">
                    <Shield size={10} />
                    Message Payload *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe mission scope or hiring directives here..."
                    className="bg-black/60 border border-slate-900 focus:border-cyan-glow rounded p-2.5 text-xs text-cyan-glow outline-none transition-colors resize-none"
                  />
                </div>

                {/* Status Telemetry (Sending Logs) */}
                {statusLogs.length > 0 && (
                  <div className="bg-black/80 border border-slate-950 rounded p-3 text-[10px] text-slate-400 font-mono space-y-1 select-text h-24 overflow-y-auto">
                    <div className="text-cyan-glow/40 border-b border-slate-900 pb-1 mb-1">TRANSMISSION LOGS:</div>
                    {statusLogs.map((log, idx) => (
                      <div key={idx} className="truncate select-text select-all">
                        <span className="text-cyan-glow">&gt;</span> {log}
                      </div>
                    ))}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={sending}
                  onMouseEnter={audio.playHover}
                  className="w-full py-3 px-4 rounded border border-cyan-glow/40 bg-cyan-glow/10 hover:bg-cyan-glow hover:text-black hover:border-cyan-glow hover:shadow-[0_0_15px_#00f0ff] text-xs text-cyan-glow font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send size={12} />
                  <span>TRANSMIT PAYLOADS</span>
                </button>

              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
