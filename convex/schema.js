import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { createUser } from "./user";

export const user = {
    createUser,
};


export default defineSchema({
  users: defineTable({
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  }),
  pdfFiles:defineTable({
    fileId:v.string(),
    storageId:v.string(),
    fileName:v.string(),
    fileUrl:v.string(),
    createdBy:v.string()

}),
documents: defineTable({
  embedding: v.array(v.number()),
  text: v.string(),
  metadata: v.object({
    fileId: v.string(),  // You can add other fields here if necessary
  }),
}).vectorIndex("byEmbedding", {
  vectorField: "embedding",
  dimensions: 768,
}),

});

