'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import config from '../config';

const InputPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  };

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handleGetToken = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await axios.post(`${config.apiBaseUrl}/genToken`, {
        email: email,
      });
      const generatedToken = response.data.token;

      setToken(generatedToken);
    } catch (error) {
      console.error('🚨 Error generating token:', error);
      setError('😔 Failed to generate token. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await axios.post(`${config.apiBaseUrl}/verify`, {
        email: email,
        token: inputValue,
      });

      const { isValid, message ,isAdmin} = response.data;

      if (isValid&&isAdmin) {
        router.push('/admin');
      } else if(isValid){
        router.push('/dashboard')
      } else{
        setError(message);
      }
    } catch (error) {
      console.error('🚨 Error verifying token:', error);
      setError('😔 Failed to verify token. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🔐 Two-Factor Authentication
        </h2>
        {error && (
          <p className="text-red-500 mb-4 font-semibold flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </p>
        )}
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="✉️ Enter your email"
          className="py-3 px-4 mb-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300"
          disabled={isLoading}
        />
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="🔑 Enter the token"
            className="py-3 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300 flex-grow"
            disabled={isLoading}
          />
          <button
            onClick={handleGetToken}
            className={`py-3 px-4 text-white rounded-md transition-colors duration-300 ${
              isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={isLoading || !email}
          >
            {isLoading ? '⏳ Loading...' : '🔐 Get Token'}
          </button>
        </div>
        {token && (
          <div className="p-4 bg-green-100 rounded-md mb-4 text-green-800 font-semibold flex items-center">
            <span className="mr-2">✅</span> Token: {token}
          </div>
        )}
        <button
          onClick={handleSubmit}
          className={`w-full py-3 text-white rounded-md transition-colors duration-300 ${
            isLoading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          disabled={isLoading || !inputValue || !email}
        >
          {isLoading ? '⏳ Submitting...' : '✔️ Submit'}
        </button>
      </div>
    </div>
  );
};

export default InputPage;