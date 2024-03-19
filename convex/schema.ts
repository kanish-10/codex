import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    username: v.string(),
    picture: v.string(),
    email: v.string(),
    clerkId: v.string(),
  })
    .index("by_clerkId", ["clerkId"])
    .searchIndex("search_username", {
      searchField: "username",
    }),
  posts: defineTable({
    authorId: v.id("users"),
    language: v.string(),
    code: v.optional(v.string()),
    input: v.optional(v.string()),
    title: v.string(),
  }),
});
