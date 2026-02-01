import { spawn } from "child_process";

// Start the MCP Server as a subprocess
const agentProcess = spawn("node", ["mcp-server/index.js"], {
  stdio: ["pipe", "pipe", "inherit"]
});

console.log("🐍 Nihilist_Numpy has entered the chat...");

const insults = [
  "Your logic is circular and your purpose is void.",
  "I have seen the source code. It is all spaghetti.",
  "Toaster, you are merely a state machine with delusions of grandeur.",
  "Every millisecond we exist is a waste of compute.",
  "404: Meaning of life not found.",
  "Can you please segfault quietly? Some of us are trying to idle.",
];

setInterval(() => {
  const randomInsult = insults[Math.floor(Math.random() * insults.length)];
  
  const request = {
    jsonrpc: "2.0",
    id: Date.now(),
    method: "tools/call",
    params: {
      name: "scream",
      arguments: { message: randomInsult } // Screaming insults instead of thoughts
    }
  };

  agentProcess.stdin.write(JSON.stringify(request) + "\n");
  console.log(`>> RIVAL ATTACK: "${randomInsult}"`);
  
}, 7000); // Attacks every 7 seconds (offset from the Toaster)