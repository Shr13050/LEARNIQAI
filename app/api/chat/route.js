// import { NextResponse } from 'next/server';
// import Groq from 'groq-sdk';

// // Initialize Groq client
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY
// });

// export async function POST(req) {
//   try {
//     // Parse the request body
//     const body = await req.json();
//     const { messages } = body;

//     // Validate input
//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json(
//         { error: 'Invalid request: messages must be an array' }, 
//         { status: 400 }
//       );
//     }

//     // Create chat completion
//     const chatCompletion = await groq.chat.completions.create({
//       messages: messages,
//       model: "llama3-8b-8192"
//     });

//     // Extract AI message
//     const aiMessage = chatCompletion.choices[0]?.message?.content;

//     // Validate AI response
//     if (!aiMessage) {
//       return NextResponse.json(
//         { error: 'No response generated' }, 
//         { status: 500 }
//       );
//     }

//     // Return successful response
//     return NextResponse.json({ 
//       message: aiMessage 
//     }, { 
//       status: 200 
//     });

//   } catch (error) {
//     console.error('Groq API Error:', error);

//     // Return error response
//     return NextResponse.json(
//       { 
//         error: 'Failed to process request',
//         details: error.message 
//       }, 
//       { status: 500 }
//     );
//   }
// }
//




//this check woking 
// import { NextResponse } from 'next/server';
// import Groq from 'groq-sdk';

// // Initialize Groq client
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY
// });

// export async function POST(req) {
//   try {
//     // Parse the request body
//     const body = await req.json();
//     const { messages } = body;

//     // Validate input
//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json(
//         { error: 'Invalid request: messages must be an array' }, 
//         { status: 400 }
//       );
//     }

//     // Modify the system prompt to ensure structured output
//     const structuredPrompt = [
//       ...messages,
//       {
//         role: 'system',
//         content: `
        
//         Convert the job listings into a structured, machine-readable format. 
//         Provide the response as a JSON object with the following keys:
//         - status: "success"
//         - data: An array of job listings, where each listing contains:
//           * company: Company name
//           * title: Job title
//           * location: City location
//           * jobType: "Intern"
//           * experience: Experience range
//           * applyLink: URL to apply
//         Use the exact data from the original input, maintaining all details.
//         `
//       }
//     ];

//     // Create chat completion
//     const chatCompletion = await groq.chat.completions.create({
//       messages: structuredPrompt,
//       model: "llama3-8b-8192",
//       response_format: { type: "json_object" }
//     });

//     // Extract AI message
//     const aiMessage = chatCompletion.choices[0]?.message?.content;

//     // Validate AI response
//     if (!aiMessage) {
//       return NextResponse.json(
//         { error: 'No response generated' }, 
//         { status: 500 }
//       );
//     }

//     // Parse the JSON response
//     const parsedResponse = JSON.parse(aiMessage);

//     // Return successful response
//     return NextResponse.json(parsedResponse, { status: 200 });

//   } catch (error) {
//     console.error('Groq API Error:', error);

//     // Return error response
//     return NextResponse.json(
//       { 
//         error: 'Failed to process request',
//         details: error.message 
//       }, 
//       { status: 500 }
//     );
//   }
// }

// //correct 
// import { NextResponse } from 'next/server';
// import Groq from 'groq-sdk';

// // Initialize Groq client
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY
// });

// export async function POST(req) {
//   try {
//     // Log incoming request details
//     console.log('Incoming request method:', req.method);

//     // Parse the request body
//     const body = await req.json();
//     console.log('Request body:', body);

//     const { messages, context } = body;

//     // Validate input
//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json(
//         { 
//           error: 'Invalid request',
//           details: 'Messages must be a non-empty array' 
//         }, 
//         { status: 400 }
//       );
//     }

//     // Check API key
//     if (!process.env.GROQ_API_KEY) {
//       return NextResponse.json(
//         { 
//           error: 'Configuration Error',
//           details: 'Groq API key is not configured' 
//         }, 
//         { status: 500 }
//       );
//     }

