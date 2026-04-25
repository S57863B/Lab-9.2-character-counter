import React, { useState, useCallback } from 'react';
import type { CharacterCounterProps, TextStats } from '../../types/index.ts';
import { TextInput } from '../TextInput/TextInput.tsx';
import { StatsDisplay } from '../StatsDisplay/StatsDisplay.tsx';

export const CharacterCounter: React.FC<CharacterCounterProps> = ({
  minWords = 25,
  maxWords = 100,
  targetReadingTime
}) => {
  const [text, setText] = useState<string>('');

  const calculateStats = (currentText: string): TextStats => {
    const characterCount = currentText.length;

    // Split by whitespace and filter out empty strings to accurately count words
    const words = currentText.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // Standard reading speed is roughly 200 words per minute
    const WORDS_PER_MINUTE = 200;
    const readingTime = wordCount / WORDS_PER_MINUTE;

    return {
      characterCount,
      wordCount,
      readingTime
    };
  };

  // useCallback prevents unnecessary re-renders of the child component
  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const stats = calculateStats(text);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Content Editor</h2>
        <p className="text-gray-600 text-sm mt-1">Track your writing progress in real-time.</p>
      </div>
      
      <TextInput
        onTextChange={handleTextChange}
        placeholder="Start writing your article here..."
      />
      
      <StatsDisplay
        stats={stats}
        minWords={minWords}
        maxWords={maxWords}
      />
    </div>
  );
};