"use client"
import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import me from "@/assets/images/me2.jpg";
import Image from 'next/image';

const initialAI = { role: 'ai', content: "Hello! I'm Ratnajit. Feel free to ask me anything about my skills, experience, or projects as a Full Stack Web Developer." }

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([initialAI]);
    const [isLoading, setIsLoading] = useState(false);
    const chatWindowRef = useRef(null);
    const chatButtonRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        try {
            const savedMessages = localStorage.getItem('chatHistory');
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            } else {
                setMessages([initialAI]);
            }
        } catch (error) {
            setMessages([initialAI]);
        }
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('chatHistory', JSON.stringify(messages));
    // }, []);

    useEffect(() => {
        if (isOpen && chatWindowRef.current) {
            chatWindowRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isOpen &&
                chatWindowRef.current &&
                !chatWindowRef.current.contains(event.target) &&
                !chatButtonRef.current.contains(event.target)) {
                closeChat();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const toggleChat = () => {
        if (isOpen) {
            closeChat();
        } else {
            openChat();
        }
    };

    const openChat = () => {
        setIsOpen(true);
        setTimeout(() => setIsVisible(true), 50);
    };

    const closeChat = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 300);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
    
        const userMessage = { role: 'user', content: inputValue };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputValue('');
        setIsLoading(true);
    
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputValue,
                    history: messages.slice(-5)
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to get response from AI');
            }
    
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let aiMessage = { role: 'ai', content: '' };
    
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6).trim();
                        if (data === '[DONE]') {
                            setMessages(prevMessages => {
                                const lastMessage = prevMessages[prevMessages.length - 1];
                                if (lastMessage.role === 'ai') {
                                    return [...prevMessages.slice(0, -1), aiMessage];
                                } else {
                                    return [...prevMessages, aiMessage];
                                }
                            });
                            localStorage.setItem('chatHistory', JSON.stringify(messages));
                            setIsLoading(false);
                            break;
                        }
                        try {
                            const parsedData = JSON.parse(data);
                            aiMessage.content += parsedData.text;
                            setMessages(prevMessages => {
                                const lastMessage = prevMessages[prevMessages.length - 1];
                                if (lastMessage.role === 'ai') {
                                    return [...prevMessages.slice(0, -1), aiMessage];
                                } else {
                                    return [...prevMessages, aiMessage];
                                }
                            });
                            localStorage.setItem('chatHistory', JSON.stringify(messages));
                            setIsLoading(false);
                        } catch (error) {
                            console.error('Error parsing JSON:', error);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = { role: 'ai', content: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearHistory = () => {
        setMessages([initialAI]);
        localStorage.setItem('chatHistory', JSON.stringify([initialAI]));
    };

    return (
        <>
            <button
                ref={chatButtonRef}
                className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900 transition-colors duration-200"
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                data-state={isOpen ? "open" : "closed"}
                onClick={toggleChat}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white block border-gray-200 align-middle"
                >
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200"></path>
                </svg>
            </button>
            {isOpen && (
                <div
                    ref={chatWindowRef}
                    tabIndex="-1"
                    style={{
                        boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)',
                        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(10px)',
                    }}
                    className="fixed bottom-[calc(4rem+1.5rem)] left-0  md:left-[unset] right-0  md:mr-4 p-6 rounded-lg border border-gray-600 w-[440px] h-[634px] text-white"
                >
                    <div className="flex flex-col space-y-1.5 pb-6">
                        <h2 className="font-semibold text-lg tracking-tight">Chat with me</h2>
                        <p className="text-sm text-gray-300 leading-3">Ask about my skills, projects, and experience</p>
                        <button
                            onClick={clearHistory}
                            className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            Clear Chat History
                        </button>
                    </div>
                    <div className="pr-4 h-[465px] overflow-y-auto" style={{ minWidth: '100%' }}>
                        {messages.map((message, index) => (
                            <div key={index} className={`flex gap-3 my-4 text-sm flex-1 ${message.role === 'ai' ? 'text-gray-200' : 'text-white'}`}>
                                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                    <div className={`rounded-full ${message.role === 'ai' ? 'bg-gray-600 border-gray-500' : 'bg-blue-500 border-blue-400'} border p-1`}>
                                        {message.role === 'ai' ? (
                                            <div className="w-full h-full overflow-hidden rounded-full">
                                            <Image
                                                className="object-cover w-full h-full" 
                                                alt="Ratnajit Swain"
                                                src={me}
                                            />
                                            </div>
                                        ) : (
                                            <svg stroke="none" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                                            </svg>
                                        )}
                                    </div>
                                </span>
                                <p className="leading-relaxed">
                                    <span className="block font-bold text-white">{message.role === 'ai' ? 'Ratnajit' : 'You'} </span>
                                    <div dangerouslySetInnerHTML={{__html:marked.parse(message.content)}}></div>
                                </p>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3 my-4 text-gray-200 text-sm flex-1">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                    <div className="rounded-full bg-gray-600 border border-gray-500 p-1">
                                        <svg
                                            stroke="none"
                                            fill="white"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            height="20"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                            ></path>
                                        </svg>
                                    </div>
                                </span>
                                <p className="leading-relaxed">Thinking...</p>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex items-center pt-0">
                        <form onSubmit={sendMessage} className="flex items-center justify-center w-full space-x-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-600 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50 text-white bg-gray-700 focus-visible:ring-offset-2"
                                placeholder="Ask about Ratnajit's skills or projects"
                                value={inputValue}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-black disabled:pointer-events-none disabled:opacity-50 bg-white hover:bg-gray-200 h-10 px-4 py-2 transition-colors duration-200"
                                disabled={isLoading}
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;