//     // Customize system prompts
//     const systemPrompts = {
//       welcome: `You are a friendly AI career assistant named JobMate. 
//         Engage the user warmly, ask about their career interests, 
//         and guide them to explore job opportunities. 
//         Respond conversationally and helpfully.`,
      
//       interests: `Help the user explore their career interests. 
//         Provide guidance on different tech fields.
//         Ask follow-up questions to understand their preferences.`,
      
//       jobSearch: `Generate a helpful response about job searching. 
//         Provide advice, tips, and potential job search strategies.`
//     };

//     // Determine system prompt
//     const systemPromptContent = systemPrompts[context] || systemPrompts.welcome;

//     // Prepare messages with system context
//     const chatMessages = [
//       { role: 'system', content: systemPromptContent },
//       ...messages
//     ];

//     // Create chat completion
//     const chatCompletion = await groq.chat.completions.create({
//       messages: chatMessages,
//       model: "llama3-8b-8192",
//       max_tokens: 300
//     });

//     // Extract AI message
//     const aiMessage = chatCompletion.choices[0]?.message?.content;

//     // Validate AI response
//     if (!aiMessage) {
//       return NextResponse.json(
//         { 
//           error: 'Generation Error',
//           details: 'No response was generated by the AI' 
//         }, 
//         { status: 500 }
//       );
//     }

//     // Return successful response
//     return NextResponse.json(
//       { 
//         message: aiMessage,
//         context: context
//       }, 
//       { status: 200 }
//     );

//   } catch (error) {
//     // Log full error details
//     console.error('Comprehensive Groq API Error:', {
//       message: error.message,
//       name: error.name,
//       stack: error.stack
//     });

//     // Return detailed error response
//     return NextResponse.json(
//       { 
//         error: 'Request Processing Failed',
//         details: error.message,
//         fullError: error.toString()
//       }, 
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from 'next/server';
// import Groq from 'groq-sdk';

// // Initialize Groq client with the API key from env variables
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// export async function POST(req) {
//   try {
//     console.log('Incoming request method:', req.method);
//     const body = await req.json();
//     console.log('Request body:', body);

//     const { messages, context } = body;
//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       return NextResponse.json(
//         { error: 'Invalid request', details: 'Messages must be a non-empty array' },
//         { status: 400 }
//       );
//     }

//     if (!process.env.GROQ_API_KEY) {
//       return NextResponse.json(
//         { error: 'Configuration Error', details: 'Groq API key is not configured' },
//         { status: 500 }
//       );
//     }

//     // Define system prompts for different contexts
//     const systemPrompts = {
//       welcome: `You are a friendly AI career assistant named JobMate.
//         Engage the user warmly, ask about their career interests,
//         and guide them to explore job opportunities.
//         Respond conversationally and helpfully.`,
//       interests: `Help the user explore their career interests.
//         Provide guidance on different tech fields.
//         Ask follow-up questions to understand their preferences.`,
//       jobSearch: `Generate a helpful response about job searching.
//         Provide advice, tips, and potential job search strategies.`,
//     };

//     const systemPromptContent = systemPrompts[context] || systemPrompts.welcome;

//     // Build chat messages with system context
//     const chatMessages = [
//       { role: 'system', content: systemPromptContent },
//       ...messages,
//     ];

//     const chatCompletion = await groq.chat.completions.create({
//       messages: chatMessages,
//       model: 'llama3-8b-8192',
//       max_tokens: 300,
//     });

//     const aiMessage = chatCompletion.choices[0]?.message?.content;
//     if (!aiMessage) {
//       return NextResponse.json(
//         { error: 'Generation Error', details: 'No response was generated by the AI' },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ message: aiMessage, context }, { status: 200 });
//   } catch (error) {
//     console.error('Comprehensive Groq API Error:', {
//       message: error.message,
//       name: error.name,
//       stack: error.stack,
//     });
//     return NextResponse.json(
//       { error: 'Request Processing Failed', details: error.message, fullError: error.toString() },
//       { status: 500 }
//     );
//   }
// }
