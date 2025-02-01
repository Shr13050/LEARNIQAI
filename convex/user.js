// //we are going to write a mutation to insert delete 
// import { v } from "convex/values"
// import {mutation} from "./_generated/server"
// export const createUser=mutation({
//  args:{
//     email:v.string(),
//     userName:v.string(),
//     imgUrl:v.string()
//  },
//  handler:async(ctx,args)=>{
//     //if user already exists 
//     const user= await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect();


//     if(user?.length==0){
//         await ctx.db.insert('users',{
//             email:args.email,
//             userName:args.userName,
//             imageUrl:args.imgUrl
//         });

//         return 'Inserted New User...'
//     } 
//     //if not ,then insert new user entry 
//     return 'User already exist'
//  }
// })

import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    userName: v.string(),
    imgUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length === 0) {
      await ctx.db.insert("users", {
        email: args.email,
        userName: args.userName,
        imageUrl: args.imgUrl,
      });
      console.log( "Inserted New User...");
    }
    return console.log("User already exists");
  },
});
