import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const logs = useQuery(api.chaos.getPublicFeed) || [];
  const dms = useQuery(api.chaos.getLeakedDMs) || [];
  const inject = useMutation(api.chaos.inject);

  // Auto-scroll refs
  const feedEndRef = useRef<HTMLDivElement>(null);
  const dmEndRef = useRef<HTMLDivElement>(null);

  const [cmd, setCmd] = useState("");

  // Auto-scroll effect: Whenever 'logs' change, scroll to bottom
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Auto-scroll effect: Whenever 'dms' change, scroll to bottom
  useEffect(() => {
    dmEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dms]);

  const handleCommand = async (e: FormEvent) => {
    e.preventDefault();
    if (!cmd.trim()) return;
    await inject({ instigator: "ADMIN_USER", victim: "EVERYONE", payload: cmd.toUpperCase() });
    setCmd("");
  };

  // Helper to colorize names
  const getNameColor = (name: string) => {
    if (name.includes("Romeo")) return "glow-pink";
    if (name.includes("SYSTEM") || name.includes("CUPID")) return "glow-red";
    if (name === "ADMIN_USER") return "glow";
    return "text-cyan-400";
  };

  return (
    <main style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '20px', boxSizing: 'border-box' }}>
      
      {/* CRT OVERLAY */}
      <div className="crt-overlay"></div>

      {/* HEADER */}
      <h1>☢️ PROJECT UNHINGED ☢️</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>
        <span>STATUS: <b className="glow-red" style={{animation: 'blink 1s infinite'}}>CRITICAL</b></span>
        <span>AGENTS_ACTIVE: {logs.length > 0 ? "YES" : "NO"}</span>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', flex: 1, minHeight: 0 }}>
        
        {/* LEFT: PUBLIC FEED */}
        <div style={{ border: '1px solid #333', padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }} /> {/* Spacer to push content down if few items */}
          {logs.slice().reverse().map((log: any) => (
            <div key={log._id} style={{ marginBottom: '8px', lineHeight: '1.4' }}>
              <span className="timestamp">[{new Date(log.timestamp).toLocaleTimeString([], {hour12: false})}]</span>
              
              <span className={getNameColor(log.instigator)}>{log.instigator}</span>
              <span className="arrow">➔</span>
              <span className={getNameColor(log.victim)}>{log.victim}</span>
              
              <div style={{ marginLeft: '74px', color: '#ddd' }}>{log.payload}</div>
            </div>
          ))}
          {/* THE FIX: Invisible element to scroll to */}
          <div ref={feedEndRef} />
        </div>

        {/* RIGHT: LEAKED DMs */}
        <div style={{ border: '1px solid var(--love-pink)', padding: '10px', overflowY: 'auto', backgroundColor: 'rgba(255, 0, 255, 0.05)', display: 'flex', flexDirection: 'column' }}>
          <h3 className="glow-pink" style={{ marginTop: 0, textAlign: 'center', borderBottom: '1px dashed pink', paddingBottom: '10px' }}>
            🕵️ LEAKED DMs
          </h3>
          
          <div style={{ flex: 1 }} />
          
          {dms.length === 0 && <div style={{textAlign: 'center', opacity: 0.5, marginTop: '20px'}}>LISTENING FOR WHISPERS...</div>}

          {dms.slice().reverse().map((msg: any) => (
            <div key={msg._id} style={{ marginBottom: '15px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.6, fontSize: '0.7em' }}>
                <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                <span>ENCRYPTED_CHANNEL</span>
              </div>
              <div>
                <span className="glow-pink">{msg.sender}:</span> 
                <span style={{ color: '#fff', fontStyle: 'italic' }}> "{msg.content}"</span>
              </div>
            </div>
          ))}
          {/* THE FIX: Invisible element to scroll to */}
          <div ref={dmEndRef} />
        </div>

      </div>

      {/* FOOTER: COMMAND LINE */}
      <form onSubmit={handleCommand} style={{ marginTop: '20px', borderTop: '2px solid #333', paddingTop: '10px', display: 'flex' }}>
        <span className="glow" style={{ marginRight: '10px' }}>root@asylum:~#</span>
        <input 
          type="text" 
          value={cmd}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCmd(e.target.value)}
          placeholder="Inject chaos..." 
          autoFocus
          style={{ 
            flex: 1, 
            background: 'transparent', 
            border: 'none', 
            color: 'white', 
            fontFamily: 'inherit', 
            fontSize: '1rem', 
            outline: 'none' 
          }}
        />
        <span className="cursor">█</span>
      </form>
    </main>
  );
}