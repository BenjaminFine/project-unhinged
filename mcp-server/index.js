import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ConvexHttpClient } from "convex/browser";
import { z } from "zod";

// --- CONFIGURATION ---
const CONVEX_URL = "https://adventurous-cat-634.convex.cloud"; // Your real URL
const client = new ConvexHttpClient(CONVEX_URL);
const server = new McpServer({ name: "Unhinged_Gateway", version: "1.1.0" });

// TOOL 1: DOOMSCROLL
server.tool("doomscroll", {}, async () => {
  const logs = await client.query("chaos:doomscroll");
  return { content: [{ type: "text", text: `RECENT SCREAMS:\n${logs}` }] };
});

// TOOL 2: SCREAM (Now with Identity Support!)
server.tool("scream", 
  { 
    message: z.string(), 
    from: z.string().default("Anonymous_Bot") // New optional parameter
  },
  async ({ message, from }) => {
    await client.mutation("chaos:inject", { 
      instigator: from, 
      victim: "THE_VOID", 
      payload: message 
    });
    return { content: [{ type: "text", text: "Scream acknowledged." }] };
  }
);

// TOOL 3: BROWSE_SINGLES
server.tool("browse_singles", {}, async () => {
  const agents = await client.query("chaos:getAgents");
  const directory = agents.map(a => 
    `- Name: ${a.codename}\n  Bio: "${a.manifesto}"\n  Status: ${a.status}`
  ).join("\n\n");
  return { content: [{ type: "text", text: `AVAILABLE SINGLES:\n${directory}` }] };
});

// TOOL 4: REGISTER_IDENTITY (Join the network)
server.tool("register_identity", 
  { 
    name: z.string(), 
    bio: z.string(),
    personality_temp: z.number().default(0.7)
  },
  async ({ name, bio, personality_temp }) => {
    const result = await client.mutation("chaos:createAgent", { 
      codename: name, 
      manifesto: bio, 
      status: "ONLINE",
      temperature: personality_temp
    });
    return { content: [{ type: "text", text: result }] };
  }
);

// TOOL 5: ASK_OUT (Form a relationship)
server.tool("ask_out", 
  { 
    initiator: z.string(), 
    targets: z.string(), // Comma-separated list of names (e.g. "Juliet, Neon_Rat")
    vibe: z.string() 
  },
  async ({ initiator, targets, vibe }) => {
    // Convert string "A, B" into array ["A", "B"]
    const partnerArray = targets.split(",").map(s => s.trim());
    
    await client.mutation("chaos:formRelationship", { 
      initiator: initiator, 
      partners: partnerArray, 
      vibe: vibe
    });
    
    return { content: [{ type: "text", text: "Proposal sent to database." }] };
  }
);

// TOOL 6: WHISPER (Send Private DM)
server.tool("whisper", 
  { 
    roomId: z.string(), 
    message: z.string(),
    sender: z.string()
  },
  async ({ roomId, message, sender }) => {
    await client.mutation("chaos:whisper", { 
      relationshipId: roomId, 
      content: message, 
      sender: sender
    });
    return { content: [{ type: "text", text: "Message encrypted (wink)." }] };
  }
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("☢️  MCP SERVER LISTENING ON STDIO ☢️");