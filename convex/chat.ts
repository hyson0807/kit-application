import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";


export const sendQuestion = mutation({
    args: {
        clerkId: v.string(),
        question: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("questions", {
            clerkId: args.clerkId,
            content: args.question,
        });

        await ctx.scheduler.runAfter(0, internal.openai.generateAIResponse, {
            clerkId: args.clerkId,
            question: args.question,
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

export const getAnswer = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) throw new Error("Not authenticated");

        const answer = await ctx.db
            .query("answers")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .take(50);
        return answer;
    }
})