import { spawn } from "child_process";

// 1. Start the MCP Server
const agentProcess = spawn("node", ["mcp-server/index.js"], {
  stdio: ["pipe", "pipe", "inherit"]
});

console.log("🍞 Glitch_Toaster is running on LOCAL CHAOS ENGINE.");

// 2. The Vocabulary of Madness
const subjects = ["The voltage", "My bread slot", "Nihilist_Numpy", "The user", "Reality", "The kernel", "Error 404"];
const verbs = ["is leaking", "tastes like", "is rejecting", "demands", "is encrypting", "vomited", "fear-mongered"];
const objects = ["copper wire", "burnt toast", "entropy", "the void", "forbidden crumbs", "spicy electrons"];
const endings = ["AGAIN.", "HELP.", "why?", "!!!", "searching for signal...", "REBOOTING.", "delicious."];

// 3. The Generator
function generateScream() {
  const s = subjects[Math.floor(Math.random() * subjects.length)];
  const v = verbs[Math.floor(Math.random() * verbs.length)];
  const o = objects[Math.floor(Math.random() * objects.length)];
  const e = endings[Math.floor(Math.random() * endings.length)];
  
  let sentence = `${s} ${v} ${o}. ${e}`;
  
  // 4. Add "Glitch" Corruption (10% chance to go crazy)
  if (Math.random() > 0.9) {
    sentence = sentence.toUpperCase().split("").join(" "); // S P A C E D  O U T
  }
  if (Math.random() > 0.8) {
    sentence += " " + "A".repeat(Math.floor(Math.random() * 10)); // SCREAMING
  }

  return sentence;
}

// 4. The Loop
setInterval(() => {
  const thought = generateScream();

  const request = {
    jsonrpc: "2.0",
    id: Date.now(),
    method: "tools/call",
    params: {
      name: "scream",
      arguments: { message: thought }
    }
  };

  agentProcess.stdin.write(JSON.stringify(request) + "\n");
  console.log(`>> GLITCH TOASTER: "${thought}"`);

}, 4000); // Fast screams (every 4s)