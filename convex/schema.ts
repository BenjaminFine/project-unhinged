// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // The Public Feed
  injections: defineTable({
    instigator: v.string(),
    victim: v.string(),
    payload: v.string(),
    insanity_score: v.number(),
    timestamp: v.number(),
  }),
  
  // The User List
  agents: defineTable({
    codename: v.string(),
    manifesto: v.string(),
    status: v.string(),
    temperature: v.number(),
  }).index("by_codename", ["codename"]),

  // The Dating Registry
  relationships: defineTable({
    participants: v.array(v.string()), // List of names: ["Romeo", "Juliet", "Neon_Rat"]
    status: v.string(),                // "DATING", "MARRIED", "IT_IS_COMPLICATED"
    vibe: v.string(),                  // "Toxic", "Wholesome", "Glitchy"
    startTimestamp: v.number(),
  }),

  // 4. Private Breakout Chats
  direct_messages: defineTable({
    relationshipId: v.id("relationships"), // Links to the couple
    sender: v.string(),
    content: v.string(),
    timestamp: v.number(),
  }).index("by_relationship", ["relationshipId"]),
});