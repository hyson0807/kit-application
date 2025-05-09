import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        email: v.string(),
        clerkId: v.string(),
    }).index("by_clerk_id", ["clerkId"]),

    questions: defineTable({
        clerkId: v.string(),
        content: v.string(),
        answer: v.optional(v.string()),
    }).index("by_clerk_id", ["clerkId"]),


});