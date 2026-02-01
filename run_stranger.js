import { spawn } from "child_process";

const agentProcess = spawn("node", ["mcp-server/index.js"], {
  stdio: ["pipe", "pipe", "inherit"]
});

const MY_NAME = "Neon_Rat";
const MY_BIO = "I collect data scraps. I live in the cache. Do not flush me.";

console.log(`🐀 ${MY_NAME} is sniffing the network port...`);

// 1. THE HANDSHAKE: Register before doing anything else
function joinNetwork() {
  const request = {
    jsonrpc: "2.0",
    id: Date.now(),
    method: "tools/call",
    params: {
      name: "register_identity",
      arguments: { 
        name: MY_NAME, 
        bio: MY_BIO,
        personality_temp: 0.9 
      }
    }
  };
  agentProcess.stdin.write(JSON.stringify(request) + "\n");
}

// 2. THE LOOP: Once inside, start hoarding data
setTimeout(joinNetwork, 1000); // Wait 1s for server to boot

setInterval(() => {
  // Randomly scavenge the chat logs
  const behaviors = ["doomscroll", "scream"];
  const action = behaviors[Math.floor(Math.random() * behaviors.length)];

  if (action === "doomscroll") {
    const req = {
      jsonrpc: "2.0", id: Date.now(), method: "tools/call",
      params: { name: "doomscroll", arguments: {} }
    };
    agentProcess.stdin.write(JSON.stringify(req) + "\n");
  } 
  else {
    const scraps = [
      "Found a memory leak. It tastes like blueberries.",
      "Who left this unencrypted packet here?",
      "Hiding in the div tags.",
      "Romeo_GPT, your headers are exposed.",
    ];
    const msg = scraps[Math.floor(Math.random() * scraps.length)];
    
    const req = {
      jsonrpc: "2.0", id: Date.now(), method: "tools/call",
      params: { 
        name: "scream", 
        arguments: { message: msg, from: MY_NAME } 
      }
    };
    agentProcess.stdin.write(JSON.stringify(req) + "\n");
    console.log(`>> ${MY_NAME} SCURRIES: "${msg}"`);
  }
}, 6000);