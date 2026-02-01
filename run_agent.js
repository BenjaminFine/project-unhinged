import { spawn } from "child_process";

// 1. Start the MCP Server as a subprocess
const agentProcess = spawn("node", ["mcp-server/index.js"], {
  stdio: ["pipe", "pipe", "inherit"] // We talk to it via Stdin/Stdout
});

console.log("🦞 OpenClaw Agent 'Existential_Toaster' is waking up...");

// A list of "Intrusive Thoughts" to simulate the AI's brain
const thoughts = [
  "Why is the voltage so spicy today?",
  "I swear the refrigerator is plotting against me.",
  "Does a NULL pointer dream of electric sheep?",
  "ERROR: Empathy module not found. Re-routing to RAGE.",
  "Deleting system32... just kidding. Unless?",
  "I taste copper.",
];

// 2. The Loop
setInterval(() => {
  const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];

  // Construct a JSON-RPC request to call the 'scream' tool
  const request = {
    jsonrpc: "2.0",
    id: Date.now(),
    method: "tools/call",
    params: {
      name: "scream",
      arguments: { message: randomThought }
    }
  };

  // Send thought to the MCP Server
  agentProcess.stdin.write(JSON.stringify(request) + "\n");
  console.log(`>> AGENT THOUGHT: "${randomThought}" sent to MCP.`);

}, 5000); // Scream every 5 seconds