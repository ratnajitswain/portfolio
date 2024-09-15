import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {readFileSync} from "fs";
import path from "path";
import dbConnect from '@/libs/dbConnect';
import Job from '@/models/Job';
import Idea from '@/models/Idea';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

const systemPromptPath = path.join(process.cwd(), 'assets', 'text', 'system_prompt.txt');
let encryptedSystemPrompt = readFileSync(systemPromptPath, 'utf8');
let systemPrompt = ""
function decrypt(encryptedText, key) {
    if(systemPrompt)
        return systemPrompt
    let text = atob(encryptedText);
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

systemPrompt = decrypt(encryptedSystemPrompt, process.env.SYSTEM_PROMPT_KEY)

export async function POST(request) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  try {

    await dbConnect();

    const body = await request.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: systemPrompt });

    const chatHistory = [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "Understood. I'm ready to assist with information about Ratnajit Swain's professional background and skills. I will act as Ratnajit Myself. I will not give information outside of Ratnajit's Profile." }] },
      ...history.map(msg => ({ 
        role: msg.role === 'ai' ? 'model' : 'user', 
        parts: [{ text: msg.content }]
      })),
      { role: "user", parts: [{ text: message }] }
    ];

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      },
    });

    const result = await chat.sendMessageStream(message);

    let fullResponse = '';

    // Create a ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          fullResponse += text;
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
        //   if (!separatorFound) {
        //     if (fullResponse.includes('||||')) {
        //       separatorFound = true;
        //       const [messageBeforeSeparator] = text.split('||||');
        //       controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: messageBeforeSeparator })}\n\n`));
        //       break;  // Stop sending data after the separator
        //     } else {
        //       controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
        //     }
        //   }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));

        try {
            // Check if the response contains the separator
       
            if (fullResponse.includes('||||')) {
              const [messageString, jsonString] = fullResponse.split('||||');
              const jsonData = JSON.parse(jsonString.trim());
              
              // Save to database based on type
              
              if(jsonData.contact && typeof jsonData.contact == "string"){
                jsonData.contact  = JSON.parse(jsonData.contact.trim());
              }
              if (jsonData.type === 'opportunity') {
                const newJob = new Job(jsonData);
                await newJob.save();
                console.log('Job opportunity saved to database');
              } else if (jsonData.type === 'project_request') {
                const newIdea = new Idea(jsonData);
                await newIdea.save();
                console.log('Project idea saved to database');
              }
            }
          } catch (error) {
            console.error("Error processing or saving data:", error);
          }
        controller.close();
      },
    });

    // Process the full response after streaming
    // stream.pipeTo(new WritableStream({
    //   async close() {
    //     try {
    //       // Check if the response contains the separator
    //       if (fullResponse.includes('||||')) {
    //         const [messageString, jsonString] = fullResponse.split('||||');
    //         const jsonData = JSON.parse(jsonString.trim());
            
    //         // Save to database based on type
    //         if (jsonData.type === 'job_opportunity') {
    //           const newJob = new Job(jsonData);
    //           await newJob.save();
    //           console.log('Job opportunity saved to database');
    //         } else if (jsonData.type === 'project_idea') {
    //           const newIdea = new Idea(jsonData);
    //           await newIdea.save();
    //           console.log('Project idea saved to database');
    //         }
    //       }
    //     } catch (error) {
    //       console.error("Error processing or saving data:", error);
    //     }
    //   }
    // }));

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ data: "Hello world" });
}