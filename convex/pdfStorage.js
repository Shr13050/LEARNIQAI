import { v } from "convex/values";
import { mutation } from "./_generated/server";


export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});


export const AddFileEntryToDb=mutation({
  args:{
    fileId:v.string(),
    storageId:v.string(),
    fileName:v.string(),
    createdBy:v.string(),
    fileUrl:v.string()
  },
  handler:async(ctx,args)=>{
    const result=await ctx.db.insert('pdfFiles',{
      fileId:args.fileId,
      fileName:args.fileName,
      fileUrl:args.fileUrl,
      storageId:args.storageId,
      createdBy:args.createdBy
    })
    return 'Inserted'
  }
})


export const getFileUrl=mutation({
  args:{
    storageId:v.string()
  },
  handler:async(ctx,args)=>{
    const url=await ctx.storage.getUrl(args.storageId);
    return url;
  }
})

//query


import { query } from "./_generated/server";

// Get file record query
export const GetFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Log the fileId being passed to the query
      console.log("Querying fileId:", args.fileId);

      // Perform the query to find the file record
      const result = await ctx.db
        .query("pdfFiles")
        .filter((q) => q.eq(q.field("fileId"), args.fileId))
        .collect();

      // Check if the result is empty
      if (result.length === 0) {
        console.log(`No file found with fileId: ${args.fileId}`);
      } else {
        console.log("File record found:", result);
      }

      return result;
    } catch (error) {
      console.error("Error fetching file record:", error);
      throw new Error("Unable to fetch file record");
    }
  },
});
