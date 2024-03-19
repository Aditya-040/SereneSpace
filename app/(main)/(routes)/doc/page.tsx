"use client"

import React, { useState } from 'react';
import axios from 'axios';

const TextGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const openaiResponse = await axios.post('https://api.openai.com/v1/completions', {
        model: 'text-davinci-003', // Choose the model you want to use
        prompt: prompt,
        max_tokens: 150, // Adjust token count as needed
        temperature: 0.7, // Adjust temperature as needed
        stop: '\n', // Stop generation at the end of a sentence
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env['OPENAI_API_KEY'], // Replace with your OpenAI API key
        }
      });
      setResponse(openaiResponse.data.choices[0].text.trim());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-lg px-8 py-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-4">Event Generator</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your event prompt here..."
            rows={4}
          />
          <button type="submit" className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Generate Event
          </button>
        </form>
        {response && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Generated Event:</h2>
            <p className="text-gray-800">{response}</p>
          </div>
        )}
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p className="italic">"The only limit to our realization of tomorrow will be our doubts of today." - Franklin D. Roosevelt</p>
      </div>
    </div>
  );
};

export default TextGenerator;
