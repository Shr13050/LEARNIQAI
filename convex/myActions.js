"use node";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";
// import { v } from "convex/values";

export const ingest = action({
    args: {
        splitText:v.any(),
        fileId:v.string()

    },
    handler: async (ctx,args) => {
      await ConvexVectorStore.fromTexts(
        args.splitText,
        {
          fileId: args.fileId,  // Include fileId in the metadata
        },
        new GoogleGenerativeAIEmbeddings({
            apiKey:'AIzaSyAuoHLyEG4MZ8EPaZy0s14gEkIWk1edBZ0',
            model: "text-embedding-004", // 768 dimensions
            taskType: TaskType.RETRIEVAL_DOCUMENT,
            title: "Document title",
          }),
        { ctx }
       
      );
       return "Completed.."
    },
  });

  export const search = action({
    args: {
      query: v.string(),
      fileId:v.string()
    },
    handler: async (ctx, args) => {
      const vectorStore = new ConvexVectorStore(
        new GoogleGenerativeAIEmbeddings({
          apiKey:'AIzaSyAuoHLyEG4MZ8EPaZy0s14gEkIWk1edBZ0',
          model: "text-embedding-004", // 768 dimensions
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title",
        })
        
        ,
         { ctx });
  
         const resultOne = (await vectorStore.similaritySearch(args.query, 15)).filter(q => q.metadata.fileId === args.fileId);

      
      console.log(resultOne);
      return JSON.stringify(resultOne)
    },
  });


