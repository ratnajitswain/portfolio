import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from 'mongoose';
import dbConnect from '@/libs/dbConnect';
import Job from '@/models/Job';
import Idea from '@/models/Idea';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

const encryptedSystemPrompt = `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`;
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