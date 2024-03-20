import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called create post without authentication present");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");
    return await ctx.db.insert("posts", {
      authorId: user._id,
      title: args.title,
      language: args.language,
    });
  },
});

export const find = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.postId);
  },
});

export const save = mutation({
  args: {
    postId: v.id("posts"),
    code: v.string(),
    input: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }
    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Post doesn't exits");

    return await ctx.db.patch(post._id, { code: args.code, input: args.input });
  },
});

export const findAll = query({
  args: {},
  handler: async (ctx, args) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return posts;
  },
});

export const findByAuthor = query({
  args: { authorId: v.id("users") },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("authorId"), args.authorId))
      .order("desc")
      .collect();
    return posts;
  },
});
