import { mutation, query } from "./_generated/server";
import {v} from "convex/values";


export const createUser = mutation({
    args: {
        username: v.string(),
        email: v.string(),
        clerkId: v.string(),
    },

    handler: async (ctx, args) => {
        // users 테이블에서 args.clerkId 와 같은 clerkId 한개를 찾는다.
        const ExistingUser =  await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId)).first();
        // 이미 테이블에 등록된 유저일 경우 return
        if( ExistingUser ) return ;

        // 유저 생성 in database
        await ctx.db.insert("users", {
            username: args.username,
            email: args.email,
            clerkId: args.clerkId,
        })
    }
});

export const getUserInfo = query(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .first();


    if (!user) {
        throw new Error("User not found in database123123123");
    }

    return {
        userId: user.clerkId,
        username: user.username
    };
});

