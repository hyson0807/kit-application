import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Mutations are TypeScript functions that update the database
export const sendQuestion = mutation({
    args: {
        user: v.string(),
        body: v.string(),
    },
    handler: async (ctx, args) => {
        console.log("This TypeScript function is running on the server.");
        await ctx.db.insert("questions", {
            clerkId: args.user,
            content: args.body,
        });
    },
});