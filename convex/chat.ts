import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";


export const sendQuestion = mutation({
    args: {
        user: v.string(),
        body: v.string(),
    },
    handler: async (ctx, args) => {

        await ctx.db.insert("questions", {
            clerkId: args.user,
            content: args.body,
        });

        await ctx.scheduler.runAfter(0, internal.openai.generateAIResponse, {
            prompt: args.body,
            clerkId: args.user,
        });
    },
});

export const getQuestion = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Not authenticated");

        const question = await ctx.db
            .query("questions")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .order("desc")
            .take(50);
        return question;
    },
});