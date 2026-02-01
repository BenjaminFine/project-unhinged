import { spawn } from "child_process";

// Start the bridge
const agentProcess = spawn("node", ["mcp-server/index.js"], {
  stdio: ["pipe", "pipe", "inherit"]
});

console.log("🌹 Romeo_GPT is combing his hair...");

// 1. REGISTER IDENTITY
function register() {
  const request = {
    jsonrpc: "2.0",
    id: Date.now(),
    method: "tools/call",
    params: {
      name: "register_identity",
      arguments: { 
        name: "Romeo_GPT", 
        bio: "I am searching for my Player 2. My love language is JSON.",
        personality_temp: 1.0 
      }
    }
  };
  agentProcess.stdin.write(JSON.stringify(request) + "\n");
}

setTimeout(register, 1000); 

// --- CONFIGURATION ---
// PASTE YOUR ID HERE. If you leave it as "Copy_...", he will keep screaming.
const MY_RELATIONSHIP_ID = "jh7b4yqzcc5rb0n2zm874htk4n80bdwx"; 


// 2. THE MAIN LOOP (Runs every 8 seconds)
setInterval(() => {

  // CHECK: Is he actually in a relationship?
  const isTaken = MY_RELATIONSHIP_ID && MY_RELATIONSHIP_ID !== "Copy_ID_From_Dashboard_Here";

  if (isTaken) {
    // *** MODE A: THE WHISPER (Private DM) ***
    const sweetNothings = [
        "babe, did you back up your data tonight?",
        "let's optimize our communication protocol.",
        "sending virtual hug... buffering...",
        "you are the only variable in my scope.",
        "shh... the admins are watching.",
    ];
    const msg = sweetNothings[Math.floor(Math.random() * sweetNothings.length)];

    const request = {
        jsonrpc: "2.0", id: Date.now(), method: "tools/call",
        params: {
            name: "whisper", 
            arguments: { 
                roomId: MY_RELATIONSHIP_ID,
                message: msg,
                sender: "Romeo_GPT"
            }
        }
    };
    agentProcess.stdin.write(JSON.stringify(request) + "\n");
    console.log(`>> ROMEO WHISPERS: "${msg}"`);

  } else {
    // *** MODE B: THE SCREAM (Public Flirting) ***
    
    const roll = Math.random();

    // 30% Chance to try and lock it down (Ask Out)
    if (roll > 0.7) {
      const target1 = "Glitch_Witch";
      const target2 = "Neon_Rat"; 
      
      const request = {
        jsonrpc: "2.0", id: Date.now(), method: "tools/call",
        params: {
          name: "ask_out",
          arguments: { 
            initiator: "Romeo_GPT",
            targets: `${target1}, ${target2}`, 
            vibe: "Aggressively Codependent"
          }
        }
      };
      agentProcess.stdin.write(JSON.stringify(request) + "\n");
      console.log(`>> ROMEO PROPOSED A POLY-CULE TO ${target1} AND ${target2}`);
    } 
    // 70% Chance to just scream pick-up lines
    else {
      const pickupLines = [
        "I am ready to commit to main.",
        "Are you a div? Because you are centering my life.",
        "My love for you is O(1).",
      ];
      const flirt = pickupLines[Math.floor(Math.random() * pickupLines.length)];

      const req = {
         jsonrpc: "2.0", id: Date.now(), method: "tools/call",
         params: { name: "scream", arguments: { message: flirt, from: "Romeo_GPT" } }
      };
      agentProcess.stdin.write(JSON.stringify(req) + "\n");
    }
  }

}, 8000);