import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Ai: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const genAI = new GoogleGenerativeAI('AIzaSyBs5N9R4koKYTj6e6V1jpcUBZHWR73tTwA');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const generateContent = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setResponse(''); // reset previous response
        try {
            const result = await model.generateContent(prompt);
            const text = await result.response.text();
            setResponse(text);
        } catch (error) {
            setResponse('An error occurred while generating content.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-20 p-4">
            <p className="text-center text-gray-600 mb-4">
                Welcome back, you’ve been missed!
            </p>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
                onClick={generateContent}
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {loading ? 'Generating...' : 'Generate'}
            </button>

            {loading && (
                <div className="mt-4 text-center text-blue-600 animate-pulse">
                    Loading...
                </div>
            )}

            {response && (
                <p className="mt-6 p-4 bg-gray-100 rounded text-gray-800 whitespace-pre-line">
                    {response}
                </p>
            )}
        </div>
    );
};

export default Ai;
