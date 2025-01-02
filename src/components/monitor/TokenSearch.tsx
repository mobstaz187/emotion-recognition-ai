import React, { useState } from 'react';

interface Props {
  onSearch: (address: string) => void;
}

export const TokenSearch: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste the Contract Address"
        className="flex-1 px-4 py-2 bg-black/20 border border-white/10 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500/40 
          text-gray-200 placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
          transition-colors duration-200"
      >
        Analyze
      </button>
    </form>
  );
};